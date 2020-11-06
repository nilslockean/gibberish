import i18n, { Language } from "../_locales/i18n"

const quickParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
Morbi maximus libero vel lacus interdum blandit. Donec at nibh mauris. \
Aenean tempus vestibulum congue. Ut ante tortor, elementum vitae orci vitae, \
feugiat rhoncus diam. Donec eget turpis dolor. In vitae velit cursus, \
efficitur lectus in, interdum lorem. Donec efficitur leo at velit consectetur \
venenatis at id nibh. Curabitur sit amet sagittis ex. Donec ut sollicitudin \
tortor. Maecenas commodo placerat orci. Nullam ac sem vitae lorem tempus \
porttitor vel in nisi. Mauris fermentum mi sit amet placerat elementum."

const alert = (message: string) => {
	DocumentApp
		.getUi()
		.alert(message)
}

const getLanguage = (): Language => {
	const lang = Session
		.getActiveUserLocale()
		.toLowerCase()
	
	if ( lang.split("-")[0] === "sv" ) {
		return "sv"
	} else {
		return "en"
	}
}

const onInstall = () => onOpen()

const onOpen = () => {
	const lang = getLanguage()
	const primaryLabel = i18n(lang, "primary_menu_item")
	const quickInsertLabel = i18n(lang, "quick_insert_menu_item")

	DocumentApp.getUi()
		.createAddonMenu()
			.addItem(primaryLabel, "openSidebar")
			.addItem(quickInsertLabel, "quickInsert")
			.addToUi()
};

const openSidebar = () => {
	const html = HtmlService.createHtmlOutputFromFile("sidebar")
		.setTitle("Gibberish")

	DocumentApp
		.getUi()
		.showSidebar(html)
}

const quickInsert = () => {
	try {
		insertAtCaret(quickParagraph)
	} catch(error) {
		const lang = getLanguage()
		const message = i18n(lang, error.message)
		alert(message)
	}
}

const generateLoremIpsum = (paragraphs = 1, length = "medium"): string => {
	const url = `https://loripsum.net/api/${paragraphs}/${length}/plaintext/`
	const response = UrlFetchApp.fetch(url)
	const text = response.getContentText().trim()

	return text
	// https://loripsum.net/api/plaintext/2
}

const insertAtCaret = (text: string, highlight = false) => {
	let textElement: GoogleAppsScript.Document.Text
	let textOffset = 0

	const doc = DocumentApp.getActiveDocument()
	const cursor = doc.getCursor()
	
	if ( cursor ) {
		textElement = cursor.insertText(text)
		textOffset = cursor.getOffset()
	} else {
		const selection = doc.getSelection()
		const rangeElements = selection.getRangeElements()
    const targetElement = rangeElements[0].getElement().asText()
    const startOffset = rangeElements[0].isPartial() ? rangeElements[0].getStartOffset() : 0
		textOffset = startOffset

		rangeElements.forEach((rangeElement) => {
			const element = rangeElement.getElement()

			if ( rangeElement.isPartial() ) {
      	const s = rangeElement.getStartOffset()
        const e = rangeElement.getEndOffsetInclusive()
        
        element.asText().deleteText(s, e)
      } else {
				element.removeFromParent()
      }
		})
		
		textElement = targetElement.insertText(startOffset, text)
	}

	// Attempt to insert text at the cursor position or after selection.
	// If the insertion returns null, the containing element doesn't allow 
	// insertions, so show the user an error message.
	if ( !textElement ) {
		throw new Error("error_no_insert")
	}

	const backgroundColor = textElement.getBackgroundColor() || "#ffffff"
	
	if ( highlight ) {
		highlightText(textElement)
	}
	
	return { text, textOffset, backgroundColor }
}

const highlightText = (textElement: GoogleAppsScript.Document.Text, color = "#ffff00") => {
	textElement.setBackgroundColor(color)
	return textElement
}

export {
	onInstall,
	onOpen,
	openSidebar,
	quickInsert,
	generateLoremIpsum,
	getLanguage,
	insertAtCaret,
	highlightText
}
