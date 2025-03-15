'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
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

  const pieData = [
    { name: t.principal, value: totalPrincipal },
    { name: t.interest, value: totalInterest },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <div className="flex justify-center gap-4 mb-8">
            <button onClick={() => setLanguage('en')} className={`px-4 py-2 rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>English</button>
            <button onClick={() => setLanguage('ru')} className={`px-4 py-2 rounded ${language === 'ru' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Русский</button>
            <button onClick={() => setLanguage('ko')} className={`px-4 py-2 rounded ${language === 'ko' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>한국어</button>
            <button onClick={() => setLanguage('uz')} className={`px-4 py-2 rounded ${language === 'uz' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>O&apos;zbekcha</button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.housePrice}</label>
              <input
                type="number"
                value={housePrice}
                onChange={(e) => setHousePrice(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.downPayment}</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.interestRate}</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.amortizationPeriod}</label>
              <select
                value={amortizationYears}
                onChange={(e) => setAmortizationYears(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                {[5, 10, 15, 20, 25, 30].map((years) => (
                  <option key={years} value={years}>{years} {t.years}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.results}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4">
                {t.monthlyPayment}: <span className="font-bold">${result.monthlyPayment.toFixed(2)}</span>
              </p>
              <p className="text-lg mb-4">
                {t.totalInterest}: <span className="font-bold">${totalInterest.toFixed(2)}</span>
              </p>
              <p className="text-lg mb-4">
                {t.totalAmount}: <span className="font-bold">${(totalPrincipal + totalInterest).toFixed(2)}</span>
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.showMonths}</label>
                <select
                  value={monthsToShow}
                  onChange={(e) => setMonthsToShow(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                >
                  {[12, 24, 36, 48, 60].map((months) => (
                    <option key={months} value={months}>{months} {t.months}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.amortizationSchedule}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.month}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.payment}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.principal}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.interest}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.remainingBalance}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.schedule.slice(0, monthsToShow).map((payment, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment.monthlyPayment.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment.principalPayment.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment.interestPayment.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment.remainingBalance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
