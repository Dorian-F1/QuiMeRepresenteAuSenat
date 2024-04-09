// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour demander une date à l'utilisateur et afficher le sujet du vote correspondant
    function askForDateAndDisplayVote() {
        let dateInput = prompt("Veuillez entrer une date pour laquelle vous souhaitez connaître le sujet du vote (format YYYYMMDD):");
        if (dateInput) {
            const voteData = getVotes(dateInput);
            if (voteData && voteData.subject) {
                const voteSubjectElement = document.getElementById('voteSubject');
                voteSubjectElement.textContent = voteData.subject;
            } else {
                alert("Aucun vote trouvé pour cette date. Veuillez essayer une autre date.");
                askForDateAndDisplayVote();
            }
        }
    }

    // Appel initial pour demander la date et afficher le sujet du vote
    askForDateAndDisplayVote();

    // Gestion des clics sur les boutons de vote
    const voteAgainstButton = document.getElementById('voteAgainst');
    const voteForButton = document.getElementById('voteFor');

    function handleVote() {
        submitVote(this.id === 'voteAgainst' ? 'against' : 'for');
        askForDateAndDisplayVote(); // Demander une nouvelle date après un vote
    }

    voteAgainstButton.addEventListener('click', handleVote);
    voteForButton.addEventListener('click', handleVote);

    // Fonction pour soumettre le vote (simulée pour l'exemple)
    function submitVote(vote) {
        console.log('Vote submitted:', vote);
        // Ici, vous pouvez ajouter la logique pour enregistrer le vote via une API ou un service externe
    }
});

// Fonction getVotes (simulée pour l'exemple)
function getVotes(date) {
    // Cette fonction devrait interagir avec une API ou une base de données pour récupérer les données
    // Pour l'exemple, nous retournons un objet statique basé sur la date saisie
    // Simulez ici la récupération du sujet du vote pour la date donnée
    return {
        date: date,
        subject: "Sujet du vote du " + date
    };
}
