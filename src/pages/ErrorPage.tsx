import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 500,
          bgcolor: isDarkMode ? 'background.paper' : 'background.default',
        }}
      >
        <Typography variant="h4" gutterBottom color="error">
          Oops! Something went wrong
        </Typography>
        <Typography variant="body1" paragraph>
          We apologize for the inconvenience. An error has occurred while processing your request.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Return to Home
        </Button>
      </Paper>
    </Box>
  );
}; 