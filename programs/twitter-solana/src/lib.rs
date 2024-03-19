use anchor_lang::prelude::*;
use errors::ErrorCode;

pub mod errors;

declare_id!("3jKpG8cWViu9fieUF2pUR29WPVie1Ndm6HbkJfMbUXXw");

#[program]
pub mod twitter_solana {
    use super::*;

    pub fn post_tweet(ctx: Context<PostTweet>, content: String) -> Result<()> {
        let tweet = &mut ctx.accounts.tweet;
        tweet.author = ctx.accounts.author.key();

        require!(content.chars().count() < 140, ErrorCode::ContentIsTooLong);

        tweet.content = content;
        Ok(())
    }
}

#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub content: String,
}

#[derive(Accounts)]
pub struct PostTweet<'info> {
    #[account(init, payer = payer, space = 8 + 32 + 4 + 140)] // default space + 32 for author + 4 for content + 140 for content length
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}
