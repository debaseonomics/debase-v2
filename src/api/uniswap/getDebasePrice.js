import { request, gql } from 'graphql-request';

export default async () => {

    const gqlQuery = gql`
        {
            pair(id: "0xe98f89a2b3aecdbe2118202826478eb02434459a") {
                id
                reserve0
                reserve1
                token0Price
                token1Price
                volumeToken0
                volumeToken1
            }
        }
    `;

    try {
        const debaseData = await request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', gqlQuery);
        return debaseData.pair.token0Price;
    } catch {
        return 0;
    }
};