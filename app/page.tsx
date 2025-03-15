'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { calculateMonthlyPayment, calculateAmortizationSchedule } from './utils/mortgageCalculator';
import type { MortgageInput, MonthlyPaymentBreakdown } from './utils/mortgageCalculator';
import { translations, type Language } from './translations';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  const [mortgageDetails, setMortgageDetails] = useState<MortgageInput>({
    housePrice: 200000,
    downPayment: 40000,
    interestRate: 4,
    amortizationYears: 30,
  });

  const [schedule, setSchedule] = useState<MonthlyPaymentBreakdown[]>([]);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [monthsToShow, setMonthsToShow] = useState<number>(12);

  const calculateTotals = (schedule: MonthlyPaymentBreakdown[]) => {
    const totalInt = schedule.reduce((sum, month) => sum + month.interest, 0);
    const totalPay = schedule.reduce((sum, month) => sum + month.payment, 0);
    setTotalInterest(totalInt);
    setTotalPayment(totalPay);
  };

  useEffect(() => {
    handleCalculate();
  }, []);

  const handleCalculate = () => {
    const payment = calculateMonthlyPayment(mortgageDetails);
    const amortizationSchedule = calculateAmortizationSchedule(mortgageDetails);
    setMonthlyPayment(payment);
    setSchedule(amortizationSchedule);
    calculateTotals(amortizationSchedule);
  };

  const handleInputChange = (field: keyof MortgageInput, value: string) => {
    setMortgageDetails(prev => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  const pieData = [
    { name: t.principal, value: mortgageDetails.housePrice - mortgageDetails.downPayment },
    { name: t.interest, value: totalInterest }
  ];

  const formatShowMonthsText = (months: number) => {
    return t.showMonths
      .replace('{months}', months.toString())
      .replace('{years}', (months / 12).toFixed(1));
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{t.title}</h1>
                <p className="text-blue-100 mt-2">{t.subtitle}</p>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="px-3 py-2 bg-white/10 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50"
              >
                <option value="en">English</option>
                <option value="ru">Русский</option>
                <option value="ko">한국어</option>
                <option value="uz">O'zbek</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="housePrice" className="block text-sm font-medium text-gray-700">
                    {t.housePrice}
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="housePrice"
                      value={mortgageDetails.housePrice}
                      onChange={(e) => handleInputChange('housePrice', e.target.value)}
                      className="block w-full pl-7 pr-3 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700">
                    {t.downPayment}
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="downPayment"
                      value={mortgageDetails.downPayment}
                      onChange={(e) => handleInputChange('downPayment', e.target.value)}
                      className="block w-full pl-7 pr-3 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      min="0"
                      max={mortgageDetails.housePrice}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
                    {t.loanAmount}: ${(mortgageDetails.housePrice - mortgageDetails.downPayment).toLocaleString('en-US')}
                  </p>
                </div>

                <div>
                  <label htmlFor="loanTerms" className="block text-sm font-medium text-gray-700">
                    {t.loanTerms}
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      value={mortgageDetails.amortizationYears}
                      onChange={(e) => handleInputChange('amortizationYears', e.target.value)}
                      className="block w-full px-3 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      min="1"
                      max="30"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
                    {t.interestRate}
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      value={mortgageDetails.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      className="block w-full pr-12 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      step="0.1"
                      min="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                >
                  {t.calculateButton}
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <h2 className="text-sm font-medium text-blue-800 uppercase tracking-wide">{t.monthlyPayment}</h2>
                    <p className="text-3xl font-bold text-blue-900 mt-2">
                      ${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                      <h3 className="text-sm font-medium text-orange-800 uppercase tracking-wide">{t.totalInterest}</h3>
                      <p className="text-2xl font-bold text-orange-900 mt-2">
                        ${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
                      <h3 className="text-sm font-medium text-emerald-800 uppercase tracking-wide">{t.totalPayment}</h3>
                      <p className="text-2xl font-bold text-emerald-900 mt-2">
                        ${totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : '#F97316'} />
                        ))}
                      </Pie>
                      <Legend
                        verticalAlign="middle"
                        align="right"
                        layout="vertical"
                        iconType="circle"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">{t.amortizationSchedule}</h3>
                  <select
                    value={monthsToShow}
                    onChange={(e) => setMonthsToShow(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                  >
                    {[12, 24, 36, 48, 60, 120, 180, 240, 300, 360].map((months) => (
                      <option key={months} value={months}>
                        {formatShowMonthsText(months)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">{t.date}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">{t.month}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-orange-600 uppercase tracking-wider whitespace-nowrap">{t.interest}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-600 uppercase tracking-wider whitespace-nowrap">{t.principal}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider whitespace-nowrap">{t.payment}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">{t.balance}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {schedule.slice(0, monthsToShow).map((month, index) => {
                        const date = new Date();
                        date.setMonth(date.getMonth() + month.month - 1);
                        return (
                          <tr key={month.month} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-150`}>
                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                              {date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'ru' ? 'ru-RU' : language === 'ko' ? 'ko-KR' : 'uz-UZ', { month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {month.month}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-orange-600 whitespace-nowrap bg-orange-50">
                              ${month.interest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-emerald-600 whitespace-nowrap bg-emerald-50">
                              ${month.principal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-blue-600 whitespace-nowrap bg-blue-50">
                              ${month.payment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                              ${month.remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 