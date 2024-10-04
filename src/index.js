const express = require('express');
const { getStockPrice } = require('./api');
const { executeTrades, getSummary } = require('./tradingLogic');

const app = express();
const port = process.env.port || 3000;

// Fetch stock prices and execute trades every minute
const TRADE_INTERVAL = 60 * 1000;  // 1 minute interval

function startTradingBot() {
    setInterval(async () => {
        try {
            // Fetch the latest stock price from the API
            const stockData = await getStockPrice();
            console.log("Stock Data Received:", stockData);

            // Execute the trading strategy
            const tradeResult = executeTrades(stockData);
            console.log(tradeResult);  // Log the trade action (buy/sell or no action)
        } catch (error) {
            console.error("Error during trade execution:", error.message);
        }
    }, TRADE_INTERVAL);
}

// Start the trading bot
startTradingBot();

// Route to get the profit/loss summary
app.get('/summary', (req, res) => {
    const summary = getSummary();
    res.json({ message: "Summary report", data: summary });
});

// Start the server
app.listen(port, () => {
    console.log(`Trading bot running on port ${port}`);
});
