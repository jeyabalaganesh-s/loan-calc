import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme,
  Box,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const Navigation: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const location = useLocation();

  const menuItems = [
    { text: 'EMI Calculator', path: '/' },
    { text: 'Exchange Rates', path: '/exchange-rates' },
    { text: 'Error Page', path: '/error' }
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2
      }}>
        <Typography variant="h6">Menu</Typography>
        <IconButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => setDrawerOpen(false)}
            sx={{ 
              p: 0,
              bgcolor: location.pathname === item.path ? 'action.selected' : 'transparent'
            }}
          >
            <RouterLink
              to={item.path}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
                padding: '12px 16px',
              }}
            >
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                }}
              />
            </RouterLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ 
        px: { xs: 1, sm: 2 },
        minHeight: { xs: 56, sm: 64 }
      }}>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography 
          variant={isMobile ? "subtitle1" : "h6"} 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold'
          }}
        >
          Loan Calculator
        </Typography>

        {!isMobile && (
          <Box sx={{ 
            display: 'flex', 
            gap: 3,
            alignItems: 'center'
          }}>
            {menuItems.map((item) => (
              <RouterLink
                key={item.text}
                to={item.path}
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: location.pathname === item.path ? '100%' : '0%',
                      height: '2px',
                      bottom: -4,
                      left: 0,
                      backgroundColor: 'currentColor',
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {item.text}
                </Typography>
              </RouterLink>
            ))}
          </Box>
        )}

        <IconButton 
          color="inherit" 
          onClick={toggleTheme}
          sx={{ ml: 1 }}
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: isDarkMode ? 'background.paper' : 'background.default',
          }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}; 