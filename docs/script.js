// Fonction pour récupérer les données de l'API
async function fetchMedalsData() {
    try {
        const response = await fetch('https://sph-i-api.olympics.com/summer/info/api/FRA/widgets/medals-table');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return null;
    }
}

// Fonction pour obtenir l'URL du drapeau à partir du code NOC
async function getFlagUrl(countryCode) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await response.json();
        if (data && data[0] && data[0].flags) {
            return data[0].flags.svg; // URL du drapeau
        } else {
            console.error(`Drapeau non trouvé pour le code : ${countryCode}`);
            return null;
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération du drapeau pour le code ${countryCode}:`, error);
        return null;
    }
}

// Fonction pour remplir le tableau
async function populateTable() {
    const tableBody = document.querySelector("#medalsTable tbody");
    tableBody.innerHTML = '<tr><td colspan="6">Chargement des données...</td></tr>';

    const medalsData = await fetchMedalsData();
    if (medalsData) {
        console.log(medalsData); // Log the data to inspect its structure
        tableBody.innerHTML = '';
        for (const country of medalsData.medalsTable) {
            const row = tableBody.insertRow();
            const countryCode = country.code || ''; // Handle undefined code
            const flagUrl = await getFlagUrl(countryCode.toLowerCase());
            row.innerHTML = `
                <td>${country.rank}</td>
                <td>${flagUrl ? `<img src="${flagUrl}" alt="${country.description}" style="width: 20px; height: auto;">` : '🏳️'} ${country.description}</td>
                <td>🥇 ${country.gold}</td>
                <td>🥈 ${country.silver}</td>
                <td>🥉 ${country.bronze}</td>
                <td>${country.total}</td>
            `;
        }
    } else {
        tableBody.innerHTML = '<tr><td colspan="6">Erreur lors du chargement des données</td></tr>';
    }
}

// Appeler la fonction pour remplir le tableau quand la page est chargée
document.addEventListener("DOMContentLoaded", populateTable);
