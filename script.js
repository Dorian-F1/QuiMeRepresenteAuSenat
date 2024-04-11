import { extraireResultatsVote } from 'api_senat.js';


// Fonction pour afficher les résultats de vote "Pour" et "Contre"
async function afficherResultatsVote() {
    const url = "https://www.senat.fr/scrutin-public/2023/scr2023-109.html";
    const resultatsVote = await extraireResultatsVote(url);

    if (resultatsVote) {
        const divPour = document.getElementById('senateursPour');
        const divContre = document.getElementById('senateursContre');

        // Afficher les sénateurs qui ont voté "Pour"
        if (resultatsVote['Pour']) {
            divPour.innerHTML = 'Ont voté pour :' + resultatsVote['Pour'].map(senateur => `<p>${senateur.name}</p>`).join('');
        }

        // Afficher les sénateurs qui ont voté "Contre"
        if (resultatsVote['Contre']) {
            divContre.innerHTML = '<h3>Ont voté contre :</h3>' + resultatsVote['Contre'].map(senateur => `<p>${senateur.name}</p>`).join('');
        }
    } else {
        console.error("Impossible d'afficher les résultats du vote.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialise avec la date d'aujourd'hui
    let currentDate = new Date();

    // Affiche le sujet du vote pour la date actuelle et les résultats du vote
    displayVoteForDate(currentDate);
    afficherResultatsVote(); // Cette fonction affiche les résultats du vote "Pour" et "Contre"

    // Gestion des clics sur les boutons de vote
    const voteAgainstButton = document.getElementById('voteAgainst');
    const voteForButton = document.getElementById('voteFor');

    voteAgainstButton.addEventListener('click', function() {
        handleVote('contre');
    });
    voteForButton.addEventListener('click', function() {
        handleVote('pour');
    });
});

// Fonction pour gérer le vote et passer au jour précédent
function handleVote(vote) {
    submitVote(vote);
    // Passe au jour précédent
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    displayVoteForDate(currentDate);
    afficherResultatsVote(); // Mettre à jour les résultats du vote pour la nouvelle date
}

// Fonction pour afficher le sujet du vote pour une date donnée
function displayVoteForDate(date) {
    const formattedDate = formatDateToYYYYMMDD(date);
    const voteData = getVotes(formattedDate);
    if (voteData && voteData.subject) {
        const voteSubjectElement = document.getElementById('voteSubject');
        voteSubjectElement.textContent = `${voteData.subject} - ${formatDate(date)}`;
    } else {
        alert("Aucun vote trouvé pour cette date.");
    }
}

// Fonction pour formater la date en "YYYYMMDD"
function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
}

// Fonction pour formater la date en "4 mai 2024"
function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

// Fonction pour soumettre le vote (simulée pour l'exemple)
function submitVote(vote) {
    console.log('Vote submitted:', vote);
    // Ici, vous pouvez ajouter la logique pour enregistrer le vote via une API ou un service externe
}

// Fonction getVotes (simulée pour l'exemple)
function getVotes(date) {
    // Simulez ici la récupération du sujet du vote pour la date donnée
    return {
        date: date,
        subject: "Sujet du vote"
    };
}