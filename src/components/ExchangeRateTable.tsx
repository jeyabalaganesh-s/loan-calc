import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { useTheme as useCustomTheme } from '../context/ThemeContext';

export const ExchangeRateTable: React.FC = () => {
  const { rates, loading, error, refreshRates } = useExchangeRates();
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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
          Exchange Rates
        </Typography>

        <TableContainer sx={{ 
          maxHeight: { xs: 400, sm: 500 },
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
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  Currency Code
                </TableCell>
                <TableCell 
                  align="right" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  Rate (USD)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rate) => (
                  <TableRow key={rate.code}>
                    <TableCell 
                      component="th" 
                      scope="row"
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      {rate.code}
                    </TableCell>
                    <TableCell 
                      align="right"
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      {rate.rate.toFixed(4)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '.MuiTablePagination-select': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            },
            '.MuiTablePagination-displayedRows': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }
          }}
        />
      </Paper>
    </Box>
  );
}; 