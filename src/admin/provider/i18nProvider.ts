import polyglotI18nProvider from "ra-i18n-polyglot";

import koreanMessages from "../i18n/ra-korean";

const translations = { en: koreanMessages };

export const i18nProvider = polyglotI18nProvider((locale) => translations[locale]);
