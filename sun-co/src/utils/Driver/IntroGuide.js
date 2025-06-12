import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const  startDriverIntro  = () => {
  const isIntroShownInSession = sessionStorage.getItem("introShown");
  const isIntroShown = localStorage.getItem("introShown");

  if (!isIntroShownInSession) {
    const driverObj = driver({
      showProgress: true,
      steps: [
        { popover: { title: "Bienvenue cher administrateur!", description: `Vous êtes dans la page d'acceuil de votre application!` } },
        { element: ".signalement", popover: { title: "Signalements des infractions", description: "Ceci est la section du signalement.", side: "left", align: "start" }},
        { element: ".account", popover: { title: "Compte", description: "Votre compte cher administrateur.", side: "bottom", align: "start" }},
        { element: ".statistic", popover: { title: "Statistiques des résultats", description: "Ceci est la section des statistiques.", side: "bottom", align: "start" }},
        { element: ".language-selector", popover: { title: "Sélecteur de langue", description: "Ceci est le sélecteur de langue.", side: "bottom", align: "start" }},
      ],
      onDestroyStarted: () => {
        if (!driverObj.hasNextStep() || confirm("Voulez-vous zapper l'intro?")) {
          driverObj.destroy();
        }
      },
    });

    driverObj.drive();
    sessionStorage.setItem("introShown", "true");
  }

  if (!isIntroShown) {
    localStorage.setItem("introShown", "true");
  }
};
