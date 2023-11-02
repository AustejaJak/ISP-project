import i18next, { init } from "i18next";
import lt from "../locales/lt/translations.json";

init({
  fallbackLng: "lt",
  resources: {
    lt: {
      translations: lt,
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
  returnObjects: true,
  debug: false,
  lng: "lt",
  react: {
    useSuspense: false,
  },
  returnEmptyString: false,
  returnNull: false,
});

i18next.languages = [];

export default i18next;
