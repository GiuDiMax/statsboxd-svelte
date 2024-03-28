<script>
    import SharedPage from './page.svelte'
    export let username
    export let year
    let loading = false
    let data = {}
    let tmpdata = {}
    data.message = "Error"
    const localStorageData = localStorage.getItem(username.toLowerCase())
    if(localStorageData !== null && localStorageData !== "undefined") {
        console.log("Read Storage Data")
        tmpdata = JSON.parse(localStorageData)['watched']
        //console.log(JSON.stringify(tmpdata))
        //data.message = undefined
        const yearData = tmpdata.map(item => {
            const filteredDates = item.d.filter(d => {
                const aYear = new Date(d.date).getFullYear()
                return aYear === year;
            })
            if (filteredDates.length > 0) {return { ...item, d: filteredDates }}
        }).filter(Boolean)
        console.log(JSON.stringify(({watched: yearData})))
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