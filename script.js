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

    // URL de l'image à ajouter
    const imageUrl = "https://nuigxviqflxckmqrnuni.supabase.co/storage/v1/object/public/photos/aeschlimann_marie.jpg";

    // Créer un nouvel élément <img>
    const imageElement = document.createElement('img');

    // Définir l'URL de l'image
    imageElement.src = imageUrl;

    // Optionnel : Ajouter des styles à l'image, par exemple pour contrôler sa taille
    imageElement.style.width = '100px'; // Exemple de réglage de la largeur de l'image
    imageElement.style.height = 'auto'; // Conserver le ratio d'aspect

    // Trouver le bouton "Pour" par son id
    const boutonPour = document.getElementById('voteFor');

    // Insérer l'image dans le DOM juste après le bouton "Pour"
    boutonPour.insertAdjacentElement('afterend', imageElement);

}

// Appeler la fonction initDateAndSetupControls lorsque la page est chargée
document.addEventListener('DOMContentLoaded', initDateAndSetupControls);
