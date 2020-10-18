import React from "react";
import { Language } from '../../_locales/i18n'
import Generator from "./Generator"

const storage = {
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

interface Props {}

interface State {
	lang?: Language
}

export default class Main extends React.Component<Props, State> {
  constructor(props) {
		super(props);
		this.state = {
			lang: storage.get("lang") as Language
		}
  }
  
  componentDidMount = () => {
    const onSuccess = (lang: Language) => {
      if ( this.state.lang !== lang ) {
        this.setState({ lang })
        storage.set("lang", lang)
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
    </div>
  }
}

export { storage }