const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");

        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }

        select.appendChild(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update Flag Function
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Get Exchange Rate
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;

    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = 1;
    }

    const URL = `https://open.er-api.com/v6/latest/${fromCurr.value}`;

    try {
            let response = await fetch(URL);
            let data = await response.json();
    
            let rate = data.rates[toCurr.value];

            let finalAmount = amtValue * rate;
    
            msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount.toFixed(
                    2
                )} ${toCurr.value}`;
            } catch (error) {
                    msg.innerText = "Failed to fetch exchange rate.";
                    console.error(error);
                }
            };
            
            // Button Click
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// Page Load
window.addEventListener("load", () => {
        updateExchangeRate();
    });
    
    
