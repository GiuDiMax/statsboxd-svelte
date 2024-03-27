<script>
    import SharedPage from './page.svelte'
    export let username
    export let year
    let loading = false
    let data = {}
    data.message = "ok"
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