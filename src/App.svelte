<script>
  import {App, Credentials} from 'realm-web';
  //import viteLogo from '/vite.svg';

  let data = [];
  let lbdData = {};
  let db;

  async function getData(){
    const res = await fetch('//statsboxd-workers.giudimax.workers.dev/id/7ua3D');
    lbdData = await res.json()
  }

  async function getDB(){
    const app = new App({ id: "cloudflare-workers-wtddz" });
    const mouser = await app.logIn(Credentials.apiKey("1svtpMUA8In8cykVNcCH8NtKqSRIKWk77ECSNhawSXirmenNE5rp5Tpil1qA8Afa"));
    const mongoClient = mouser.mongoClient("mongodb-atlas");
    db = mongoClient.db("Statsboxd");
  }

  async function getStats() {
    try {
      await Promise.all([getData(), getDB()]);
      const filmsCollection = db.collection("Film");
      data = await filmsCollection.aggregate([{"$limit": 1}])
      console.log(lbdData);
      console.log(data);
    } catch (error) {
      console.error("Errore:", error);
    }
  }

  getStats();
</script>


<main>
  {#if data.length > 0 }
    <div>{JSON.stringify(data, null, 2)}</div>
    {:else}
    <p>Caricamento...</p>
  {/if}
</main>

<style>

</style>
