import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { Dapp } from '../target/types/dapp';

describe('dapp0', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Dapp as Program<Dapp>;

  const dapp0Keypair = Keypair.generate();

  it('Initialize Dapp', async () => {
    await program.methods.initialise()
      .accounts({
        numberAcc: dapp0Keypair.publicKey,
        user: payer.publicKey,
      })
      .signers([dapp0Keypair])
      .rpc();

    const currentCount = await program.account.number.fetch(
      dapp0Keypair.publicKey
    );

    expect(currentCount.val).toEqual(1);
  });

  // it('Increment Dapp0', async () => {
  //   await program.methods
  //     .increment()
  //     .accounts({ dapp0: dapp0Keypair.publicKey })
  //     .rpc();

  //   const currentCount = await program.account.dapp0.fetch(
  //     dapp0Keypair.publicKey
  //   );

  //   expect(currentCount.count).toEqual(1);
  // });

  // it('Increment Dapp0 Again', async () => {
  //   await program.methods
  //     .increment()
  //     .accounts({ dapp0: dapp0Keypair.publicKey })
  //     .rpc();

  //   const currentCount = await program.account.dapp0.fetch(
  //     dapp0Keypair.publicKey
  //   );

  //   expect(currentCount.count).toEqual(2);
  // });

  // it('Decrement Dapp0', async () => {
  //   await program.methods
  //     .decrement()
  //     .accounts({ dapp0: dapp0Keypair.publicKey })
  //     .rpc();

  //   const currentCount = await program.account.dapp0.fetch(
  //     dapp0Keypair.publicKey
  //   );

  //   expect(currentCount.count).toEqual(1);
  // });

  // it('Set dapp0 value', async () => {
  //   await program.methods
  //     .set(42)
  //     .accounts({ dapp0: dapp0Keypair.publicKey })
  //     .rpc();

  //   const currentCount = await program.account.dapp0.fetch(
  //     dapp0Keypair.publicKey
  //   );

  //   expect(currentCount.count).toEqual(42);
  // });

  // it('Set close the dapp0 account', async () => {
  //   await program.methods
  //     .close()
  //     .accounts({
  //       payer: payer.publicKey,
  //       dapp0: dapp0Keypair.publicKey,
  //     })
  //     .rpc();

  //   // The account should no longer exist, returning null.
  //   const userAccount = await program.account.dapp0.fetchNullable(
  //     dapp0Keypair.publicKey
  //   );
  //   expect(userAccount).toBeNull();
  // });

});
