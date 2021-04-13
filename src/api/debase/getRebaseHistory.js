import { request, gql } from 'graphql-request';

export default async () => {
    const rebaseHistory = await request('https://api.thegraph.com/subgraphs/name/debaseonomics/subgraph', gql`
        {
            rebases(orderBy: epoch, orderDirection: desc) {
				epoch
				exchangeRate
				supplyAdjustment
				rebaseLag
				timestamp
			}
        }
    `);
    return rebaseHistory;
};