import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress,
  CardActionArea 
} from '@mui/material';
import { getMarketData } from '../../services/api';
import './CoinList.css';

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getMarketData();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {coins.map((coin) => (
          <Grid item xs={12} sm={6} md={4} key={coin.id}>
            <Card className="coin-card">
              <CardActionArea onClick={() => navigate(`/coin/${coin.id}`)}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </Typography>
                  <Typography color="textSecondary">
                    ${coin.current_price.toLocaleString()}
                  </Typography>
                  <Typography 
                    color={coin.price_change_percentage_24h > 0 ? "primary" : "error"}
                  >
                    24h: {coin.price_change_percentage_24h.toFixed(2)}%
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CoinList;