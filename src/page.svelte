<script>
    export let data;
    export let year;
</script>

<!--{JSON.stringify(data._id, null, 2)}-->
<div id="content" class="content">
    {#if 'years' in data }
    <div class="popupYearContainer {year!=='' ? 'popupYear2Container' : ''} ">
        <a href="#" class="popupButton" data-show="popupYear">
            <div class="arrow-down"></div>
        </a>
        <div id="popupYear" class="popupYear hide">
            <div class="arrow-up"></div>
            <div class="listaAnni">
                <div>
                    <a href="/{ data.username }">All time</a>
                    {#each data.years as y }
                        <a href="/{ data.username }/{ y }">{ y }{#if y === new Date().getFullYear() }...{/if}</a>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    {/if}
</div>