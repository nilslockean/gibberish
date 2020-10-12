import en from "./en/messages.json"
import sv from "./sv/messages.json"

export type Language = "en"|"sv"

const i18n = (lang: Language, messageName: string) => {
  interface LocaleJSON {
    [key: string]: string
  }

  let json: LocaleJSON
  switch (lang) {
    case "sv":
      json = sv as LocaleJSON
      break
    case "en":
    default:
      json = en as LocaleJSON
      break
  }

  return json[messageName] || messageName
}

export default i18n