<script>
  import {App, Credentials} from 'realm-web';
  //import viteLogo from '/vite.svg';
  let data = [];
  let lbdData = {};
  let db;

  function getQueries(){
    let q = {}
    q['a'] = [{'$limit': 1}]
    q['b'] = [{'$limit': 1}]
    return q
  }

  async function doStats(){
    const film = db.collection("Film");
    const watched = lbdData['watched'];
    return film.aggregate([
      {$limit: 1},
      {$project: {_id: 0, user: watched}},
      {$unwind: "$user"},
      {$lookup: {
        from: "Film",
          localField: "user._id",
          foreignField: "_id",
          as: "info",
          pipeline: [
            { $limit: 1 }
          ],
        }},
      {$project: {_id: "$user._id", r: "$user.rating", info: {$first: "$info"}}},
      {$facet: getQueries()}
    ]);
  }

  async function getData(){
    const res = await fetch('//statsboxd-workers.giudimax.workers.dev/id/1Ioll');
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
      data = await doStats();
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
