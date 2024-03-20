<script>
  let data = {}
  let message = ""
  const baseUrl = "//statsboxd-workers.giudimax.workers.dev/"
  //const baseUrl = " http://127.0.0.1:8787/"

  async function getLbdWatched(username, id="", limit=0, offset=0, session=""){
    let watched = []
    let keepGoing = true;
    let json
    let resp
    while (keepGoing) {
      resp = await fetch(baseUrl + 'data?username='+username+"&id="+id+'&limit='+limit+'&offset='+offset +'&session='+session, {headers: {"Accept-Encoding": "br"}});
      json = await resp.json()
      limit = json['limit']
      offset = json['offset']
      session = json['session']
      watched = watched.concat(json['watched'])
      id = json['id']
      if (offset === 0){
        keepGoing = false;
      }
    }
    return {"id": id, "watched": watched, "session": session}
  }

  async function getStats(data){
    const resp = await fetch(baseUrl + 'stats',
            {
              method: "POST",
              headers: {"Accept-Encoding": "br"},
              body: JSON.stringify(data)
            },
    )
    return await resp.json()
  }

  async function main() {
    try {
      //const username = "dekflims"
      const username = location.pathname.split('/')[2]
      console.log(username)
      if (username === '' || username === null){
        message = "Insert your username in the site path."
      }else{
        //await Promise.all([getData(), getDB()]);
        const tmpdata = await getLbdWatched(username);
        console.log("FINAL: " + tmpdata['watched'].length)
        data = await getStats(tmpdata);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  main();
</script>


<main>
  {#if Object.keys(data).length > 0 }
    <div>{JSON.stringify(data, null, 2)}</div>
    <!--<div>{data.watched.length}</div>-->
    {:else}
      {#if message !== ''}
          <p>{message}</p>
        {:else}
          <p>Loading</p>
      {/if}
  {/if}
</main>

<style>

</style>
