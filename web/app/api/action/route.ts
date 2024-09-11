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
import journalIDL from "../../../../anchor/target/idl/journal.json"
import type {Journal} from "../../../../anchor/target/types/journal"
import { walletSecret } from './wallet';

export async function GET(request: Request) {
  const response: ActionGetResponse = {
    title: 'Log Your Daily Journals On-Chain with Solana',
    icon: 'https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png',
    // icon: new URL(request.url).origin + '/nft2.png',
    description: `Easily record your daily thoughts with our on-chain journaling platform on Solana. Each entry is securely stored and maintained on the blockchain, ensuring your records are durable and transparent.`,
    label: 'BLINK',

    links: {
      actions: [
        {
          label: 'Enter Journal Details',
          href: request.url + '?title={title}&message={message}',
          parameters: [
            {
              name: 'title',
              label: 'Title',
            },
            {
              name: 'message',
              label: 'Message',
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
  const title=new URL(request.url).searchParams.get("title")
  const message=new URL(request.url).searchParams.get("message")

  // const wallet=useAnchorWallet();
  const wallet=Keypair.fromSecretKey(Uint8Array.from(walletSecret));
  const provider=new AnchorProvider(connection,wallet,{});
  const programId=new PublicKey("G6oJmwpPf4mdsLrsiMQiUppEPXWjjpP46R7igqVoiiDb")
  const program=new Program(journalIDL as Journal,provider);
  const tx=await program.methods.intialiseJournal(title,message).accounts({
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
    message: "hi",
    // message: 'Congrats, you recieved the Completion NFT',
  };
  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}
