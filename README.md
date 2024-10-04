The project implements an automated trading bot using Node.js. The bot simulates trades on a hypothetical stock market by fetching real-time stock prices from the Twelve Data API and executing buy/sell orders based on predefined rules.

The trading bot continuously monitors stock price fluctuations and makes trading decisions (buy/sell) according to simple strategies such as:

Buy if the stock price drops by 2% from the initial balance.
Sell if the stock price rises by 3% after buying.

How it works:

The bot fetches stock prices from the Twelve Data API every minute using setInterval().
On each price fetch, the bot executes the trading logic (executeTrades()), which decides whether to buy or sell based on the price.

The getStockPrice() function calls the Twelve Data API and retrieves the latest stock price for a specific stock symbol (e.g., IBM).
The stock price and timestamp are returned to be used by the trading logic.

A [/summary](http://localhost:3000/summary) endpoint is available to view the bot's current balance, trade log, and profit/loss report.

Key Features:
Fetches real-time stock prices from the Twelve Data API.
Executes trades based on a simple trading strategy.
Tracks the bot’s balance, positions, and overall profit/loss.
Logs all trades to a JSON file (trades.json).
Automatically monitors the stock price every minute and triggers trades when conditions are met.


How to Run the Project:

npm install express axios

npm start

http://localhost:3000/summary
