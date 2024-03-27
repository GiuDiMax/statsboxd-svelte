<script>
    import SharedPage from './page.svelte'
    export let username
    let loading = false
    let data = {}
    data.message = "Error"
    const localStorageData = localStorage.getItem(username.toLowerCase() + '_stats')
    if(localStorageData !== null && localStorageData !== "undefined") {
        console.log("Read Storage Data")
        data = JSON.parse(localStorageData)
        data.message = undefined
    }
</script>

<main>
    {#if loading}
        <p>Loading</p>
    {:else}
        {#if data.message !== undefined}
            <p>{data.message}</p>
        {:else}
            <SharedPage data={data} year="" yearnum=0/>
        {/if}
    {/if}
</main>