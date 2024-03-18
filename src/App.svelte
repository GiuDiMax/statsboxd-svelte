<script>
  let data = {}

  async function getStatsWorker(uid){
    const res = await fetch('//statsboxd-workers.giudimax.workers.dev/id/'+uid, {headers: {"Accept-Encoding": "br"}});
    return await res.json()
  }

  async function getStats() {
    try {
      //await Promise.all([getData(), getDB()]);
      data = await getStatsWorker('1Ioll');
    } catch (error) {
      console.error("Errore:", error);
    }
  }

  getStats();
</script>


<main>
  {#if data }
    <div>{JSON.stringify(data, null, 2)}</div>
    {:else}
    <p>Caricamento...</p>
  {/if}
</main>

<style>

</style>
