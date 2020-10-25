import React from "react";
import i18n, { Language } from '../../_locales/i18n'
import Generator from "./Generator"
import Container from "@material-ui/core/Container"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import MainAppBar from "./MainAppBar"

export const storage = {
  get: (key: string): string | undefined => {
    let value: string | undefined
    try {
      value = localStorage.getItem(key) || undefined
    } catch(_error) {
      value = undefined
    } finally {
      return value
    }
  },
  set: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value)
    } catch(_error) {
      // Silence
    }
  }
}

interface Props {
}

interface State {
	lang?: Language
}

export default class Main extends React.Component<Props, State> {
  constructor(props) {
		super(props);
		this.state = {
			// lang: storage.get("lang") as Language
		}
  }

  i18n = (messageName: string): string => {
    const { lang } = this.state
    console.log("getting", messageName, "in", lang)
    return !lang ? "" : i18n(lang, messageName)
  }
  
  componentDidMount = () => {
    const onSuccess = (lang: Language) => {
      if ( this.state.lang !== lang ) {
        this.setState({ lang })
        // storage.set("lang", lang)
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
    

    return <>
      <MainAppBar title={ this.i18n("generate_header") } />
      <Container maxWidth="sm">
        { !lang ?
          <Backdrop open={ true }>
            <CircularProgress color="primary" />
          </Backdrop> :
          <Generator lang={ lang } />
        }
      </Container>
    </>
  }
}