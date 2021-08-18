import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import main_en from "./en/main.json";
import main_es from "./es/main.json";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                main: main_en,
            },
            es: {
                main: main_es,
            },
        },
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
});

export default i18n;
