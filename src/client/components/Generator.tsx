import React, { RefObject } from "react";
import i18n, { Language } from '../../_locales/i18n'

enum ParagraphLength {
  SHORT = "short",
  MEDIUM = "medium",
  LONG = "long",
  VERY_LONG = "verylong"
}

enum Status {
  IDLE,
  GENERATING,
  COPYING,
  COPIED,
  INSERTING
}

interface Props {
  lang: Language
}

interface State {
  status: Status,
  paragraphLength: ParagraphLength,
  numParagraphs: number,
  generatedText: string,
  lastError?: Error
}

export default class Main extends React.Component<Props, State> {
  textareaRef: RefObject<HTMLTextAreaElement>

  constructor(props) {
    super(props)
    
		this.state = {
      status: Status.IDLE,
      paragraphLength: ParagraphLength.MEDIUM,
      numParagraphs: 3,
      generatedText: ""
    }
    
    this.textareaRef = React.createRef()
  }

  i18n = (messageName: string) => i18n(this.props.lang, messageName)
  
  componentDidMount = () => {
    const paragraphLength = localStorage.getItem("paragraphLength") as ParagraphLength | null
    if ( !!paragraphLength ) this.setState({ paragraphLength })

    const numParagraphs = localStorage.getItem("numParagraphs") as string | null
    if ( numParagraphs !== null) this.setState({ numParagraphs: Number(numParagraphs) })

    console.log("stored", paragraphLength, numParagraphs)
  }

  handleError = (error: any) => {
    console.log("Error!", typeof error, JSON.stringify(error, null, 2), error.message)

    const defaultText = "Something went wrong, please try again."
    let lastError
    try {
      const { message = defaultText } = error
      lastError = new Error(message)
    } catch(_error) {
      // Message doesn't exist on "error"
      lastError = new Error(defaultText)
    } finally {
      this.setState({ lastError })
    }

    this.setState({
      lastError: error,
      status: Status.IDLE
    })
  }

  handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const paragraphLength = event.currentTarget.value as ParagraphLength
    
    this.setState({ paragraphLength })
    localStorage.setItem("paragraphLength", paragraphLength)
  }

  handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const numParagraphs = Number(event.currentTarget.value)

    this.setState({ numParagraphs })
    localStorage.setItem("numParagraphs", numParagraphs.toString())
  }

  handleGenerateClick = () => {
    this.setState({
      lastError: undefined,
      status: Status.GENERATING,
      generatedText: ""
    })

    const onSuccess = (text: string) => {
      this.setState({
        generatedText: text,
        status: Status.IDLE
      })
    }

    const { numParagraphs, paragraphLength } = this.state

    // @ts-ignore
		google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(this.handleError)
      .generateLoremIpsum(numParagraphs, paragraphLength)
  }

  handleInsertClick = () => {
    const { generatedText } = this.state
    
    this.setState({ status: Status.INSERTING, lastError: undefined })

    const onSuccess = () => {
      this.setState({ status: Status.IDLE })
    }

    // @ts-ignore
		google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(this.handleError)
      .insertAtCaret(generatedText)
  }

  copyToClipboard = () => {
    this.setState({ status: Status.COPYING, lastError: undefined })

    try {
      const textarea = this.textareaRef.current
      if ( textarea ) {
        textarea.focus()
        document.execCommand('selectAll')
        document.execCommand('copy')
      }

      this.setState({ status: Status.COPIED })
    } catch(error) {
      if ( !Error.prototype.isPrototypeOf(error) ) {
        error = new Error("Couldn't copy text to clipboard.")
      }
      
      this.setState({
        lastError: error,
        status: Status.IDLE
      })
    } finally {
      setTimeout(() => {
        if ( this.state.status === Status.COPIED ) {
          this.setState({ status: Status.IDLE })
        }
      }, 3000)
    }
  }

  render = () => {
    const { generatedText, paragraphLength, numParagraphs, lastError, status } = this.state
    const { i18n } = this
    return <>
      <h2>{ i18n("generate_header") }</h2>
      
      { !!lastError && <div className="error message">
        { lastError.message }
      </div> }
      
      <div className="message basic">
        <div className="form-group">
          <label htmlFor="num">{ i18n("num_p_header") }</label>
          <input
            type="number"
            id="num"
            min="1"
            max="10"
            onChange={ this.handleInputChange }
            value={ numParagraphs }
          ></input>

          <label htmlFor="select">{ i18n("p_len_header") }</label>
          <select
            id="select"
            onChange={ this.handleSelectChange }
            value={ paragraphLength }
          >
            <option value={ ParagraphLength.SHORT }>{ i18n("p_len_short") }</option>
            <option value={ ParagraphLength.MEDIUM }>{ i18n("p_len_medium") }</option>
            <option value={ ParagraphLength.LONG }>{ i18n("p_len_long") }</option>
            <option value={ ParagraphLength.VERY_LONG }>{ i18n("p_len_v_long") }</option>
          </select>
        </div>
        <button
          onClick={ this.handleGenerateClick }
          disabled={ status === Status.GENERATING }
          style={{ float: "right" }}
        >
          { status === Status.GENERATING ?
            i18n("generate_btn_text_loading") :
            i18n("generate_btn_text")
          }
        </button>
      </div>


      <div className="form-group" style={{ display: generatedText.length ? 'block' : 'none' }}>
        <label htmlFor="sampleTextArea">
          { i18n("generated_text_header") }
        </label>
        <textarea
          ref={ this.textareaRef }
          readOnly
          id="sampleTextArea"
          value={ generatedText }
          rows={ Math.ceil(generatedText.length / 40) }
        ></textarea>

        <button onClick={ this.copyToClipboard }>
          { i18n("copy_btn_text") }
        </button>
        <button
          className="action"
          onClick={ this.handleInsertClick }
          disabled={ status === Status.INSERTING }
        >
          { status === Status.INSERTING ?
            i18n("insert_btn_text_loading") :
            i18n("insert_btn_text")
          }
        </button>
        { status === Status.COPIED && <p className="small">
          ✓ { i18n("copied_notice") }
        </p> }
      </div>
    </>
  }
}