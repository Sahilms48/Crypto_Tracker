import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CircularProgress 
} from '@mui/material';
import { getCoinData } from '../../services/api';
import './CoinDetail.css';

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const data = await getCoinData(id);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!coin) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          Error loading coin data
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <img 
                src={coin.image.large} 
                alt={coin.name} 
                className="coin-image"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h1">
                {coin.name} ({coin.symbol.toUpperCase()})
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Current Price: ${coin.market_data.current_price.usd.toLocaleString()}
              </Typography>
              <Typography 
                variant="body1"
                color={coin.market_data.price_change_percentage_24h > 0 ? "primary" : "error"}
              >
                24h Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </Typography>
              <Typography variant="body1">
                Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CoinDetail;