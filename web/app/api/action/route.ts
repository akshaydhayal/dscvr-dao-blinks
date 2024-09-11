import {
  ActionGetResponse,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from '@solana/actions';
import {
  clusterApiUrl,
  Connection,
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
import { useWallet } from '@solana/wallet-adapter-react';

export async function GET(request: Request) {
  const response: ActionGetResponse = {
    title: 'Add a Journal Record on-record',
    icon: 'https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png',
    // icon: new URL(request.url).origin + '/nft2.png',
    description: `Create a jounal record on record on solana and earn nft on 5 journals`,
    label: 'BLINK',

    links: {
      actions: [
        {
          label: 'Enter Journal Details',
          href: request.url + '?title=title&message=message',
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
  const connection = new Connection(clusterApiUrl('devnet'));
  // const {wallet} =useWallet();
  const reqBody = await request.json();
  console.log(reqBody);
  // console.log(reqBody.data.selected_option);
  // const selected_options=reqBody.data.selected_option;
  // let correctAns=0;
  // if(selected_options[0]=='b') correctAns++;
  // if(selected_options[1]=='a') correctAns++;
  // if(selected_options[2]=='c') correctAns++;

  // let msg;
  // if(correctAns>=1){
  //   msg ='Wooh! You scored ' +correctAns +'/3 Questions correctly. You have recieved the NFT in your wallet';
  // }else{
  //   msg="Oops! You scored 0/3 Questions correctly. You need atleast 1 question right to get the NFT. You can re-attempt the quiz.";
  // }

  const emptyTx=new Transaction();
  emptyTx.feePayer=new PublicKey(reqBody.account);
  emptyTx.recentBlockhash=(await connection.getLatestBlockhash()).blockhash;
  const serialisedEmptyTx=emptyTx.serialize({requireAllSignatures:false,verifySignatures:false}).toString("base64");
  
  let serialisedTx;
  if(correctAns>=1){
    serialisedTx=await createAsset(reqBody.account,correctAns);
  }
  const response: ActionPostResponse = {
    // transaction: Buffer.from(serialisedTx??"").toString("base64"),
    transaction:(correctAns >= 1)? Buffer.from(serialisedTx ?? '').toString('base64') : serialisedEmptyTx,
    message: msg,
    // message: 'Congrats, you recieved the Completion NFT',
  };
  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}
