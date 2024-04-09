// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Supposons que vous avez une fonction getVotes qui retourne un objet avec le sujet du vote
    // Pour l'exemple, nous utilisons une date fixe
    const voteData = getVotes('20240409'); // Utilisez la date actuelle ou une logique pour obtenir la date

    // Affichage du sujet du vote
    const voteSubjectElement = document.getElementById('voteSubject');
    voteSubjectElement.textContent = voteData.subject;

    // Gestion des swipes et des clics sur les boutons
    const voteAgainstButton = document.getElementById('voteAgainst');
    const voteForButton = document.getElementById('voteFor');

    voteAgainstButton.addEventListener('click', function() {
        submitVote('against');
    });

    voteForButton.addEventListener('click', function() {
        submitVote('for');
    });

    // Gestion des swipes (nécessite une librairie de détection de swipe ou du code supplémentaire)
    // Exemple avec pseudo-code
    /*
    swipeDetector.on('swipeleft', function() {
        submitVote('against');
    });

    swipeDetector.on('swiperight', function() {
        submitVote('for');
    });
    */

    // Fonction pour soumettre le vote
    function submitVote(vote) {
        console.log('Vote submitted:', vote);
        // Ici, vous pouvez ajouter la logique pour enregistrer le vote via une API ou un service externe
    }
});

// Fonction getVotes (simulée pour l'exemple)
function getVotes(date) {
    // Cette fonction devrait interagir avec une API ou une base de données pour récupérer les données
    // Pour l'exemple, nous retournons un objet statique
    return {
        date: date,
        subject: "Sujet du vote du " + date
    };
}
