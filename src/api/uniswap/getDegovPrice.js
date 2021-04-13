import { request, gql } from 'graphql-request';

export default async () => {

    try {
        const degovData = await request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', gql`
            {
                pair(id: "0xfc835d90ea6557b57b29361d95c4584d389e6ee8") {
                    id
                    reserve0
                    reserve1
                    token0Price
                    token1Price
                    volumeToken0
                    volumeToken1
                }
            }
        `);
        return degovData.pair.token1Price;
    } catch {
        return 0;
    }
};