import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TwitterSolana } from "../target/types/twitter_solana";

describe("twitter-solana", () => {
	// Configure the client to use the local cluster.
	anchor.setProvider(anchor.AnchorProvider.env());

	const program = anchor.workspace.TwitterSolana as Program<TwitterSolana>;

	it("Is initialized!", async () => {
		// Add your test here.
		const tx = await program.methods.initialize().rpc();
		console.log("Your transaction signature", tx);
	});
});
