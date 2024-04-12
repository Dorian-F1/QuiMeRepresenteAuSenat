import { createClient } from '@supabase/supabase-js'

// Créer un client Supabase unique pour interagir avec votre base de données
const supabase = createClient('https://nuigxviqflxckmqrnuni.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51aWd4dmlxZmx4Y2ttcXJudW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MjIzODQsImV4cCI6MjAyNTQ5ODM4NH0.fsyXZuidgJ7zOz0Sxh1ktZbChWi22-__2ikd2F31XOA')


// Fonction asynchrone pour récupérer et afficher les votes
async function fetchAndDisplayVotes() {
    let { data: Votes, error } = await supabase
      .from('Votes')
      .select('id_scrutin, name, vote')
  
    // Vérifier s'il y a une erreur
    if (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } else {
      console.log('Données récupérées:', Votes);
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

// Fonction pour initialiser la date d'aujourd'hui et la mettre à jour lors du clic sur les boutons
function initDateAndSetupControls() {

    // Appeler la fonction pour récupérer et afficher les votes
    fetchAndDisplayVotes();



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
