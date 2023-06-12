/* eslint-disable no-else-return */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */


// run `npm i i18next && npm i react-i18next && npm i i18next-browser-languagedetector`

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
//
import enLocales from '../locales/languages/en/translation.js';
import heLocales from '../locales/languages/he/translation.js';


// ----------------------------------------------------------------------
const defaultLanguageKey = "he"; // "en"
/*Add languages here!*/
// the translations
export const resources = {
  // rs: {
  //   keys: ["rs"],
  //   translation: translationRS,
  //   label: "Russian",
  //   flag: russiaFlag,
  //   // direction: "ltr",
  // },
  he: {
    keys: ["he", "he-IL"],
    // direction: "rtl",
    label: "עברית",
    translations: heLocales,
    // flag: ilFlag,
  },
  en: {
    keys: ["en", "eng", "en-US"],
    translations: enLocales,
    label: "English",
    // direction: "ltr",
    // flag: usFlag,
  },
};
//#region getLanguage
export const getUserLanguageKey = () => {
  //return defaultLanguageKey;
  //#region: localStorage lagnguage
  if (localStorage.i18nextLng) return localStorage.i18nextLng;
  //#endregion: localStorage lagnguage

  //#region: Check user lagnguage from device
  let userLanguage = navigator.language || navigator.userLanguage;
  let find = false;

  if (userLanguage) {
    for (var lng in resources) {
      // debugger
      if (
        resources[lng]?.keys.find(
          (key) => key.toLocaleLowerCase() === userLanguage.toLocaleLowerCase()
        )
      ) {
        find = true;
        userLanguage = lng;
        localStorage.setItem("i18nextLng", userLanguage);
        return userLanguage;
      }
    }

    //#region
    const userLanguages = navigator.languages;
    if (!find && userLanguages) {
      for (let lng in resources) {
        userLanguages.forEach((ulng) => {
          if (
            resources[lng].keys.find(
              (key) => key.toLocaleLowerCase() === ulng.toLocaleLowerCase()
            )
          ) {
            find = true;
            userLanguage = lng;
            localStorage.setItem("i18nextLng", userLanguage);
            return userLanguage;
          }
        });
      }
    }
    ///#endregion
  }
  //#endregion: Check user lagnguage from device

  if (find) return userLanguage;
  else {
    localStorage.setItem("i18nextLng", defaultLanguageKey);
    return defaultLanguageKey;
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || getUserLanguageKey(),
    fallbackLng: 'he',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;