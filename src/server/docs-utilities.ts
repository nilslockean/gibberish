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

const insertAtCaret = (text = "") => {
	const cursor = DocumentApp
		.getActiveDocument()
		.getCursor()

	if ( cursor ) {
		// Attempt to insert text at the cursor position. If the insertion returns null, the cursor"s
		// containing element doesn"t allow insertions, so show the user an error message.
		const textElement = cursor.insertText(text)
		if ( !textElement ) {
			throw new Error("error_no_insert")
		}
	} else {
		throw new Error("error_no_caret")
	}
}

export {
	onInstall,
	onOpen,
	openSidebar,
	quickInsert,
	generateLoremIpsum,
	getLanguage,
	insertAtCaret
}
