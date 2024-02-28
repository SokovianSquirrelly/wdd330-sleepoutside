<script>
  import { onMount } from "svelte";
  let alerts = [];

  onMount(async () => {
    const response = await fetch("/json/alerts.json");
    alerts = await response.json();
  });
</script>

<section class="alert-list">
  {#each alerts as alert (alert.message)}
    <p style="background-color: {alert.background}; color: {alert.color};">
      {alert.message}
    </p>
  {/each}
</section>
