const axios = require('axios');

// Function to get stock price from Alpha Vantage


// Function to get stock price from IEX Cloud
async function getStockPrice() {
    const apiKey = '47d504ef87204178b62a113ce6e33751';  
    const interval = '1min';// Replace with your IEX Cloud API key
    const symbol = 'IBM';  // Stock symbol to monitor
    const apiUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        console.log("API Response Data:", response.data);
        
        // Check if the response contains valid data
        if (!response.data || !response.data.values) {
            throw new Error('Time Series data not found in API response');
        }

        // Extract stock price from the latest data point
        const latestData = response.data.values[0];
        const stockPrice = parseFloat(latestData.close);
        const timestamp = latestData.datetime;
        
        // Return the stock price and timestamp
        return { price: stockPrice, timestamp };
    } catch (error) {
        console.error("Error fetching stock data:", error.message);
        throw new Error('Error fetching stock data');
    }
}

module.exports = { getStockPrice };

//     const apiKey = process.env.api_key; 
//     const symbol = 'IBM';
//     const interval = '1min';
//     const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    
//     try {
//         const response = await axios.get(apiUrl);
//         console.log("Full API Response:", response.data);
        
//         // Logging the full response data to check if the API is working
       
        
//         const timeSeries = response.data['Time Series (1min)'];

//         if (!timeSeries) {
//             throw new Error('Time Series data not found in API response');
//         }

//         // Extracting the latest price
//         const latestTime = Object.keys(timeSeries)[0];
//         const latestData = timeSeries[latestTime];
//         const stockPrice = parseFloat(latestData['4. close']);
        
//         return { price: stockPrice, timestamp: latestTime };
//     } catch (error) {
//         // Logging the full error object to understand the issue
//         console.error("Error fetching stock data:", error);
//         throw new Error('Error fetching stock data');
//     }
// }

