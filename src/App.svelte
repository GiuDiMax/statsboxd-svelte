<script>
  import Cookies from 'js-cookie';

  let data = {}
  let message = ""
  //const baseUrl = "//worker.statsboxd.eu.org/"
  const baseUrl = " http://127.0.0.1:8787/"

  async function getLbdWatched(username, id="", limit=0, offset=0, session=""){
    let watched = []
    let keepGoing = true;
    let json
    let resp
    let update
    while (keepGoing) {
      resp = await fetch(baseUrl + 'data?username='+username+"&id="+id+'&limit='+limit+'&offset='+offset +'&session='+session, {headers: {"Accept-Encoding": "br"}});
      json = await resp.json()
      limit = json['limit']
      offset = json['offset']
      session = json['session']
      watched = watched.concat(json['watched'])
      update = json['update']
      id = json['id']
      if (offset === 0){
        keepGoing = false;
      }
    }
    return {"id": id, "watched": watched, "session": session, "update": update}
  }

  async function getLbdUpdate(tmpdata){
    let response = tmpdata
    const resp = await fetch(baseUrl + 'update?id='+tmpdata['id']+'&update='+tmpdata['update']+'&session=', {headers: {"Accept-Encoding": "br"}});
    //const resp = await fetch(baseUrl + 'update?id='+tmpdata['id']+'&update='+"2024-03-20T09:34:21.322Z"+'&session=', {headers: {"Accept-Encoding": "br"}});
    const json = await resp.json()
    response['watched'] = tmpdata['watched'].concat(json['watched'].filter((item) => !tmpdata['watched'].some((e) => e._id === item._id)))
    response['update'] = json['update']
    response['session'] = json['session']
    //return tmpdata
    return response
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
      const username = location.pathname.split('/')[2]
      if (username === '' || username === null){
        message = "Insert your username in the site path."
      }
      else {
        const localStorageData = localStorage.getItem(username)
        let tmpdata
        if(localStorageData !== null && localStorageData !== "undefined") {
          tmpdata = JSON.parse(localStorageData)
          console.log("Read from localStorage")
          tmpdata = await getLbdUpdate(tmpdata)
        }else{
          tmpdata = await getLbdWatched(username)
        }
        localStorage.setItem(username, JSON.stringify(tmpdata))
        data = await getStats(tmpdata)
      }
    }
    catch (error) {
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
