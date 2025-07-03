import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import NavBar from './components/NavBar';
import UrlShortener from './components/UrlShortener';
import UrlStats from './components/UrlStats';

const theme = createTheme({
  palette: { mode: 'light' },
});

function App() {
  const [page, setPage] = useState('shortener');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar page={page} setPage={setPage} />
      {page === 'shortener' ? <UrlShortener /> : <UrlStats />}
    </ThemeProvider>
  );
}

export default App;
