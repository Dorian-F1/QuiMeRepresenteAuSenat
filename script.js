
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

// Fonction pour initialiser la date d'aujourd'hui et la mettre à jour lors du clic sur les boutons
function initDateAndSetupControls() {




    let currentDate = new Date();

    // Fonction pour mettre à jour l'affichage de la date
    function updateDateDisplay() {
        const formattedDate = formatDate(currentDate);
        document.getElementById('voteSubject').textContent = `Vote du ${formattedDate}`;
    }

    // Mettre à jour l'affichage de la date initialement
    updateDateDisplay();

    // Fonction pour passer au jour précédent
    function goToPreviousDay() {
        // Soustraire un jour
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
    }

    // Ajouter des écouteurs d'événements sur les boutons pour et contre
    document.getElementById('voteFor').addEventListener('click', goToPreviousDay);
    document.getElementById('voteAgainst').addEventListener('click', goToPreviousDay);

}

// Appeler la fonction initDateAndSetupControls lorsque la page est chargée
document.addEventListener('DOMContentLoaded', initDateAndSetupControls);
