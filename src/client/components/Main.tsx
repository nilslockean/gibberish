import React from "react"
import Button from '@material-ui/core/Button'
import { Language } from '../../_locales/i18n'
import Generator from "./Generator"

interface Props {}

interface State {
	lang?: Language
}

export default class Main extends React.Component<Props, State> {
  constructor(props) {
		super(props);
		this.state = {
			lang: localStorage.getItem("lang") as Language || undefined
		}
  }
  
  componentDidMount = () => {
    const onSuccess = (lang: Language) => {
      if ( this.state.lang !== lang ) {
        this.setState({ lang })
        localStorage.setItem("lang", lang)
      }
    }

    const onError = () => {
      this.setState({ lang: "en" })
    }

    // @ts-ignore
		google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onError)
      .getLanguage()
  }

  render = () => {
    const { lang } = this.state

    return <div className="container">
      { !lang ? <p>...</p> : <Generator lang={lang} /> }
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  }
}