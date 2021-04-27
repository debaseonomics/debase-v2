import { request, gql } from 'graphql-request';
import Web3 from 'web3';
import CONTRACT_ADDRESS from "@constants/contract-address.constant";
import ABI_LP from "@constants/abi-lp.constant";

export default async () => {

    // const web3 = new Web3(new Web3.providers.HttpProvider('https://eth-mainnet.alchemyapi.io/v2/WOdQ-9Ssi_FLXxxcfvrvKd85P-VMcLud'));
    // /*fetch treasury data */
    // const abi = ABI_LP;
    // const daiAddress = CONTRACT_ADDRESS.dai;
    //  const daiContract = new web3.eth.Contract(abi, daiAddress);
    // const result = await daiContract.methods.balanceOf('0xbF402010972809A0756dCB536a455Ca9a0d6a9C1').call();

    // console.log(daiAddress);
    //return null;
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
