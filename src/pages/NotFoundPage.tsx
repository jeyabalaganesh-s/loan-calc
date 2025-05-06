import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const NotFoundPage: React.FC = () => {
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
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
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