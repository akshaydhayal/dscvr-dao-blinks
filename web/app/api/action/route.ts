import {
  ActionGetResponse,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from '@solana/actions';
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
} from '@solana/web3.js';
// import { closeEmptyAccounts } from './helper';
import {
  createCloseAccountInstruction,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
// import { createAsset } from './createAsset';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
// import journalIDL from "../../../../anchor/target/idl/journal.json"
import daoIDL from "../../../../anchor/target/idl/dao.json"
import type {Dao} from "../../../../anchor/target/types/dao"
import { walletSecret } from './wallet';

export async function GET(request: Request) {
  const response: ActionGetResponse = {
    title: 'Create DAO Proposals On-Chain with Solana',
    // icon: 'https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png',
    icon: new URL(request.url).origin + '/pfp.png',
    description: `Seamlessly create proposals and participate in voting with our on-chain governance platform powered by Solana. Every proposal and vote is securely recorded on the blockchain, ensuring transparency and immutability. Propose ideas, cast your votes, and earn exclusive NFTs for your participation in the DAO. View and engage with proposals here:
     https://dscvr-journal-blink.vercel.app`,
    label: 'BLINK',

    links: {
      actions: [
        {
          label: 'Create Proposal',
          href: request.url + '?title={title}&message={message}',
          parameters: [
            {
              name: 'title',
              label: 'Title (25 chars limit)',
              required:true
            },
            {
              name: 'message',
              label: 'Message ( 195 characters limit )',
              required:true
            },
          ],
        },

      ],
    },
  };
  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}


export const OPTIONS = GET;


export async function POST(request: Request) {
  const connection = new Connection(clusterApiUrl('devnet'),"confirmed");
  // const {wallet} =useWallet();
  const reqBody = await request.json();
  console.log('reqBody: ',reqBody);
  const title=new URL(request.url).searchParams.get("title")??""
  const message=new URL(request.url).searchParams.get("message")??""

  // const wallet=useAnchorWallet();
  const wallet=Keypair.fromSecretKey(Uint8Array.from(walletSecret));
  //@ts-ignore
  const provider=new AnchorProvider(connection,wallet,{});
  const programId=new PublicKey("4px1Sz7eXme8y7gPUJjwCYsb3BeL6yMRzyLFkyBqjicj")
  const program=new Program(daoIDL as Dao,provider);
  // const tx=await program.methods.intialiseJournal(title,message).accounts({
  const tx=await program.methods.intialiseProposal(title,message).accounts({
    user:reqBody.account
  }).transaction();

  tx.recentBlockhash=(await connection.getLatestBlockhash()).blockhash;
  tx.lastValidBlockHeight=(await connection.getLatestBlockhash()).lastValidBlockHeight;
  tx.feePayer=new PublicKey(reqBody.account);
  console.log('tx : ',tx);
  let serialisedTx=tx.serialize({requireAllSignatures:false,verifySignatures:false});

  // const emptyTx=new Transaction();
  // emptyTx.feePayer=new PublicKey(reqBody.account);
  // emptyTx.recentBlockhash=(await connection.getLatestBlockhash()).blockhash;
  // const serialisedEmptyTx=emptyTx.serialize({requireAllSignatures:false,verifySignatures:false}).toString("base64");
  
  // let serialisedTx;
  // if(correctAns>=1){
  //   serialisedTx=await createAsset(reqBody.account,correctAns);
  // }
  const response: ActionPostResponse = {
    // transaction: Buffer.from(serialisedTx??"").toString("base64"),
    // transaction:(correctAns >= 1)? Buffer.from(serialisedTx ?? '').toString('base64') : serialisedEmptyTx,
    transaction:Buffer.from(serialisedTx).toString("base64"),
    message: "Wooh, your Proposal has been recorded On-Chain. View all your",
    // message: 'Congrats, you recieved the Completion NFT',
  };
  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}
