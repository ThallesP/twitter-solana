import { goto } from "$app/navigation";
import { PUBLIC_WEB3AUTH_CLIENT_ID } from "$env/static/public";
import * as SolanaProvider from "@web3auth/solana-provider";
import * as Web3AuthBase from "@web3auth/base";
import * as OpenLogin from "@web3auth/openlogin-adapter";
import * as Web3AuthPkg from "@web3auth/modal";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { Program, AnchorProvider, type Idl } from "@coral-xyz/anchor";
import { type TwitterSolana, IDL } from "./idl";

let web3auth: Web3AuthPkg.Web3Auth;
let connection: Connection;
let program: Program<TwitterSolana>;
let keyPair: Keypair;

export async function login() {
	const chainConfig = {
		chainNamespace: Web3AuthBase.CHAIN_NAMESPACES.SOLANA,
		chainId: "0x1",
		rpcTarget: "https://api.devnet.solana.com",
		displayName: "Solana Mainnet",
		blockExplorer: "https://explorer.solana.com/",
		ticker: "SOL",
		tickerName: "Solana",
	};

	const privateKeyProvider = new SolanaProvider.SolanaPrivateKeyProvider({
		config: { chainConfig },
	});

	web3auth = new Web3AuthPkg.Web3Auth({
		clientId: PUBLIC_WEB3AUTH_CLIENT_ID,
		privateKeyProvider,
		chainConfig,
	});

	web3auth.configureAdapter(
		new OpenLogin.OpenloginAdapter({ privateKeyProvider }),
	);

	await web3auth.initModal();

	await web3auth.connect();
}

export async function getWeb3Auth() {
	if (web3auth)
		return {
			web3auth,
			connection,
			program,
			keyPair,
		};

	const chainConfig = {
		chainNamespace: Web3AuthBase.CHAIN_NAMESPACES.SOLANA,
		chainId: "0x1",
		rpcTarget: "https://api.devnet.solana.com",
		displayName: "Solana Mainnet",
		blockExplorer: "https://explorer.solana.com/",
		ticker: "SOL",
		tickerName: "Solana",
	};

	const privateKeyProvider = new SolanaProvider.SolanaPrivateKeyProvider({
		config: { chainConfig },
	});

	web3auth = new Web3AuthPkg.Web3Auth({
		clientId: PUBLIC_WEB3AUTH_CLIENT_ID,
		privateKeyProvider,
		chainConfig,
	});

	web3auth.configureAdapter(
		new OpenLogin.OpenloginAdapter({ privateKeyProvider }),
	);

	await web3auth.initModal();

	if (!web3auth.connected) {
		await goto("/login");
	}

	const wallet = new SolanaProvider.SolanaWallet(privateKeyProvider);

	connection = new Connection(chainConfig.rpcTarget);

	const privateKey = await wallet.request<unknown, string>({
		method: "solanaPrivateKey",
		params: [],
	});

	keyPair = Keypair.fromSecretKey(Buffer.from(privateKey, "hex"));

	program = new Program<TwitterSolana>(
		IDL,
		new PublicKey("3jKpG8cWViu9fieUF2pUR29WPVie1Ndm6HbkJfMbUXXw"),
		new AnchorProvider(
			connection,
			{
				publicKey: keyPair.publicKey,
				signAllTransactions: async (...params) => {
					return wallet.signAllTransactions(...params);
				},
				signTransaction: async (...params) => {
					return wallet.signTransaction(...params);
				},
			},
			{},
		),
	);

	return {
		web3auth,
		connection,
		program,
		keyPair,
	};
}
