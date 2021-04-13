import axios from 'axios';

export default async () => {

    try {
        const debaseHistory = await axios.get('https://api.coingecko.com/api/v3/coins/debase/market_chart', {
            params: {
                'vs_currency': 'usd',
                'days': 365,
                'interval': 'daily'
            }
        });
        return debaseHistory.data;
    } catch {

    }
};