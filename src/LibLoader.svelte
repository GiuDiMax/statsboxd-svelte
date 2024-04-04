<svelte:head>
    <script bind:this={script} src={url} />
</svelte:head>
<script>
    import { onMount, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let url;
    let script;

    onMount(async () => {
        script.addEventListener('load', () => {
            dispatch('loaded');
        });
        script.addEventListener('error', (event) => {
            console.error("Something went wrong", event);
            dispatch('error');
        });
    });
</script>