<script>
    import SharedPage from './page.svelte'
    import {baseUrl} from "./config.js";
    import {onMount} from "svelte";
    export let username
    export let year
    let loading = true
    let data = {}
    let tmpdata = {}
    let message = "Error"

    async function getYearStats(data){
        const resp = await fetch(baseUrl + 'yearstats',
            {
                method: "POST",
                headers: {"Accept-Encoding": "br"},
                body: JSON.stringify(data)
            },
        )
        //console.log(resp)
        return await resp.json()
    }

    onMount(async () => {
        try{
        let localStorageData = localStorage.getItem(username.toLowerCase() + "_" + year.toString() + "_stats")
        if (localStorageData !== null && localStorageData !== "undefined") {
            console.log("Read Storage Stats Data")
            data = JSON.parse(localStorageData)
            console.log(data)
            message = undefined
            loading = false
            return
        }
        localStorageData = localStorage.getItem(username.toLowerCase())
        if (localStorageData !== null && localStorageData !== "undefined") {
            console.log("Read Storage User Data")
            tmpdata = JSON.parse(localStorageData)
            //console.log(JSON.stringify(tmpdata))
            //data.message = undefined
            const yearData = tmpdata['watched'].map(item => {
                const filteredDates = item.d.filter(d => {
                    const aYear = new Date(d.date).getFullYear()
                    return aYear === year;
                })
                if (filteredDates.length > 0) {
                    return {...item, d: filteredDates}
                }
            }).filter(Boolean)
            //console.log(JSON.stringify(({watched: yearData})))
            data = await getYearStats({year: year, watched: yearData})
            //console.log(tmpdata)
            data['username'] = tmpdata['username']
            data['name'] = tmpdata['name']
            data['ru'] = tmpdata['ru']
            data['update'] = tmpdata['update']
            localStorage.setItem(username.toLowerCase() + "_" + year.toString() + "_stats", JSON.stringify(data))
            message = undefined
        }}
        catch(error){
            console.log(error)
            message = "There is an error, please contact me on <a href='https://t.me/giudimax' target='_blank'>telegram" +
                " and send me your zip file</a><br/>"
        }
        loading = false
    })
</script>

<main>
    {#if loading}
        <p>Loading</p>
    {:else}
        {#if message !== undefined}
            <p>{message}</p>
        {:else}
            <SharedPage data={data} year={year.toString()} yearnum={year}/>
        {/if}
    {/if}
</main>