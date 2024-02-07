// Importation des modules nécessaires
import abstract from "../abstract";              // Importe une classe abstraite (probablement une classe de base pour les composants)
import MiscEvent from "../../misc/Event";        // Importe un module de gestion d'événements personnalisés
import Swiper from "swiper";                     // Importe Swiper, une bibliothèque pour créer des carrousels
import { A11y, Navigation } from "swiper/modules"; // Importe des modules spécifiques de Swiper (Accessibilité et Navigation)

// Déclaration de la classe Carrousel qui étend une classe abstraite
export default class Carrousel extends abstract {

    // Méthode statique pour initialiser le composant
    static initComponent() {
        super.initComponent("carrousel");
    }

    // Méthode pour créer un carrousel
    create(element)
    {
        // Initialisation de Swiper avec des configurations spécifiques
        this.swiper = new Swiper(this.element.querySelector(".swiper-block-content"), {
            modules: [Navigation], // Utilisation des modules de navigation et d'accessibilité
            loop: true,                // Option pour boucler le carrousel (commentée ici)
            slidesPerView: "auto",       // Nombre de slides visibles à la fois
            spaceBetween: 0,             // Espace entre les slides
            centeredSlides: true, // Si les slides doivent être centrés
            grabCursor: true,
            navigation: {                // Configuration de la navigation
                prevEl: this.element.querySelector(".button-swiper-slide-prev"),
                nextEl: this.element.querySelector(".button-swiper-slide-next"),
            },

        });


    }

    // Méthode pour ajouter des écouteurs d'événements
    addEventListener() {
        // Écouteur pour naviguer vers un slide spécifique
        MiscEvent.addListener("swiper::slide-to", (data) => {
       /*     this.swiper.slideTo(data.detail.num);*/
        }, this.element);

        // Écouteur pour mettre à jour le numéro du slide courant
        MiscEvent.addListener("carrousel:update:current.slide", (data) => {
            /*let currentSlideNum = data.detail.currentSlideNum;
            currentSlideNum = currentSlideNum < 10 ? "0"+currentSlideNum : currentSlideNum;
            this.currentSlideNum.innerText = currentSlideNum;*/
        }, this.element);

        // Écouteur pour les changements de slide
        this.swiper.on('slideChange', (event) => {
            /*let currentSlideNum = event.activeIndex+1;
            MiscEvent.dispatch("carrousel:update:current.slide", {currentSlideNum: currentSlideNum}, this.element);*/
        });

    }
}
