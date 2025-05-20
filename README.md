# emi calculator

A modern, single-page web application built with React and Material UI for calculating loan EMIs and viewing exchange rates.

## Features

- Loan EMI calculation using standard financial formulas
- Dynamic amortization schedule with monthly breakdown
- Real-time currency conversion using live exchange rates
- Dark/Light mode toggle
- Responsive design with mobile-friendly navigation
- Error handling and 404 page

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Exchange Rate API key from [ExchangeRate-API](https://www.exchangerate-api.com/)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd loan-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Exchange Rate API key:
```
REACT_APP_EXCHANGE_RATE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

1. **EMI Calculator**
   - Enter the loan amount
   - Specify the interest rate
   - Set the loan term in years
   - View the calculated EMI and amortization schedule

2. **Exchange Rates**
   - View current exchange rates for 160+ currencies
   - Use pagination to navigate through the rates table

## Technologies Used

- React (Hooks, Context API, Routing)
- TypeScript
- Material UI
- Axios for API calls
- Exchange Rate API for currency conversion

## Error Handling

The application includes:
- Runtime error handling with a dedicated error page
- 404 Not Found page for unmatched routes
- Graceful fallbacks for API failures

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
