use anchor_lang::error_code;

#[error_code]
pub enum ErrorCode {
    #[msg("Tweet content is too long")]
    ContentIsTooLong,
}