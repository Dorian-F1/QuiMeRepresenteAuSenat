// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialise avec la date d'aujourd'hui
    let currentDate = new Date();

    // Affiche le sujet du vote pour la date actuelle
    displayVoteForDate(currentDate);

    // Gestion des clics sur les boutons de vote
    const voteAgainstButton = document.getElementById('voteAgainst');
    const voteForButton = document.getElementById('voteFor');

    function handleVote() {
        submitVote(this.id === 'voteAgainst' ? 'against' : 'for');
        // Passe au jour précédent
        currentDate.setDate(currentDate.getDate() - 1);
        displayVoteForDate(currentDate);
    }

    voteAgainstButton.addEventListener('click', handleVote);
    voteForButton.addEventListener('click', handleVote);
});

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
