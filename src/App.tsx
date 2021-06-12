import 'react-toastify/dist/ReactToastify.min.css';
import React from 'react';
import { ThemeProvider } from '@fluentui/react';
import { ToastContainer } from 'react-toastify';
import { ContextProvider } from './context/ContextProvider';
import { GlobalStyles } from './styles/GlobalStyles';
import { Routes } from './routes/index';
import { theme } from './styles/theme';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <ContextProvider>
      <GlobalStyles />
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ContextProvider>
  </ThemeProvider>
);

export default App;
