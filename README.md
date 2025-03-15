# Multilingual Mortgage Calculator

A modern, user-friendly mortgage calculator built with Next.js and TypeScript that supports multiple languages (English, Russian, Korean, and Uzbek).

![Mortgage Calculator Screenshot]
[You can add a screenshot of your application here]

## Features

- 🌍 Multilingual support (English, Russian, Korean, Uzbek)
- 💰 Calculate monthly mortgage payments
- 📊 Interactive pie chart showing principal vs interest
- 📅 Detailed amortization schedule
- 💵 Real-time calculations
- 🎨 Modern, responsive UI with Tailwind CSS
- 📱 Mobile-friendly design

## Key Calculations

- Monthly mortgage payments
- Total interest over the loan term
- Complete amortization schedule
- Principal and interest breakdown
- Remaining balance tracking

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Data visualization
- [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms) - Form styling

## Getting Started

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd mortgagecalc
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter the house price
2. Specify your down payment
3. Set the loan term (in years)
4. Input the interest rate
5. Click "Calculate Mortgage" to see results
6. View the monthly payment, total interest, and amortization schedule
7. Use the language selector to switch between supported languages

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Select the "Next.js" framework preset
5. Click "Deploy"

Your application will be automatically built and deployed. Vercel will provide you with a production URL.

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Requirements

- Node.js 18.0.0 or later
- npm 7.0.0 or later

## Project Structure

```
mortgagecalc/
├── app/
│   ├── page.tsx           # Main calculator component
│   ├── translations.ts    # Language translations
│   ├── globals.css        # Global styles
│   └── utils/
│       └── mortgageCalculator.ts  # Calculation logic
├── public/
└── ...configuration files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the excellent framework
- Tailwind CSS team for the styling utilities
- Recharts team for the charting library
