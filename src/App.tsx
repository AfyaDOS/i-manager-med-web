import React from 'react';
import { ThemeProvider } from '@fluentui/react';
import { ContextProvider } from './context/ContextProvider';
import { GlobalStyles } from './styles/GlobalStyles';
import { Routes } from './routes/index';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <GlobalStyles />
        <Routes />
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
