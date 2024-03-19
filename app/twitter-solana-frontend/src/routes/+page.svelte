<script lang="ts">
  import { getWeb3Auth } from "@/web3auth";
  import { Keypair } from "@solana/web3.js";
  import { createQuery, useQueryClient } from "@tanstack/svelte-query";

  $: tweetContent = "";

  export let data;

  const client = useQueryClient();

  const query = createQuery({
    queryKey: ["tweets"],
    initialData: data.accounts,
    queryFn: async () => {
      const { program } = await getWeb3Auth();
      return await program.account.tweet.all();
    },
  });

  async function send(event: KeyboardEvent) {
    if (event.key !== "Enter") return;

    const { keyPair, program, connection } = await getWeb3Auth();

    const tweetPair = Keypair.generate();

    const txSignature = await program.methods
      .postTweet(tweetContent)
      .accounts({
        tweet: tweetPair.publicKey,
        author: keyPair.publicKey,
        payer: keyPair.publicKey,
      })
      .signers([keyPair, tweetPair])
      .rpc({ commitment: "processed" });

    await client.invalidateQueries({
      queryKey: ["tweets"],
    });
  }
</script>

<div class="w-screen h-screen bg-black p-48">
  <div class="flex flex-col border-4">
    <input
      bind:value={tweetContent}
      on:keypress={send}
      placeholder="What's happening?"
    />

    {#each $query.data ?? [] as { account }}
      <div class="flex p-2 gap-2">
        <img
          src="https://source.boringavatars.com/pixel/56/Stefan?colors=26a653,2a1d8f,79646a"
          alt="Random generated avatar"
        />
        <div class="flex flex-col">
          <span class="text-white">{account.author}</span>
          <span class="text-white">{account.content}</span>
        </div>
      </div>
    {/each}
  </div>
</div>
