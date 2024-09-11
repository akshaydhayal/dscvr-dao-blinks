#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("G6oJmwpPf4mdsLrsiMQiUppEPXWjjpP46R7igqVoiiDb");

#[program]
pub mod journal{
  use super::*;

  pub fn intialiseJournal(ctx:Context<InitialiseJournal>,title:String,message:String)->Result<()>{
    let journal_acc=&mut ctx.accounts.journalAcc;
    journal_acc.owner=ctx.accounts.user.key();
    journal_acc.title=title;
    journal_acc.message=message;
    
    Ok(())
  }

  pub fn updateJournal(ctx:Context<UpdateJournal>,title:String,message:String)->Result<()>{
    let journal_acc=&mut ctx.accounts.journalAcc;
    journal_acc.message=message;
    Ok(())

  }
}

#[derive(Accounts)]
#[instruction(title:String)]
pub struct InitialiseJournal<'info>{
  #[account(init,seeds=[title.as_bytes(),user.key().as_ref()],bump, payer=user,space=8+JournalRecord::INIT_SPACE)]
  pub journalAcc:Account<'info,JournalRecord>,
  #[account(mut)]
  pub user:Signer<'info>,
  pub system_program:Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(title:String)]
pub struct UpdateJournal<'info>{
  #[account(mut,seeds=[title.as_bytes(),user.key().as_ref()],bump,
    realloc=8+JournalRecord::INIT_SPACE, realloc::payer=user, realloc::zero=true)]
  pub journalAcc:Account<'info,JournalRecord>,
  #[account(mut)]
  pub user:Signer<'info>,
  pub system_program:Program<'info, System>,
}


#[account]
#[derive(InitSpace)]
pub struct JournalRecord{
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
