import React from 'react';
import { ThemeProvider } from '@fluentui/react';
import { ContextProvider } from './context/ContextProvider';
import { GlobalStyles } from './styles/GlobalStyles';
import { Routes } from './routes/index';
import { theme } from './styles/theme';
import { Drawer } from './drawer';
import { refPanel } from './utils';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <GlobalStyles />
        <Drawer ref={refPanel} />
        <Routes />
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
