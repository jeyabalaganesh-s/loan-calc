import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { useTheme as useCustomTheme } from '../context/ThemeContext';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { LoanInputs, COMMON_CURRENCIES, AmortizationEntry } from '../types';

export const EMICalculator: React.FC = () => {
  const { inputs, setInputs, emi, amortizationSchedule } = useEMICalculator();
  const { isDarkMode, currency, setCurrency } = useCustomTheme();
  const { rates, loading: ratesLoading, convertAmount } = useExchangeRates();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tableData, setTableData] = useState<AmortizationEntry[]>([]);

  const handleInputChange = (field: keyof LoanInputs) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = Number(event.target.value);
    setInputs((prev: LoanInputs) => ({ ...prev, [field]: value }));
  };

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

  const handleResetTable = () => {
    setTableData([]);
  };

  const handleCalculate = () => {
    setTableData(amortizationSchedule);
  };

  const formatCurrency = (amount: number) => {
    const selectedCurrency = COMMON_CURRENCIES.find(c => c.code === currency);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    }).format(amount);
  };

  const lastEntry = tableData[tableData.length - 1] || {
    interest: 0,
    payment: 0,
  };

  const selectedCurrency = COMMON_CURRENCIES.find(c => c.code === currency);

  return (
    <Box sx={{ 
      maxWidth: 800, 
      mx: 'auto', 
      p: { xs: 1, sm: 2, md: 3 },
      width: '100%'
    }}>
      <Paper elevation={3} sx={{ 
        p: { xs: 2, sm: 3 }, 
        bgcolor: isDarkMode ? 'background.paper' : 'background.default',
        borderRadius: { xs: 0, sm: 1 }
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          gutterBottom 
          sx={{ textAlign: 'center', mb: 3 }}
        >
          Loan EMI Calculator
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Loan Amount"
              type="text"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={inputs.principal}
              onChange={handleInputChange('principal')}
              InputProps={{
                startAdornment: <InputAdornment position="start">{selectedCurrency?.symbol}</InputAdornment>,
              }}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Interest Rate (%)"
              type="text"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={inputs.interestRate}
              onChange={handleInputChange('interestRate')}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Loan Term (Years)"
              type="text"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={inputs.loanTerm}
              onChange={handleInputChange('loanTerm')}
              InputProps={{
                endAdornment: <InputAdornment position="end">years</InputAdornment>,
              }}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth size={isMobile ? "small" : "medium"}>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                onChange={handleCurrencyChange}
                label="Currency"
              >
                {COMMON_CURRENCIES.map((curr) => (
                  <MenuItem key={curr.code} value={curr.code}>
                    {curr.name} ({curr.symbol})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCalculate}
              size={isMobile ? "small" : "medium"}
              sx={{ height: '100%' }}
            >
              Calculate EMI
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleResetTable}
              size={isMobile ? "small" : "medium"}
              sx={{ height: '100%' }}
              disabled={tableData.length === 0}
            >
              Reset Table
            </Button>
          </Grid>
        </Grid>

        {tableData.length > 0 && (
          <>
            <Box sx={{ 
              mt: 4, 
              p: 2, 
              bgcolor: 'action.hover',
              borderRadius: 1,
              textAlign: 'center'
            }}>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
                Monthly EMI: {formatCurrency(emi)}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary">
                Total Interest: {formatCurrency(lastEntry.interest)}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Total Payment: {formatCurrency(lastEntry.payment)}
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
                Amortization Schedule
              </Typography>
              <Box sx={{ 
                maxHeight: { xs: 250, sm: 300 }, 
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '4px',
                },
              }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container sx={{ 
                      fontWeight: 'bold', 
                      borderBottom: 1, 
                      py: 1,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}>
                      <Grid item xs={2}><Box>Month</Box></Grid>
                      <Grid item xs={2}><Box>Payment</Box></Grid>
                      <Grid item xs={2}><Box>Principal</Box></Grid>
                      <Grid item xs={2}><Box>Interest</Box></Grid>
                      <Grid item xs={4}><Box>Balance</Box></Grid>
                    </Grid>
                  </Grid>
                  {tableData.map((entry) => (
                    <Grid item xs={12} key={entry.month}>
                      <Grid container sx={{ 
                        py: 1, 
                        borderBottom: 1,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}>
                        <Grid item xs={2}><Box>{entry.month}</Box></Grid>
                        <Grid item xs={2}><Box>{formatCurrency(entry.payment)}</Box></Grid>
                        <Grid item xs={2}><Box>{formatCurrency(entry.principal)}</Box></Grid>
                        <Grid item xs={2}><Box>{formatCurrency(entry.interest)}</Box></Grid>
                        <Grid item xs={4}><Box>{formatCurrency(entry.remainingBalance)}</Box></Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};
