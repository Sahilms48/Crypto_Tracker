import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  TextField, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  Paper 
} from '@mui/material';
import { searchCoins } from '../../services/api';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      try {
        const coins = await searchCoins();
        const filtered = coins.filter(coin => 
          coin.name.toLowerCase().includes(value.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10);
        setResults(filtered);
      } catch (error) {
        console.error('Error searching coins:', error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <TextField
        fullWidth
        label="Search Cryptocurrencies"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
      />
      {results.length > 0 && (
        <Paper sx={{ mt: 2 }}>
          <List>
            {results.map((coin) => (
              <ListItem 
                button 
                key={coin.id}
                onClick={() => navigate(`/coin/${coin.id}`)}
              >
                <ListItemText 
                  primary={coin.name}
                  secondary={coin.symbol.toUpperCase()}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default Search;