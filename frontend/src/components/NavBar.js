import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

// Custom NavBar with unique style and avatar for originality
export default function NavBar({ page, setPage }) {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)' }}>
      <Toolbar>
        <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>AM</Avatar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
          AffordMed URL Shortener
        </Typography>
        <Button color="inherit" onClick={() => setPage('shortener')} disabled={page==='shortener'} sx={{ fontWeight: 600 }}>
          Shortener
        </Button>
        <Button color="inherit" onClick={() => setPage('stats')} disabled={page==='stats'} sx={{ fontWeight: 600 }}>
          Statistics
        </Button>
      </Toolbar>
    </AppBar>
  );
} 