import { dates } from "./utils/dates.js";

const tickersArr = [];
const generateReportBtn = document.querySelector(".generate-report-btn");

generateReportBtn.addEventListener("click", fetchStockData);

document.getElementById("ticker-input-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const tickerInput = document.getElementById("ticker-input");
    if (tickerInput.value.length > 2) {
        generateReportBtn.disabled = false;
        const newTickerStr = tickerInput.value.toUpperCase();
        tickersArr.push(newTickerStr);
        tickerInput.value = "";
        renderTickers();
    } else {
        const label = document.getElementsByTagName("label")[0];
        label.style.color = "red";
        label.textContent =
            "You must add at least one ticker. A ticker is a 3-letter or more stock code (e.g., TSLA for Tesla).";
    }
});

function renderTickers() {
    const tickersDiv = document.querySelector(".ticker-choice-display");
    tickersDiv.innerHTML = "";
    tickersArr.forEach((ticker) => {
        const newTickerSpan = document.createElement("span");
        newTickerSpan.textContent = ticker;
        newTickerSpan.classList.add("ticker");
        tickersDiv.appendChild(newTickerSpan);
    });
}

const loadingArea = document.querySelector(".loading-panel");
const apiMessage = document.getElementById("api-message");

async function fetchStockData() {
    document.querySelector(".action-panel").style.display = "none";
    loadingArea.style.display = "flex";

    try {
        const stockData = await Promise.all(
            tickersArr.map(async (ticker) => {
                const response = await fetch(`http://localhost:5000/stocks/${ticker}`);
                const data = await response.json();
                return data;
            })
        );
        fetchReport(stockData);
    } catch (err) {
        loadingArea.innerText = "There was an error fetching stock data.";
        console.error("error: ", err);
    }
}

async function fetchReport(data) {
    const messages = [
        {
            role: "system",
            content:
                "You are a trading AI. Given stock data for the past 3 days, write a 150-word analysis recommending whether to buy, hold, or sell.",
        },
        {
            role: "user",
            content: JSON.stringify(data),
        },
    ];

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages }),
        });

        const result = await response.json();
        renderReport(result.message);
    } catch (err) {
        console.error("Error:", err);
        loadingArea.innerText = "Unable to access AI. Please refresh and try again.";
    }
}

function renderReport(output) {
    loadingArea.style.display = "none";
    const outputArea = document.querySelector(".output-panel");
    const report = document.createElement("p");
    outputArea.appendChild(report);
    report.textContent = output;
    outputArea.style.display = "flex";
}
