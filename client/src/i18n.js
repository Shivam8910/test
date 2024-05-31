// i18n.js
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";


i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // Passes i18next down to react-i18next
  .init({
    debug: true,
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          home: "HOME",
          services: "SERVICES",
          about: "ABOUT US",
          homepmessage : "Welcome to our language learning community, where you can collaborate and practice languages in a supportive and interactive environment!",
          newsession : "New Session",
          existingsession: "Existing Session",
          iceb: "Icebreaker",
          gd : "Group Discussion",
          debate: "Debate",
          profile: "Profile",
          details : "Details",
          editp: "Edit Profile",
          taket: "Take Test",
          username: "Username",
          gender : "Gender",
          save : "Save",
          logout : "Logout"

        },
      },
      hi: {
        translation: {
          home: "होम",
          services: "सेवा",
          about: "हमारे बारे में",
          homepmessage : "हमारे भाषा सीखने वाले समुदाय में आपका स्वागत है, जहाँ आप एक सहयोगी और इंटरैक्टिव वातावरण में सहयोग और भाषाओं का अभ्यास कर सकते हैं!",
          newsession : "नया सत्र",
          existingsession: "मौजूदा सत्र",
          iceb: "आइसब्रेकर",
          gd : "सामूहिक चर्चा",
          debate: "बहस",
          profile: "प्रोफ़ाइल",
          details : "विवरण",
          editp: "प्रोफ़ाइल संपादित करें",
          taket: "परीक्षा लो",
          username: "यूज़रनेम",
          gender : "लिंग",
          save : "सेव",
          logout:"लॉग आउट"
         
        },
      },
      de: {
        translation: {
          home: "Heim",
          services: "Dienstleistungen",
          about: "Über uns",
          homepmessage : "Willkommen in unserer Sprachlern-Community, in der Sie in einer unterstützenden und interaktiven Umgebung zusammenarbeiten und Sprachen üben können!",
          newsession : "Neue Sitzung",
          existingsession: "Bestehende Sitzung",
          iceb: "Eisbrecher",
          gd : "Gruppendiskussion",
          debate: "Debatte",
          profile: "Profil",
          details : "Einzelheiten",
          editp: "Profil bearbeiten",
          taket: "Einen Test schreiben",
          username: "Nutzername",
          gender : "Geschlecht",
          save : "speichern",
          logout: "Ausloggen"
        },
      },
    },
  });

export default i18next;
