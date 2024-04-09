// Utilisez fetch pour les requêtes HTTP et l'API DOM pour analyser le contenu HTML

export async function extraireResultatsVote(url) {
    try {
        // Faire une requête HTTP GET à l'URL
        const response = await fetch(url);

        // Vérifier si la requête a réussi
        if (!response.ok) {
            throw new Error(`Échec de la récupération de la page web. Code de statut : ${response.status_code}`);
        }

        // Obtenir le texte HTML de la réponse
        const htmlText = await response.text();

        // Utiliser l'API DOM pour analyser le contenu HTML
        // Note: Cette partie est plus complexe dans un environnement non-navigateur
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        // Trouver la section avec le titre "Analyse détaillée"
        // Note: Cette opération peut nécessiter des ajustements selon la structure exacte de la page
        const analysisSection = doc.querySelector('h2:contains("Analyse détaillée") + div.accordion');

        // Dictionnaire pour stocker les résultats de vote
        let votingResults = {};

        // Trouver toutes les catégories de vote et itérer sur elles
        analysisSection.querySelectorAll('div.accordion-item').forEach(category => {
            const categoryName = category.querySelector('button.accordion-button').textContent.trim().replace("\n", " ");
            const senatorsList = category.querySelectorAll('li.col');

            // Liste pour stocker les informations des sénateurs
            let senatorsInfo = [];

            // Extraire le nom et le lien pour chaque sénateur
            senatorsList.forEach(senator => {
                const senatorName = senator.querySelector('span').textContent.trim().replace("\n", " ");
                const senatorLink = "https://www.senat.fr" + senator.querySelector('a').getAttribute('href');
                senatorsInfo.push({ name: senatorName, link: senatorLink });
            });

            // Ajouter la catégorie et ses sénateurs aux résultats de vote
            votingResults[categoryName] = senatorsInfo;
        });

        // Retourner les données structurées
        return votingResults;
    } catch (error) {
        console.error("Erreur lors de l'extraction des résultats de vote :", error);
        return null;
    }
}

// Note: L'exécution de cette fonction et l'affichage des résultats doivent être faits dans un contexte approprié
