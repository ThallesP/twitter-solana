<script>
  import { login } from "@/web3auth";
  import { onMount } from "svelte";

  onMount(async () => {
    await login();

    await goto("/");
  });
</script>
