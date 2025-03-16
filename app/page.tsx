'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { calculateMortgage } from './utils/mortgageCalculator';
import { translations, Language } from './translations';

export default function Home() {
  const [housePrice, setHousePrice] = useState<number>(500000);
  const [downPayment, setDownPayment] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [amortizationYears, setAmortizationYears] = useState<number>(25);
  const [monthsToShow, setMonthsToShow] = useState<number>(12);
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  const handleCalculate = () => {
    const result = calculateMortgage(housePrice, downPayment, interestRate, amortizationYears);
    return result;
  };

  const result = handleCalculate();
  const totalInterest = result.schedule.reduce((sum: number, payment) => sum + payment.interestPayment, 0);
  const totalPrincipal = result.schedule.reduce((sum: number, payment) => sum + payment.principalPayment, 0);

  const COLORS = ['#3B82F6', '#F97316'];
  const pieData = [
    { name: t.principal, value: totalPrincipal, color: COLORS[0] },
    { name: t.interest, value: totalInterest, color: COLORS[1] },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Русский' },
    { value: 'ko', label: '한국어' },
    { value: 'uz', label: 'O&apos;zbekcha' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-end mb-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-3 py-2 rounded border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">{t.title}</h1>
          <p className="text-sm sm:text-base text-gray-600">{t.subtitle}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-4 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.housePrice}</label>
              <input
                type="number"
                value={housePrice}
                onChange={(e) => setHousePrice(Number(e.target.value))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.downPayment}</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.interestRate}</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.amortizationPeriod}</label>
              <select
                value={amortizationYears}
                onChange={(e) => setAmortizationYears(Number(e.target.value))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[5, 10, 15, 20, 25, 30].map((years) => (
                  <option key={years} value={years}>{years} {t.years}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t.results}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-base sm:text-lg">
                {t.monthlyPayment}: <span className="font-bold">${result.monthlyPayment.toFixed(2)}</span>
              </p>
              <p className="text-base sm:text-lg">
                {t.totalInterest}: <span className="font-bold">${totalInterest.toFixed(2)}</span>
              </p>
              <p className="text-base sm:text-lg">
                {t.totalAmount}: <span className="font-bold">${(totalPrincipal + totalInterest).toFixed(2)}</span>
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.showMonths}</label>
                <select
                  value={monthsToShow}
                  onChange={(e) => setMonthsToShow(Number(e.target.value))}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[12, 24, 36, 48, 60].map((months) => (
                    <option key={months} value={months}>{months} {t.months}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="h-64 sm:h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: $${(value / 1000).toFixed(1)}K`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `$${value.toFixed(2)}`}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 sm:p-6 overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t.amortizationSchedule}</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.month}</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.payment}</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.principal}</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.interest}</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.remainingBalance}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.schedule.slice(0, monthsToShow).map((payment, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{index + 1}</td>
                      <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">${payment.monthlyPayment.toFixed(2)}</td>
                      <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">${payment.principalPayment.toFixed(2)}</td>
                      <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">${payment.interestPayment.toFixed(2)}</td>
                      <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">${payment.remainingBalance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
