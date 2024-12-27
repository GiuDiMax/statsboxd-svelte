<script>
    import SharedPage from './page.svelte'
    import {addMissingData} from "./utils.js";
    import {baseUrl} from "./config.js";
    import {onMount} from "svelte";
    export let username

    let loading = false
    let data = {}
    data.message = "Error"
    const localStorageData = localStorage.getItem(username.toLowerCase() + '_stats')

    //onMount(async () => {
    if (localStorageData !== null && localStorageData !== "undefined") {
        console.log("Read Storage Data")
        data = JSON.parse(localStorageData)
        addMissingData(data, username)
        data.message = undefined
    }
    loading = false
    //})
</script>

<main>
    {#if loading}
        <div class="loaderContainer2"><div class="loader2"></div></div>
    {:else}
        {#if data.message !== undefined}
            <p>{data.message}</p>
        {:else}
            <SharedPage data={data} year="" yearnum=0/>
        {/if}
    {/if}
</main>