const input = document.getElementById("tempInput");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");
const description = document.getElementById("description");
const historyList = document.getElementById("history");


let typingTimer;
const TYPING_DELAY = 600; // milliseconds

input.addEventListener("input", () => {
    convert();

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        saveFinalConversion();
    }, TYPING_DELAY);
});
let lastSaved = "";

fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);

loadHistory();

function convert() {
    const value = parseFloat(input.value);
    if (isNaN(value)) {
        result.innerText = "Result: --";
        description.innerText = "";
        result.className = "";
        return;
    }

    let celsius;

    // Convert input to Celsius
    if (fromUnit.value === "celsius") celsius = value;
    else if (fromUnit.value === "fahrenheit") celsius = (value - 32) * 5 / 9;
    else celsius = value - 273.15;

    let finalTemp;
    if (toUnit.value === "celsius") finalTemp = celsius;
    else if (toUnit.value === "fahrenheit") finalTemp = (celsius * 9 / 5) + 32;
    else finalTemp = celsius + 273.15;

    result.innerText = `Result: ${finalTemp.toFixed(2)} ${unitSymbol(toUnit.value)}`;

    applyColor(celsius);
    setDescription(celsius);
}


function applyColor(temp) {
    result.className = "";

    if (temp < 10) result.classList.add("cold");
    else if (temp >= 30) result.classList.add("hot");
    else result.classList.add("moderate");
}


function setDescription(temp) {
    const kelvin = temp + 273.15;

    if (kelvin <= 0) {
        description.innerText = "Absolute zero (0 K) – no molecular motion 🧊";
    }
    else if (temp < 0) {
        description.innerText = "Below freezing point ❄️";
    }
    else if (temp === 0) {
        description.innerText = "Freezing point of water (273.15 K) ❄️";
    }
    else if (temp < 20) {
        description.innerText = "Cool weather 🌬️";
    }
    else if (temp < 30) {
        description.innerText = "Comfortable temperature 😊";
    }
    else if (temp < 36) {
        description.innerText = "Warm weather ☀️";
    }
    else if (temp <= 37) {
        description.innerText = "Normal human body temperature 🌡️";
    }
    else if (temp < 40) {
        description.innerText = "High body temperature (Fever) 🤒";
    }
    else if (temp < 100) {
        description.innerText = "Very hot conditions 🔥";
    }
    else if (temp === 100) {
        description.innerText = "Boiling point of water (373.15 K) 🔥";
    }
    else {
        description.innerText = "Extreme heat ⚠️";
    }
}


function swapUnits() {
    let temp = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = temp;
    convert();
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

/* Conversion History */
function saveHistory(inputVal, from, outputVal, to) {
    const current = `${inputVal}-${from}-${outputVal}-${to}`;
    if (current === lastSaved) return;
    lastSaved = current;

    let history = JSON.parse(localStorage.getItem("tempHistory")) || [];

    history.unshift({
        input: Number(inputVal).toFixed(2),
        fromUnit: from,
        output: Number(outputVal).toFixed(2),
        toUnit: to
    });

    history = history.slice(0, 5);
    localStorage.setItem("tempHistory", JSON.stringify(history));
    loadHistory();
}


function loadHistory() {
    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("tempHistory")) || [];

    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";

        div.innerHTML = `
            <span class="history-from">${item.input} ${unitSymbol(item.fromUnit)}</span>
            <span class="history-arrow">→</span>
            <span class="history-to">${item.output} ${unitSymbol(item.toUnit)}</span>
        `;

        historyList.appendChild(div);
    });
}

function unitSymbol(unit) {
    if (unit === "celsius") return "°C";
    if (unit === "fahrenheit") return "°F";
    return "K";
}

function saveFinalConversion() {
    let value = parseFloat(input.value);
    if (isNaN(value)) return;

    let celsius;
    if (fromUnit.value === "celsius") celsius = value;
    else if (fromUnit.value === "fahrenheit") celsius = (value - 32) * 5 / 9;
    else celsius = value - 273.15;

    let finalTemp;
    if (toUnit.value === "celsius") finalTemp = celsius;
    else if (toUnit.value === "fahrenheit") finalTemp = (celsius * 9 / 5) + 32;
    else finalTemp = celsius + 273.15;

    saveHistory(value, fromUnit.value, finalTemp, toUnit.value);
}
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        saveFinalConversion();
    }
});

fromUnit.addEventListener("change", saveFinalConversion);
toUnit.addEventListener("change", saveFinalConversion);

function clearHistory() {
    localStorage.removeItem("tempHistory");
    historyList.innerHTML = "";
}
