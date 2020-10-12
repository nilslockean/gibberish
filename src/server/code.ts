import * as publicFunctions from "./docs-utilities"


// Expose public functions
// @ts-ignore
global.onOpen = publicFunctions.onOpen
// @ts-ignore
global.openSidebar = publicFunctions.openSidebar
// @ts-ignore
global.quickInsert = publicFunctions.quickInsert
// @ts-ignore
global.generateLoremIpsum = publicFunctions.generateLoremIpsum
// @ts-ignore
global.getLanguage = publicFunctions.getLanguage
// @ts-ignore
global.insertAtCaret = publicFunctions.insertAtCaret

// Maybe someday....
// https://github.com/Microsoft/TypeScript/issues/19573#issuecomment-447889066
