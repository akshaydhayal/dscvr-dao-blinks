#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("G6oJmwpPf4mdsLrsiMQiUppEPXWjjpP46R7igqVoiiDb");

#[program]
pub mod journal{
  use super::*;

  // pub fn intialiseJournal(ctx:Context<InitialiseJournal>,title:String,message:String)->Result<()>{
  pub fn intialiseProposal(ctx:Context<InitialiseProposal>,title:String,message:String)->Result<()>{
    let proposal_acc=&mut ctx.accounts.proposalAcc;
    proposal_acc.owner=ctx.accounts.user.key();
    proposal_acc.title=title;
    proposal_acc.message=message;
    
    Ok(())
  }

  pub fn updateProposal(ctx:Context<UpdateProposal>,title:String,message:String)->Result<()>{
    let proposal_acc=&mut ctx.accounts.proposalAcc;
    proposal_acc.message=message;
    Ok(())

  }
}

#[derive(Accounts)]
#[instruction(title:String)]
pub struct InitialiseProposal<'info>{
  #[account(init,seeds=[title.as_bytes(),user.key().as_ref()],bump, payer=user,space=8+ProposalRecord::INIT_SPACE)]
  pub proposalAcc:Account<'info,ProposalRecord>,
  #[account(mut)]
  pub user:Signer<'info>,
  pub system_program:Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(title:String)]
pub struct UpdateProposal<'info>{
  #[account(mut,seeds=[title.as_bytes(),user.key().as_ref()],bump,
    realloc=8+ProposalRecord::INIT_SPACE, realloc::payer=user, realloc::zero=true)]
  pub proposalAcc:Account<'info,ProposalRecord>,
  #[account(mut)]
  pub user:Signer<'info>,
  pub system_program:Program<'info, System>,
}


#[account]
#[derive(InitSpace)]
pub struct ProposalRecord{
  pub owner:Pubkey,
  #[max_len(20)]
  pub title:String,
  #[max_len(200)]
  pub message:String,
  pub id:u64,
}












// #[program]
// pub mod dapp {
//   use super::*;

//   pub fn initialise(ctx:Context<InitialiseAccount>)->Result<()>{
//     ctx.accounts.numberAcc.val=1;
//     Ok(())
//   } 
// }

// #[derive(Accounts)]
// pub struct InitialiseAccount<'info>{
//   #[account(init,payer=user,space=8+Number::INIT_SPACE)]
//   pub numberAcc:Account<'info,Number>,
//   #[account(mut)]
//   pub user:Signer<'info>,
//   pub system_program:Program<'info,System>,
// }

// #[account]
// #[derive(InitSpace)]
// pub struct Number{
//   pub val:u64,
// }
