import { getWeb3Auth } from "@/web3auth";

export const ssr = false;

export async function load() {
	const { program } = await getWeb3Auth();

	const accounts = await program.account.tweet.all([]);

	return {
		accounts,
	};
}
