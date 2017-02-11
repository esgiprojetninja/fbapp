import React from "react";
import AppNavBar from "../container/AppNavBar";

export default class ConfPolitics extends React.PureComponent {
    render () {
        return (
            <div className="full-height">
                <AppNavBar title="Pardon Maman: the game"/>
                <section>
                    <h1>Politique modèle de confidentialité</h1>
                    <h3>Introduction</h3>
                    <p>
                        Devant le développement des nouveaux outils de communication, il est nécessaire de porter une attention particulière à la protection de la vie privée. C'est pourquoi, nous nous engageons à respecter la confidentialité des renseignements personnels que nous collectons.
Collecte des renseignements personnels
Nous collectons les renseignements suivants :
                    </p>
                    <ul>
                        <li>Nom</li>
                        <li>Prénom</li>
                        <li>Adresse électronique</li>
                        <li>Genre / Sexe</li>
                        <li>Âge / Date de naissance</li>
                        <li>Scolarité / Formation</li>
                    </ul>
                    <p>
                        Les renseignements personnels que nous collectons sont recueillis au travers de formulaires et grâce à l'interactivité établie entre vous et notre site Web. Nous utilisons également, comme indiqué dans la section suivante, des fichiers témoins et/ou journaux pour réunir des informations vous concernant.
                    </p>
                    <h3>Droit d'opposition et de retrait</h3>
                    <p>
                        Nous nous engageons à vous offrir un droit d'opposition et de retrait quant à vos renseignements personnels.
Le droit d'opposition s'entend comme étant la possiblité offerte aux internautes de refuser que leurs renseignements personnels soient utilisées à certaines fins mentionnées lors de la collecte.
Le droit de retrait s'entend comme étant la possiblité offerte aux internautes de demander à ce que leurs renseignements personnels ne figurent plus, par exemple, dans une liste de diffusion.
Pour pouvoir exercer ces droits, vous pouvez :
Courriel : <a href="mailto:lambot.rom@gmail.com">lambot.rom@gmail.com</a>
Section du site web : <a href="http://esgi.ninja/">http://esgi.ninja/</a>
                    </p>
                    <h3>Sécurité</h3>
                    <p>
                        Les renseignements personnels que nous collectons sont conservés dans un environnement sécurisé. Les personnes travaillant pour nous sont tenues de respecter la confidentialité de vos informations.
Pour assurer la sécurité de vos renseignements personnels, nous avons recours aux mesures suivantes :
Protocole SSL (Secure Sockets Layer)
Gestion des accès - personne autorisée
Sauvegarde informatique
Identifiant / mot de passe
Nous nous engageons à maintenir un haut degré de confidentialité en intégrant les dernières innovations technologiques permettant d'assurer la confidentialité de vos transactions. Toutefois, comme aucun mécanisme n'offre une sécurité maximale, une part de risque est toujours présente lorsque l'on utilise Internet pour transmettre des renseignements personnels.
                    </p>
                    <h3>Législation</h3>
                    <p>
                        Nous nous engageons à respecter les dispositions législatives énoncées dans :
L.R.C. (1985), ch. P-21
                    </p>
                </section>
            </div>
        );
    }
}
