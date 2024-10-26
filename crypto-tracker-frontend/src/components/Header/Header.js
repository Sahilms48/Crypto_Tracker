import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import './Header.css';

const Header = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Crypto Tracker
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Market
          </Button>
          <Button color="inherit" component={Link} to="/search">
            Search
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;