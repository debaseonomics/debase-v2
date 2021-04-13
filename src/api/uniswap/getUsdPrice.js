import { request, gql } from 'graphql-request';

export default async () => {
    
    try {
        const usdData = await request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', gql`
            {
                pair(id: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11") {
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
        return usdData.pair.token0Price;
    } catch {
        return 0;
    }
};