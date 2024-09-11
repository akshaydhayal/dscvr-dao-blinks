"use client";
// import DashboardFeature from '@/components/dashboard/dashboard-feature';
import { AnchorProvider, Idl, Program, getProvider } from '@coral-xyz/anchor';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
// import Dapp0IDL from '../target/idl/dapp0.json';
// import type { Dapp0 } from '../target/types/dapp0';
import journalIDL from '../../anchor/target/idl/journal.json';
import type { Journal } from '../../anchor/target/types/journal';
import { useEffect, useState } from 'react';

export default function Page() {
  const connection=new Connection(clusterApiUrl("devnet"),"confirmed");
  const wallet=useAnchorWallet();
  const {publicKey}=useWallet();

  const [allJournals,setAllJournals]=useState([]);

  const [programm,setProgramm]=useState<Program<Journal>>();
  const programId=new PublicKey("G6oJmwpPf4mdsLrsiMQiUppEPXWjjpP46R7igqVoiiDb")
  useEffect(()=>{
    let provider;
    if(wallet){
      try{
        provider=getProvider();
      }catch(e){
        provider=new AnchorProvider(connection,wallet,{});
      }
      // const programId=new PublicKey(journalIDL.address)
      const program=new Program(journalIDL as Journal,provider);
      setProgramm(program);
      console.log('program',program);
      console.log('programId : ',programId);
    }
  },[wallet,publicKey])

if(!publicKey) return;

  
  
  

  async function getJournalsByUser(userPublicKey:PublicKey) {
  try {
    const accounts = await connection.getProgramAccounts(programId, {
      filters: [
        {
          memcmp: {
            offset: 8, // The offset where the `owner` field starts in your JournalRecord account
            bytes: userPublicKey.toBase58(),
          },
        },
      ],
    });

    console.log("xxx : ",accounts);

    const journalAccounts = await Promise.all(
      accounts.map(async (account) => {
        // Use Anchor's fetch method to decode the journal data
        const journal = await programm?.account.journalRecord.fetch(account.pubkey);
        return {
          publicKey: account.pubkey.toBase58(),
          title: journal?.title,
          message: journal?.message,
        };
      })
    );
    
    console.log("yy : ",journalAccounts);
    //@ts-ignore
    setAllJournals(journalAccounts);
    return journalAccounts;
  } catch (error) {
    console.error("Error fetching journals:", error);
  }
}

// Fetch the journals for the user
useEffect(()=>{
  getJournalsByUser(publicKey)
},[programm,publicKey])



if(!publicKey){
  return<div className="max-w-md mx-auto p-8 bg-gray-900 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
    <h2 className="text-2xl font-bold text-teal-400 mb-4">Connect Your Wallet</h2>
    <p className="text-gray-400 mb-6">
      Welcome to the Journal App. Securely connect your wallet to access and manage your personal journal records. Make sure your wallet is ready to connect to see all your entries.
    </p>
    <button
      // onClick={onConnectWallet}
      className="bg-teal-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-teal-600 transition-colors duration-300"
    >
      Connect Wallet
    </button>
  </div>
}

  return <div>
    <div className="space-y-6">
      {allJournals.map((journal:any, index) => (
        <JournalRecord
          key={index}
          owner={journal.publicKey}
          title={journal.title}
          message={journal.message}
        />
      ))}
    </div>

  </div>
}



interface JournalRecordProps {
  owner: string;
  title: string;
  message: string;
}

const JournalRecord: React.FC<JournalRecordProps> = ({ owner, title, message }) => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-teal-400">{title}</h2>
      </div>
      <div className="mb-6">
        <p className="text-gray-300">{message}</p>
      </div>
      <div className="border-t border-gray-600 pt-4">
        <p className="text-sm text-gray-400">Owner: {owner}</p>
      </div>
    </div>
  );
};

