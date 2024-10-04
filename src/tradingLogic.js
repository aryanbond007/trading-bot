const fs = require('fs');
const path = require('path');

let position = null;  // Tracks if the bot is holding a stock
let balance = 1000;  // Starting balance in USD
let tradeLog = [];  // In-memory trade log
const tradesFilePath = path.join(__dirname, '../data/trades.json');  // Path to trades.json file

// Load existing trades from trades.json when the server starts
try {
    if (fs.existsSync(tradesFilePath)) {
        const data = fs.readFileSync(tradesFilePath, 'utf8');
        // Check if the file is empty
        if (data.trim()) {
            tradeLog = JSON.parse(data);  // Parse if data exists
        } else {
            tradeLog = [];  // Initialize with empty array if file is empty
        }
    } else {
        // Initialize with empty array if file doesn't exist
        tradeLog = [];
    }
} catch (error) {
    console.error('Error reading or parsing trades.json:', error.message);
    tradeLog = [];  // Initialize with empty array in case of error
}

// Define buy and sell thresholds
const BUY_THRESHOLD = 0.98;  // Buy when price drops by 2%
const SELL_THRESHOLD = 1.03;  // Sell when price rises by 3%

// Helper function to save trades to trades.json
function saveTradesToFile() {
    try {
        fs.writeFileSync(tradesFilePath, JSON.stringify(tradeLog, null, 2), 'utf8');
    } catch (error) {
        console.error('Error saving trades to file:', error.message);
    }
}

// Trading strategy logic
function executeTrades(stockData) {
    const { price, timestamp } = stockData;
    let actionTaken = null;

    if (!position) {
        // No active position, check if we should buy
        if (price <= balance * BUY_THRESHOLD) {
            position = { price, timestamp };
            tradeLog.push({ action: 'buy', price, timestamp });
            saveTradesToFile();  // Save the trade to file
            actionTaken = `Bought at ${price}`;
        }
    } else {
        // Active position, check if we should sell
        const sellPrice = position.price * SELL_THRESHOLD;
        if (price >= sellPrice) {
            const profit = price - position.price;
            balance += profit;  // Update balance with profit
            tradeLog.push({ action: 'sell', price, timestamp, profit });
            saveTradesToFile();  // Save the trade to file
            position = null;  // Clear position after selling
            actionTaken = `Sold at ${price} for a profit of ${profit}`;
        }
    }

    if (!actionTaken) {
        actionTaken = `No action at price ${price}`;
    }
    
    return actionTaken;
}

// Get trade summary report (profit/loss and balance)
function getSummary() {
    const profitLoss = tradeLog.reduce((acc, trade) => acc + (trade.profit || 0), 0);

    return {
        balance,
        profitLoss,
        trades: tradeLog
    };
}

module.exports = { executeTrades, getSummary };
