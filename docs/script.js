// Variables globales
let medalsData = null;

// Fonction pour récupérer les données de l'API
async function fetchMedalsData() {
    try {
        const response = await fetch('https://sph-i-api.olympics.com/summer/info/api/FRA/widgets/medals-table');
        const data = await response.json();
        console.log('Données des médailles récupérées:', data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return null;
    }
}

// Fonction pour obtenir l'emoji du pays à partir du code NOC
async function getCountryEmoji(countryCode) {
    try {
        console.log(`Récupération de l'emoji pour ${countryCode}`);
        const response = await fetch('https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const country = data.find(c => c.code === countryCode.toUpperCase());
        
        if (country) {
            console.log(`Emoji trouvé pour ${countryCode}:`, country.emoji);
            return country.emoji;
        } else {
            console.warn(`Emoji non trouvé pour le code : ${countryCode}`);
            return '🏳️';
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'emoji pour le code ${countryCode}:`, error);
        return '🏳️';
    }
}

// Fonction pour trier les données
function sortData(data, sortType) {
    return data.sort((a, b) => {
        if (sortType === 'total') {
            return b.total - a.total;
        } else if (sortType === 'weighted') {
            const weightedA = a.gold * 3 + a.silver * 2 + a.bronze;
            const weightedB = b.gold * 3 + b.silver * 2 + b.bronze;
            return weightedB - weightedA;
        } else if (sortType === 'gold') {
            return b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze;
        }
    });
}

// Fonction pour remplir le tableau
async function populateTable(sortType = 'total') {
    const tableBody = document.querySelector("#medalsTable tbody");
    tableBody.innerHTML = '<tr><td colspan="6">Chargement des données...</td></tr>';

    if (!medalsData) {
        medalsData = await fetchMedalsData();
    }

    if (medalsData) {
        const sortedData = sortData(medalsData.medalsTable, sortType);
        tableBody.innerHTML = '';
        for (let i = 0; i < sortedData.length; i++) {
            const country = sortedData[i];
            const row = tableBody.insertRow();
            const countryCode = country.code || '';
            const countryEmoji = await getCountryEmoji(countryCode);
            row.innerHTML = `
                 <td class="rank">${i + 1}</td>
                <td class="country">${countryEmoji} ${country.description}</td>
                <td class="gold">🥇 ${country.gold}</td>
                <td class="silver">🥈 ${country.silver}</td>
                <td class="bronze">🥉 ${country.bronze}</td>
                <td class="total">${country.total}</td>
            `;
        }
    } else {
        tableBody.innerHTML = '<tr><td colspan="6">Erreur lors du chargement des données</td></tr>';
    }
}

// Fonction d'initialisation
function init() {
    populateTable('total');

    document.getElementById('sortTotal').addEventListener('click', () => populateTable('total'));
    document.getElementById('sortWeighted').addEventListener('click', () => populateTable('weighted'));
    document.getElementById('sortGold').addEventListener('click', () => populateTable('gold'));
}

// Appeler la fonction d'initialisation quand la page est chargée
document.addEventListener("DOMContentLoaded", init);