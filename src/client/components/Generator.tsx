import React, { RefObject } from "react";
import i18n, { Language } from '../../_locales/i18n'
import { storage } from "./Main"
// import Typography from "@material-ui/core/Typography"
import Alert from "@material-ui/lab/Alert"
import MainSlider from "./MainSlider"
import MainSelect from "./MainSelect"
import LinearProgress from "@material-ui/core/LinearProgress"
import GenerateButton from "./GenerateButton"
import MainTextArea from "./MainTextArea"
import Button from '@material-ui/core/Button';

export enum ParagraphLength {
  SHORT = "short",
  MEDIUM = "medium",
  LONG = "long",
  VERY_LONG = "verylong"
}

export type ParagraphLengthOption = {
  value: ParagraphLength
  label: string
}

export type MuiSelectCallback = (event: React.ChangeEvent<{
  name?: string | undefined;
  value: unknown;
}>, child: React.ReactNode) => void

export enum Status {
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
    const paragraphLength = storage.get("paragraphLength") as ParagraphLength | undefined
    if ( !!paragraphLength ) this.setState({ paragraphLength })

    const numParagraphs = storage.get("numParagraphs")
    if ( numParagraphs !== undefined ) this.setState({ numParagraphs: Number(numParagraphs) })

    // console.log("stored", paragraphLength, numParagraphs)
  }

  handleError = (error: any) => {
    // console.log("Error!", typeof error, JSON.stringify(error, null, 2), error.message)

    const defaultText = "Something went wrong, please try again."
    let lastError
    try {
      let { message = defaultText } = error
      message = message.replace(/^Error:\s/, "")
      message = this.i18n(message)

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
    storage.set("paragraphLength", paragraphLength)
  }

  handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const numParagraphs = Number(event.currentTarget.value)

    this.setState({ numParagraphs })
    storage.set("numParagraphs", numParagraphs.toString())
  }

  handleSliderChange = (_event: React.ChangeEvent<{}>, value: number | number[]): void => {
    if ( typeof value !== "number" ) return;

    this.setState({ numParagraphs: value })
    storage.set("numParagraphs", value.toString())
  }

  handleMainSelectChange: MuiSelectCallback = (event) => {
    const { value } = event.target
    if ( !value ) return;
    
    const paragraphLength = value as ParagraphLength

    this.setState({ paragraphLength })
    storage.set("paragraphLength", paragraphLength)
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

    const onSuccess = (_result) => {
      this.setState({ status: Status.IDLE })

      /* TODO: Reset highlight
      console.log(JSON.stringify(_result, null, 2))
      setTimeout(() => {
        // @ts-ignore
        google.script.run
          //.withSuccessHandler(console.log)
          //.withFailureHandler(({ message }) => console.warn(message))
          //.highlightText(textElement, backgroundColor)
      }, 2000)
      */
    }

    // @ts-ignore
		google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(this.handleError)
      .insertAtCaret(generatedText, false) // TODO: set highlight (true)
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

    const paragraphLengthOptions: ParagraphLengthOption[] = [
      { value: ParagraphLength.SHORT, label: i18n("p_len_short") },
      { value: ParagraphLength.MEDIUM, label: i18n("p_len_medium") },
      { value: ParagraphLength.LONG, label: i18n("p_len_long") },
      { value: ParagraphLength.VERY_LONG, label: i18n("p_len_v_long") }
    ]

    return <>
      { !!lastError && <Alert severity="error">
        { lastError.message }
      </Alert> }
      
      <MainSlider
        label={ i18n("num_p_header") }
        value={ numParagraphs }
        onChange={ this.handleSliderChange }
      />

      <MainSelect
        label={ i18n("p_len_header") }
        options={ paragraphLengthOptions }
        value={ paragraphLength }
        onChange={ this.handleMainSelectChange }
      />

      <GenerateButton
        status={ status }
        onClick={ this.handleGenerateClick }
        content={ i18n("generate_btn_text") }
        generatingContent={ i18n("generate_btn_text_loading") }
        primary={ !generatedText.length }
      />

      { status === Status.GENERATING && <LinearProgress /> }

      <MainTextArea label={ i18n("generated_text_header") } value={ generatedText } />

      <Button
        variant="contained"
        // onClick={ () => console.log("CLick copy") }
        // disabled={ isGenerating }
        // color="secondary"
        // className={ classes.root }
      >{ i18n("copy_btn_text") }</Button>

      <Button
        variant="contained"
        // onClick={ () => console.log("Insert") }
        // disabled={ isGenerating }
        color="primary"
        // className={ classes.root }
      >{ status === Status.INSERTING ?
        i18n("insert_btn_text_loading") :
        i18n("insert_btn_text")
      }</Button>

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