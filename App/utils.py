import requests

class CoinGeckoAPI:
    def __init__(self):
        self.base_url = "https://api.coingecko.com/api/v3"

    def get_coin_list(self):
        """Get list of all supported coins"""
        endpoint = f"{self.base_url}/coins/list"
        try:
            response = requests.get(endpoint)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

    def get_coin_data(self, coin_id):
        """Get current data for a coin"""
        endpoint = f"{self.base_url}/coins/{coin_id}"
        try:
            response = requests.get(endpoint, params={
                'localization': 'false',
                'tickers': 'false',
                'market_data': 'true',
                'community_data': 'false',
                'developer_data': 'false'
            })
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

    def get_market_data(self):
        """Get market data for top 100 coins"""
        endpoint = f"{self.base_url}/coins/markets"
        try:
            response = requests.get(endpoint, params={
                'vs_currency': 'usd',
                'order': 'market_cap_desc',
                'per_page': 100,
                'page': 1,
                'sparkline': 'false'
            })
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}