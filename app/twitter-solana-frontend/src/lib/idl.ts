export type TwitterSolana = {
	version: "0.1.0";
	name: "twitter_solana";
	instructions: [
		{
			name: "postTweet";
			accounts: [
				{
					name: "tweet";
					isMut: true;
					isSigner: true;
				},
				{
					name: "payer";
					isMut: true;
					isSigner: true;
				},
				{
					name: "author";
					isMut: true;
					isSigner: true;
				},
				{
					name: "systemProgram";
					isMut: false;
					isSigner: false;
				},
			];
			args: [
				{
					name: "content";
					type: "string";
				},
			];
		},
	];
	accounts: [
		{
			name: "tweet";
			type: {
				kind: "struct";
				fields: [
					{
						name: "author";
						type: "publicKey";
					},
					{
						name: "content";
						type: "string";
					},
				];
			};
		},
	];
	errors: [
		{
			code: 6000;
			name: "ContentIsTooLong";
			msg: "Tweet content is too long";
		},
	];
};

export const IDL: TwitterSolana = {
	version: "0.1.0",
	name: "twitter_solana",
	instructions: [
		{
			name: "postTweet",
			accounts: [
				{
					name: "tweet",
					isMut: true,
					isSigner: true,
				},
				{
					name: "payer",
					isMut: true,
					isSigner: true,
				},
				{
					name: "author",
					isMut: true,
					isSigner: true,
				},
				{
					name: "systemProgram",
					isMut: false,
					isSigner: false,
				},
			],
			args: [
				{
					name: "content",
					type: "string",
				},
			],
		},
	],
	accounts: [
		{
			name: "tweet",
			type: {
				kind: "struct",
				fields: [
					{
						name: "author",
						type: "publicKey",
					},
					{
						name: "content",
						type: "string",
					},
				],
			},
		},
	],
	errors: [
		{
			code: 6000,
			name: "ContentIsTooLong",
			msg: "Tweet content is too long",
		},
	],
};
