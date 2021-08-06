// TODO:
// this is an ad-hoc translation solution until we invest into a proper
// translation management system

import messages_de from "../i18n/de.json";
import messages_fr from "../i18n/fr.json";
import messages_it from "../i18n/it.json";

interface Translations {
  [name: string]: Translations | string;
}

const matchNestedCode = new RegExp(/^\w+\.[\w.]+$/);

export function tr(code: string, locale?: string, dict?: Translations): string {
  // start with root Translations object
  if (!dict) dict = getDict(locale);
  // check for a nested key like Error.Login.ForgotPassword
  if (matchNestedCode.exec(code)) {
    const elems = code.split(".");
    if (elems.length > 0) {
      const [first, ...rest] = elems;
      const result = dict[first];
      if (typeof result !== "string") {
        return tr(rest.join("."), locale, result);
      }
    }
  }
  // we look for code in Translations. If nothing found, we take the original
  const translated = dict[code] !== undefined ? dict[code] : code;
  // the result should not be a list of Translations
  if (typeof translated !== "string") {
    throw new Error(
      `Deep translation code ${code} does not follow Error.Login.ForgotPassword syntax`
    );
  }
  return translated;
}

function getDict(locale?: string): Translations {
  if (locale === "fr") return messages_fr as Translations;
  if (locale === "it") return messages_it as Translations;
  else return messages_de as Translations;
}
