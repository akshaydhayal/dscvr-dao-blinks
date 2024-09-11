// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import Dapp0IDL from '../target/idl/dapp0.json';
import type { Dapp0 } from '../target/types/dapp0';

// Re-export the generated IDL and type
export { Dapp0, Dapp0IDL };

// The programId is imported from the program IDL.
export const DAPP0_PROGRAM_ID = new PublicKey(Dapp0IDL.address);

// This is a helper function to get the Dapp0 Anchor program.
export function getDapp0Program(provider: AnchorProvider) {
  return new Program(Dapp0IDL as Dapp0, provider);
}

// This is a helper function to get the program ID for the Dapp0 program depending on the cluster.
export function getDapp0ProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return DAPP0_PROGRAM_ID;
  }
}
