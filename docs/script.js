// Variables globales
let medalsData = null;

// Table de correspondance entre les codes NOC et les codes ISO 3166-1 alpha-2
const nocToIso = {
    AFG: 'AF', // Afghanistan
    ALB: 'AL', // Albania
    ALG: 'DZ', // Algeria
    AND: 'AD', // Andorra
    ANG: 'AO', // Angola
    ANT: 'AG', // Antigua and Barbuda
    ARG: 'AR', // Argentina
    ARM: 'AM', // Armenia
    ARU: 'AW', // Aruba
    ASA: 'AS', // American Samoa
    AUS: 'AU', // Australia
    AUT: 'AT', // Austria
    AZE: 'AZ', // Azerbaijan
    BAH: 'BS', // Bahamas
    BAN: 'BD', // Bangladesh
    BAR: 'BB', // Barbados
    BDI: 'BI', // Burundi
    BEL: 'BE', // Belgium
    BEN: 'BJ', // Benin
    BER: 'BM', // Bermuda
    BHU: 'BT', // Bhutan
    BIH: 'BA', // Bosnia and Herzegovina
    BIZ: 'BZ', // Belize
    BLR: 'BY', // Belarus
    BOL: 'BO', // Bolivia
    BOT: 'BW', // Botswana
    BRA: 'BR', // Brazil
    BRN: 'BN', // Brunei Darussalam
    BRU: 'BG', // Bulgaria
    BUL: 'BG', // Bulgaria
    BUR: 'BF', // Burkina Faso
    CAF: 'CF', // Central African Republic
    CAM: 'KH', // Cambodia
    CAN: 'CA', // Canada
    CAY: 'KY', // Cayman Islands
    CGO: 'CG', // Congo
    CHA: 'TD', // Chad
    CHI: 'CL', // Chile
    CHN: 'CN', // China
    CIV: 'CI', // Côte d'Ivoire
    CMR: 'CM', // Cameroon
    COD: 'CD', // Democratic Republic of the Congo
    COK: 'CK', // Cook Islands
    COL: 'CO', // Colombia
    COM: 'KM', // Comoros
    CPV: 'CV', // Cape Verde
    CRC: 'CR', // Costa Rica
    CRO: 'HR', // Croatia
    CUB: 'CU', // Cuba
    CYP: 'CY', // Cyprus
    CZE: 'CZ', // Czech Republic
    DEN: 'DK', // Denmark
    DJI: 'DJ', // Djibouti
    DMA: 'DM', // Dominica
    DOM: 'DO', // Dominican Republic
    ECU: 'EC', // Ecuador
    EGY: 'EG', // Egypt
    ERI: 'ER', // Eritrea
    ESA: 'SV', // El Salvador
    ESP: 'ES', // Spain
    EST: 'EE', // Estonia
    ETH: 'ET', // Ethiopia
    FIJ: 'FJ', // Fiji
    FIN: 'FI', // Finland
    FRA: 'FR', // France
    FSM: 'FM', // Micronesia
    GAB: 'GA', // Gabon
    GAM: 'GM', // Gambia
    GBR: 'GB', // Great Britain
    GBS: 'GW', // Guinea-Bissau
    GEO: 'GE', // Georgia
    GEQ: 'GQ', // Equatorial Guinea
    GER: 'DE', // Germany
    GHA: 'GH', // Ghana
    GRE: 'GR', // Greece
    GRN: 'GD', // Grenada
    GUA: 'GT', // Guatemala
    GUI: 'GN', // Guinea
    GUM: 'GU', // Guam
    GUY: 'GY', // Guyana
    HAI: 'HT', // Haiti
    HKG: 'HK', // Hong Kong
    HON: 'HN', // Honduras
    HUN: 'HU', // Hungary
    INA: 'ID', // Indonesia
    IND: 'IN', // India
    IRI: 'IR', // Iran
    IRL: 'IE', // Ireland
    IRQ: 'IQ', // Iraq
    ISL: 'IS', // Iceland
    ISR: 'IL', // Israel
    ISV: 'VI', // Virgin Islands
    ITA: 'IT', // Italy
    IVB: 'VG', // British Virgin Islands
    JAM: 'JM', // Jamaica
    JOR: 'JO', // Jordan
    JPN: 'JP', // Japan
    KAZ: 'KZ', // Kazakhstan
    KEN: 'KE', // Kenya
    KGZ: 'KG', // Kyrgyzstan
    KIR: 'KI', // Kiribati
    KOR: 'KR', // Korea
    KOS: 'XK', // Kosovo
    KSA: 'SA', // Saudi Arabia
    KUW: 'KW', // Kuwait
    LAO: 'LA', // Laos
    LAT: 'LV', // Latvia
    LBA: 'LY', // Libya
    LBR: 'LR', // Liberia
    LCA: 'LC', // Saint Lucia
    LES: 'LS', // Lesotho
    LIB: 'LB', // Lebanon
    LIE: 'LI', // Liechtenstein
    LTU: 'LT', // Lithuania
    LUX: 'LU', // Luxembourg
    MAD: 'MG', // Madagascar
    MAR: 'MA', // Morocco
    MAS: 'MY', // Malaysia
    MAW: 'MW', // Malawi
    MDA: 'MD', // Moldova
    MDV: 'MV', // Maldives
    MEX: 'MX', // Mexico
    MGL: 'MN', // Mongolia
    MHL: 'MH', // Marshall Islands
    MKD: 'MK', // North Macedonia
    MLI: 'ML', // Mali
    MLT: 'MT', // Malta
    MNE: 'ME', // Montenegro
    MON: 'MC', // Monaco
    MOZ: 'MZ', // Mozambique
    MRI: 'MU', // Mauritius
    MTN: 'MR', // Mauritania
    MYA: 'MM', // Myanmar
    NAM: 'NA', // Namibia
    NCA: 'NI', // Nicaragua
    NED: 'NL', // Netherlands
    NEP: 'NP', // Nepal
    NGR: 'NG', // Nigeria
    NIG: 'NE', // Niger
    NOR: 'NO', // Norway
    NRU: 'NR', // Nauru
    NZL: 'NZ', // New Zealand
    OMA: 'OM', // Oman
    PAK: 'PK', // Pakistan
    PAN: 'PA', // Panama
    PAR: 'PY', // Paraguay
    PER: 'PE', // Peru
    PHI: 'PH', // Philippines
    PLE: 'PS', // Palestine
    PLW: 'PW', // Palau
    PNG: 'PG', // Papua New Guinea
    POL: 'PL', // Poland
    POR: 'PT', // Portugal
    PRK: 'KP', // North Korea
    PUR: 'PR', // Puerto Rico
    QAT: 'QA', // Qatar
    ROU: 'RO', // Romania
    RSA: 'ZA', // South Africa
    RUS: 'RU', // Russia
    RWA: 'RW', // Rwanda
    SAM: 'WS', // Samoa
    SEN: 'SN', // Senegal
    SEY: 'SC', // Seychelles
    SGP: 'SG', // Singapore
    SKN: 'KN', // Saint Kitts and Nevis
    SLE: 'SL', // Sierra Leone
    SLO: 'SI', // Slovenia
    SMR: 'SM', // San Marino
    SOL: 'SB', // Solomon Islands
    SOM: 'SO', // Somalia
    SRB: 'RS', // Serbia
    SRI: 'LK', // Sri Lanka
    SSD: 'SS', // South Sudan
    STP: 'ST', // Sao Tome and Principe
    SUD: 'SD', // Sudan
    SUI: 'CH', // Switzerland
    SUR: 'SR', // Suriname
    SVK: 'SK', // Slovakia
    SWE: 'SE', // Sweden
    SWZ: 'SZ', // Eswatini
    SYR: 'SY', // Syria
    TAN: 'TZ', // Tanzania
    TGA: 'TO', // Tonga
    THA: 'TH', // Thailand
    TJK: 'TJ', // Tajikistan
    TKM: 'TM', // Turkmenistan
    TLS: 'TL', // Timor-Leste
    TOG: 'TG', // Togo
    TPE: 'TW', // Chinese Taipei
    TTO: 'TT', // Trinidad and Tobago
    TUN: 'TN', // Tunisia
    TUR: 'TR', // Turkey
    TUV: 'TV', // Tuvalu
    UAE: 'AE', // United Arab Emirates
    UGA: 'UG', // Uganda
    UKR: 'UA', // Ukraine
    URU: 'UY', // Uruguay
    USA: 'US', // United States
    UZB: 'UZ', // Uzbekistan
    VAN: 'VU', // Vanuatu
    VEN: 'VE', // Venezuela
    VIE: 'VN', // Vietnam
    YEM: 'YE', // Yemen
    ZAM: 'ZM', // Zambia
    ZIM: 'ZW', // Zimbabwe
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
