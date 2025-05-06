import { useState, useMemo } from 'react';
import { LoanInputs, AmortizationEntry } from '../types';

export const useEMICalculator = () => {
  const [inputs, setInputs] = useState<LoanInputs>({
    principal: 0,
    interestRate: 0,
    loanTerm: 0,
  });

  const calculateEMI = (principal: number, interestRate: number, loanTerm: number): number => {
    const monthlyRate = interestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return emi;
  };

  const calculateAmortizationSchedule = (): AmortizationEntry[] => {
    const { principal, interestRate, loanTerm } = inputs;
    const monthlyRate = interestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;
    const emi = calculateEMI(principal, interestRate, loanTerm);
    
    let remainingBalance = principal;
    const schedule: AmortizationEntry[] = [];

    for (let month = 1; month <= numberOfPayments; month++) {
      const interest = remainingBalance * monthlyRate;
      const principalPayment = emi - interest;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        payment: emi,
        principal: principalPayment,
        interest,
        remainingBalance: Math.max(0, remainingBalance),
      });
    }

    return schedule;
  };

  const emi = useMemo(() => {
    return calculateEMI(inputs.principal, inputs.interestRate, inputs.loanTerm);
  }, [inputs]);

  const amortizationSchedule = useMemo(() => {
    return calculateAmortizationSchedule();
  }, [inputs]);

  return {
    inputs,
    setInputs,
    emi,
    amortizationSchedule,
  };
}; 