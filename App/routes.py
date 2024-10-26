from flask import Blueprint, jsonify
from .utils import CoinGeckoAPI

main = Blueprint('main', __name__)
coin_gecko = CoinGeckoAPI()

@main.route('/')
def index():
    return "Crypto Tracker API is running!"

@main.route('/api/coins')
def get_coins():
    return jsonify(coin_gecko.get_coin_list())

@main.route('/api/coin/<coin_id>')
def get_coin(coin_id):
    return jsonify(coin_gecko.get_coin_data(coin_id))

@main.route('/api/market')
def get_market():
    return jsonify(coin_gecko.get_market_data())