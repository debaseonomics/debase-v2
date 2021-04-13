import { request, gql } from 'graphql-request';

export default async () => {

    const gqlQuery = gql`
        {
            user (id:"0x36f1f4125b4066ca4b768f9f5f9a737bd4fa8f62") {
                id
                totalDepositByPool {
                    totalActiveDeposit
                }
                totalMPHEarned
                totalMPHPaidBack
            }
        }
    `;

    try {
        const treasuryData = await request('https://api.thegraph.com/subgraphs/name/bacon-labs/eighty-eight-mph', gqlQuery);
        return treasuryData.user;
    } catch {
        return 0;
    }
};