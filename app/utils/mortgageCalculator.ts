export type MortgageInput = {
  housePrice: number;
  downPayment: number;
  interestRate: number;
  amortizationYears: number;
};

export type MonthlyPaymentBreakdown = {
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  month: number;
};

export const calculateMonthlyPayment = (input: MortgageInput): number => {
  const principal = input.housePrice - input.downPayment;
  const monthlyRate = input.interestRate / 100 / 12;
  const numberOfPayments = input.amortizationYears * 12;

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return Math.round(monthlyPayment * 100) / 100;
};

export const calculateAmortizationSchedule = (
  input: MortgageInput
): MonthlyPaymentBreakdown[] => {
  const monthlyPayment = calculateMonthlyPayment(input);
  const monthlyRate = input.interestRate / 100 / 12;
  const numberOfPayments = input.amortizationYears * 12;
  const initialBalance = input.housePrice - input.downPayment;
  let remainingBalance = initialBalance;
  const schedule: MonthlyPaymentBreakdown[] = [];

  for (let month = 1; month <= numberOfPayments; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance = remainingBalance - principalPayment;

    schedule.push({
      month,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      remainingBalance: Math.max(0, Math.round(remainingBalance * 100) / 100),
    });
  }

  return schedule;
}; 