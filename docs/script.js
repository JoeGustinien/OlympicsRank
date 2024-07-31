// Variables globales
let medalsData = null;

// Table de correspondance entre les codes NOC et les codes ISO 3166-1 alpha-2
const nocToIso = {
    USA: 'US',
    FRA: 'FR',
    GBR: 'GB',
    CHN: 'CN',
    JPN: 'JP',
    AUS: 'AU',
    ITA: 'IT',
    KOR: 'KR',
    CAN: 'CA',
    BRA: 'BR',
    GER: 'DE',
    HKG: 'HK',
    KAZ: 'KZ',
    RSA: 'ZA',
    POL: 'PL',
    SWE: 'SE',
    NED: 'NL',
    NZL: 'NZ',
    BEL: 'BE',
    IRL: 'IE',
    PRK: 'KP',
    KOS: 'XK',
    MEX: 'MX',
    SUI: 'CH',
    TUR: 'TR',
    IND: 'IN',
    MDA: 'MD',
    ARG: 'AR',
    AZE: 'AZ',
    ROU: 'RO',
    SLO: 'SI',
    SRB: 'RS',
    UZB: 'UZ',
    FIJ: 'FJ',
    GEO: 'GE',
    MGL: 'MN',
    TUN: 'TN',
    CRO: 'HR',
    EGY: 'EG',
    ESP: 'ES',
    GUA: 'GT',
    HUN: 'HU',
    SVK: 'SK',
    TJK: 'TJ',
    UKR: 'UA',
};

// Fonction pour convertir un code ISO 3166-1 alpha-2 en emoji drapeau
function isoToFlagEmoji(isoCode) {
    return isoCode
        .toUpperCase()
        .split('')
        .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
        .join('');
}

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
function getCountryEmoji(noc) {
    const isoCode = nocToIso[noc];
    return isoCode ? isoToFlagEmoji(isoCode) : '🏳️';
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
            const countryCode = country.noc;
            const countryEmoji = getCountryEmoji(countryCode);
            const row = tableBody.insertRow();
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
