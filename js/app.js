let HT = document.querySelector("#montantHT");
let TVA = document.querySelector("#montantTVA");
let TTC = document.querySelector("#montantTTC");
let PERCENT_TVA = document.querySelector("#tauxTVA");
let BUTTONS = document.querySelectorAll("input[type='button']");
let SUMUP = document.querySelector("#totalTva");

const LIST_INPUT_TEL = document.querySelectorAll("input[type='tel']");

for (let i = 0; i < LIST_INPUT_TEL.length; i++) {
    LIST_INPUT_TEL[i].addEventListener("keyup", function () {
        calculateTVA(this.id);
    });
}

function formatNumber(number) {
    return number + " €";
}

function cleanValue(rawValue, symbol) {

    return rawValue.replace(symbol, "").trim();

}

function round(floatNumber) {
    return Math.round(floatNumber * 100) / 100;
}

function calculateTVA(id) {

    let ht;
    let tva;
    let ttc;
    let percentTVA = cleanValue(PERCENT_TVA.value, "%");

    if (id == "montantHT" || id == "tauxTVA") {
        ht = parseFloat(cleanValue(HT.value, "€"));
        tva = round((ht * percentTVA) / 100); // mon calcul
        ttc = round(tva + ht);
        // soit ht => tva + ttc
        TVA.value = formatNumber(tva);
        TTC.value = formatNumber(ttc);

    } else if (id == "montantTVA") {
        tva = parseFloat(cleanValue(TVA.value, "€"));
        ht = round(tva / (percentTVA / 100)); // calcul
        ttc = round(ht + tva); // calcul
        // soit tva => ht + ttc
        HT.value = ht;
        TTC.value = ttc;

    } else if(id == "montantTTC") {
        // ttc => ht + tva
        ttc = parseFloat(cleanValue(TTC.value, "€"));
        ht = round(ttc / (1 + percentTVA / 100))// calcul
        tva = round(ttc - ht);  // calcul
        HT.value = formatNumber(ht);
        TVA.value = formatNumber(tva);
    }

    SUMUP.innerHTML = "<p> Montant HT : " + ht + "€</p>";
    SUMUP.innerHTML += "<p> Montant TVA : " + tva + "€</p>";
    SUMUP.innerHTML += "<p> Montant TTC : " + ttc + "€</p>";
}

for(let i = 0; i<BUTTONS.length; i++) {
    BUTTONS[i].addEventListener("click", function() {
        PERCENT_TVA.value = this.value;
        calculateTVA("tauxTVA");
    });
}