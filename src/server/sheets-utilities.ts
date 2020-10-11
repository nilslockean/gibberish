// Use ES6/7 code
const onOpen = () => {
	DocumentApp.getUi() // Or DocumentApp or FormApp.
		.createMenu("Custom scripts")
		.addItem("Edit sheets [sample React project]", "openDialog")
		.addToUi();
};

const openDialog = () => {
	const html = HtmlService.createHtmlOutputFromFile("dialog")
		.setWidth(400)
		.setHeight(600);
		DocumentApp
		.getUi() // Or DocumentApp or FormApp.
		.showModalDialog(html, "Sheet Editor");
};


const getActiveSheetName = () => DocumentApp
	.getActiveDocument()
	.getName()

// SpreadsheetApp
// 	.getActive()
// 	.getSheetName();

const getSheets = () => [{
	getName: getActiveSheetName
}]

// SpreadsheetApp
// 	.getActive()
// 	.getSheets();


const getSheetsData = () => {
	const activeSheetName = getActiveSheetName();
	return getSheets().map((sheet, index) => {
		const sheetName = sheet.getName();
		return {
			text: sheetName,
			sheetIndex: index,
			isActive: sheetName === activeSheetName
		};
	});
};

const addSheet = (sheetTitle) => {
	// SpreadsheetApp
	// 	.getActive()
	// 	.insertSheet(sheetTitle);

	DocumentApp
		.getActiveDocument()
		.getCursor()
		.insertText(sheetTitle)
	return getSheetsData();
};

const deleteSheet = (sheetIndex) => {
	const sheets = getSheets();
	// SpreadsheetApp
	// 	.getActive()
	// 	.deleteSheet(sheets[sheetIndex]);

	DocumentApp
		.getUi()
		.alert(sheetIndex)

	return getSheetsData();
};

const setActiveSheet = (sheetName) => {
	// SpreadsheetApp
	// 	.getActive()
	// 	.getSheetByName(sheetName)
	// 	.activate();

	DocumentApp
		.getUi()
		.alert(sheetName)

	return getSheetsData();
};

export {
	onOpen,
	openDialog,
	getSheetsData,
	addSheet,
	deleteSheet,
	setActiveSheet
};
