'use client';

import { getDapp0Program, getDapp0ProgramId } from '@dapp0/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useDapp0Program() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getDapp0ProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getDapp0Program(provider);

  const accounts = useQuery({
    queryKey: ['dapp0', 'all', { cluster }],
    queryFn: () => program.account.dapp0.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['dapp0', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ dapp0: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useDapp0ProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useDapp0Program();

  const accountQuery = useQuery({
    queryKey: ['dapp0', 'fetch', { cluster, account }],
    queryFn: () => program.account.dapp0.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['dapp0', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ dapp0: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['dapp0', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods.decrement().accounts({ dapp0: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['dapp0', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods.increment().accounts({ dapp0: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['dapp0', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ dapp0: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
