<script>
    export let data
    export let year
    export let yearnum
    let showYears = false
    const lbdurl = "https://letterboxd.com/"
    import Highcharts from 'highcharts'
    import {onMount, createEventDispatcher } from "svelte"
    import jQuery from 'jquery'
    import { useLazyImage as lazyImage } from 'svelte-lazy-image'

    function clickableFunction(){
        jQuery('.' + jQuery(event.target).attr('data-hide')).addClass('hide')
        jQuery('#' + jQuery(event.target).attr('data-show')).removeClass('hide')
        jQuery('.' + jQuery(event.target).attr('data-hide2')).addClass('hide')
        jQuery('.' + jQuery(event.target).attr('data-show2')).removeClass('hide')
        jQuery('.' + jQuery(event.target).attr('data-class-show')).removeClass('hide')
        jQuery(event.target).addClass('active')
        jQuery(event.target).siblings().removeClass('active')
    }

    function handleImageLoad(){
        jQuery(event.target).parent().addClass("imgok");
    }

    function elementAt(array, index){
        try{return array[parseInt(index)]}
        catch{return ""}
    }

    function getUri(obj, obj2=null) {
        if (obj2 !== null && obj2.length > 0) {return obj2}
        //try {
        if(obj === undefined){return ""}
        if (obj.toLowerCase().includes('persian')) { return 'persianfarsi' }
        return obj.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/:/g, '').replace(/,/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/'/g, '-').replace(/\s+/g, '-');
        //} catch (error) {return ''}
    }

    function ifNoneThenZero(n){
        if (n === null){return 0}
        return parseFloat(n)
    }

    function replaceSize(src, height=165, width=110){
        try{
            if (src !== null) {
                if (src.includes('a.ltrbxd')) {
                    try {
                        return src.split("-0-").slice(0, 2).join("-0-") + "-0-" + width + "-0-" + height + "-crop.jpg";
                    } catch (error) {
                        if (src.includes('.jpg')) {
                            return src;
                        } else {
                            return src + ".jpg";
                        }
                    }
                }
                return '//a.ltrbxd.com/resized/' + src + "-0-" + width + "-0-" + height + "-crop.jpg";
            }
        }catch{}
        return ""
    }

    function init() {
        if(year === ''){
            let dataChart = {}
            let generalChart = {
                chart: {type: 'column', backgroundColor: 'transparent', margin: 0, border: 0},
                xAxis: {labels: {enabled: false}, title: false, lineColor: 'transparent', visible: false},
                yAxis: {min: -1, labels: {enabled: false}, title: false, lineColor: 'transparent', visible: false},
                legend: {enabled: false},
                title: {text: null},
                plotOptions: {column: {pointPadding: 0.2, borderWidth: 0, borderRadius: 3, groupPadding: 0,}},
            }

            // RELEASE YEAR
            dataChart = data.years.map(element => {
                const newDict = { 'name': element['_id'], 'y': element['sum'] + 1}
                if (element['sum'] === 0) { newDict['color'] = "#445566" }
                return newDict;
            });
            generalChart['tooltip'] = {
                formatter: function () {
                    return '<div class="ttYear"><span class="ttTitle">' + (parseInt(this.y) - 1).toString() + ' films</span>' +
                        '<span class="ttSubtitle">Year ' + this.points[0].key + '</span></div>'
                },
                shared: true, useHTML: true, shape: 'square', borderWidth: 0, shadow: false, backgroundColor: null,
            }
            generalChart['series'] = [{
                data: dataChart,
                label: {enabled: false},
                color: {
                    linearGradient: [0, 0, document.getElementsByClassName('chart-container')[0].offsetWidth, 0],
                    stops: [[0.00, '#00e054'], [1.00, '#3fbcf2']]
                },
                point: {events: {click: function () {
                    location.href = lbdurl+data.username+'/films/year/' + this.options.name + "/"
                }}}
            }]
            Highcharts.chart('releaseYear', generalChart)

            // RATING YEAR
            dataChart = data.years.map(element => {
                const newDict = { 'name': element['_id'], 'y': (ifNoneThenZero(element['avg']) + 0.1)}
                if (ifNoneThenZero(element['avg']) === 0) { newDict['color'] = "#445566" }
                return newDict;
            });
            generalChart['tooltip'] = {
                formatter: function () {
                    return '<div class="ttYear"><span class="ttTitle">Average ' + parseFloat(this.y - 0.1).toFixed(2).toString() + '</span>' +
                        '<span class="ttSubtitle">Year ' + this.points[0].key + '</span></div>'
                },
                shared: true, useHTML: true, shape: 'square', borderWidth: 0, shadow: false, backgroundColor: null,
            }
            generalChart['series'] = [{
                data: dataChart,
                label: {enabled: false},
                color: {
                    linearGradient: [0, 0, document.getElementsByClassName('chart-container')[0].offsetWidth, 0],
                    stops: [[0.00, '#ffb860'], [1.00, '#ffe870']]
                },
                point: {events: {click: function () {
                            location.href = lbdurl+data.username+'/films/year/' + this.options.name + "/"
                }}}
            }]
            Highcharts.chart('ratingYear', generalChart)

            // DIARY YEAR
            dataChart = data.logsPerYear.map(element => {
                const newDict = { 'name': element['_id'], 'y': element['sum'] + 5}
                if (element['sum'] === 0) { newDict['color'] = "#445566" }
                return newDict;
            });
            generalChart['tooltip'] = {
                formatter: function () {
                    return '<div class="ttYear"><span class="ttTitle">' + (parseInt(this.y) - 5).toString() + ' films</span>' +
                        '<span class="ttSubtitle">Year ' + this.points[0].key + '</span></div>'
                },
                shared: true, useHTML: true, shape: 'square', borderWidth: 0, shadow: false, backgroundColor: null,
            }
            generalChart['series'] = [{
                data: dataChart,
                label: {enabled: false},
                color: {
                    linearGradient: [0, 0, document.getElementsByClassName('chart-container')[0].offsetWidth, 0],
                    stops: [[0.00, '#48FF84'], [1.00, '#06E358']]
                },
                point: {events: {click: function () {
                            location.href = lbdurl+data.username+'/films/year/' + this.options.name + "/"
                }}}
            }]
            generalChart['plotOptions'] = {column: {pointPadding: 0.05, borderWidth: 0, borderRadius: 3, groupPadding: 0,}},
            Highcharts.chart('diaryYear', generalChart)
        }else{

        }
    }

    function last(inputArray){
        return inputArray[inputArray.length - 1]
    }

    function arrayLength(inputArray){
        if (inputArray !== undefined){
            return inputArray.length
        }
        return 0
    }

    const dispatch = createEventDispatcher()
    dispatch("dataReceived", data)
    $: {if (Object.keys(data).length > 0) {init()}}

    onMount(() => {
    })

</script>

<!--{JSON.stringify(data._id, null, 2)}-->
<div class="content" id="content" >
    {#if 'years' in data }
    <div class="popupYearContainer {year!=='' ? 'popupYear2Container' : ''} " on:mouseleave={()=>{showYears = false}}>
        <a href="#" class="popupButton" data-show="popupYear" on:click={()=>{showYears = !showYears}}>
            <div class="arrow-down"></div>
        </a>
        <div id="popupYear" class="popupYear {showYears ? '' : 'hide'}">
            <div class="arrow-up"></div>
            <div class="listaAnni">
                <div>
                    <a href="/{ data.username }">All time</a>
                    {#each data['yearsStats'] as y }
                        <a href="/{ data.username }/{ y }">{ y }{#if y === new Date().getFullYear() }...{/if}</a>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    {/if}

    <section class="mainTitlesec">
        <div class="constraint {year!=='' ? 'constraint_full' : 'constraint_year'}">
            <div class="mainT">
                {#if year === '' }
                    <h1 class="mainTitle">A Life in Film</h1>
                {:else}
                    <h1 class="mainTitle yearTitle">{ yearnum }</h1>
                {/if}
            </div>
            <svg class="pattern -left" height="390" role="presentation" viewBox="0 0 320 390" width="320"
                 xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(318 70)">
                        <rect fill="#00E054" height="80" rx="2" width="4" y="86"></rect>
                        <rect fill="#40BCF4" height="77" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="32" rx="2" width="4" y="202"></rect>
                        <rect fill="#FF8000" height="4" rx="2" width="4" y="238"></rect>
                    </g>
                    <g transform="translate(298 121)">
                        <rect fill="#00E054" height="90" rx="2" width="4" y="55"></rect>
                        <rect fill="#40BCF4" height="48" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="22" rx="2" width="4" y="169"></rect>
                    </g>
                    <g transform="translate(278 111)">
                        <rect fill="#00E054" height="70" rx="2" width="4" y="66"></rect>
                        <rect fill="#40BCF4" height="28" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="52" rx="2" width="4" y="152"></rect>
                    </g>
                    <g transform="translate(258 84)">
                        <rect fill="#00E054" height="90" rx="2" width="4" y="78"></rect>
                        <rect fill="#FF8000" height="52" rx="2" width="4" y="201"></rect>
                        <rect fill="#40BCF4" height="60" rx="2" width="4"></rect>
                    </g>
                    <g transform="translate(238 80)">
                        <rect fill="#00E054" height="90" rx="2" width="4" y="96"></rect>
                        <rect fill="#00E054" height="20" rx="2" width="4" y="68"></rect>
                        <rect fill="#40BCF4" height="47" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="32" rx="2" width="4" y="212"></rect>
                    </g>
                    <g transform="translate(218 96)">
                        <rect fill="#00E054" height="70" rx="2" width="4" y="48"></rect>
                        <rect fill="#40BCF4" height="18" rx="2" width="4" y="12"></rect>
                        <rect fill="#40BCF4" height="4" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="22" rx="2" width="4" y="144"></rect>
                    </g>
                    <g transform="translate(198 111)">
                        <rect fill="#00E054" height="60" rx="2" width="4" y="46"></rect>
                        <rect fill="#00E054" height="4" rx="2" width="4" y="114"></rect>
                        <rect fill="#40BCF4" height="28" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="42" rx="2" width="4" y="142"></rect>
                    </g>
                    <g transform="translate(178 40)">
                        <rect fill="#00E054" height="100" rx="2" width="4" y="102"></rect>
                        <rect fill="#FF8000" height="12" rx="2" width="4" y="210"></rect>
                        <rect fill="#40BCF4" height="70" rx="2" width="4"></rect>
                    </g>
                    <g transform="translate(158 86)">
                        <rect fill="#00E054" height="80" rx="2" width="4" y="36"></rect>
                        <rect fill="#40BCF4" height="28" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="32" rx="2" width="4" y="132"></rect>
                    </g>
                    <g transform="translate(138 86)">
                        <rect fill="#00E054" height="80" rx="2" width="4" y="36"></rect>
                        <rect fill="#40BCF4" height="28" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="32" rx="2" width="4" y="132"></rect>
                    </g>
                    <g transform="translate(118 111)">
                        <rect fill="#00E054" height="80" rx="2" width="4" y="36"></rect>
                        <rect fill="#40BCF4" height="28" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="32" rx="2" width="4" y="132"></rect>
                    </g>
                    <g transform="translate(98 82)">
                        <rect fill="#00E054" height="100" rx="2" width="4" y="102"></rect>
                        <rect fill="#FF8000" height="12" rx="2" width="4" y="210"></rect>
                        <rect fill="#40BCF4" height="70" rx="2" width="4"></rect>
                    </g>
                    <g transform="translate(78 74)">
                        <rect fill="#00E054" height="170" rx="2" width="4" y="51"></rect>
                        <rect fill="#40BCF4" height="4" rx="2" width="4"></rect>
                        <rect fill="#40BCF4" height="20" rx="2" width="4" y="23"></rect>
                        <rect fill="#FF8000" height="34" rx="2" width="4" y="246"></rect>
                    </g>
                    <g transform="translate(58 127)">
                        <rect fill="#00E054" height="40" rx="2" width="4" y="64"></rect>
                        <rect fill="#FF8000" height="74" rx="2" width="4" y="144"></rect>
                        <rect fill="#40BCF4" height="20" rx="2" width="4"></rect>
                    </g>
                    <g transform="translate(38 77)">
                        <rect fill="#00E054" height="90" rx="2" width="4" y="104"></rect>
                        <rect fill="#FF8000" height="64" rx="2" width="4" y="204"></rect>
                        <rect fill="#40BCF4" height="24" rx="2" width="4"></rect>
                        <rect fill="#40BCF4" height="50" rx="2" width="4" y="32"></rect>
                    </g>
                    <g transform="translate(18 117)">
                        <rect fill="#00E054" height="70" rx="2" width="4" y="84"></rect>
                        <rect fill="#FF8000" height="44" rx="2" width="4" y="184"></rect>
                        <rect fill="#FF8000" height="4" rx="2" width="4" y="232"></rect>
                        <rect fill="#40BCF4" height="30" rx="2" width="4"></rect>
                    </g>
                    <g transform="translate(-2 127)">
                        <rect fill="#00E054" height="76" rx="2" width="4" y="42"></rect>
                        <rect fill="#FF8000" height="44" rx="2" width="4" y="194"></rect>
                        <rect fill="#40BCF4" height="10" rx="2" width="4"></rect>
                    </g>
                </g>
            </svg>
            <svg class="pattern -right" height="390" role="presentation" viewBox="0 0 320 390" width="320"
                 xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(318 63)">
                        <rect fill="#00E054" height="80" rx="2" width="4" y="67"></rect>
                        <rect fill="#40BCF4" height="58" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="62" rx="2" width="4" y="172"></rect>
                    </g>
                    <g transform="translate(298 88)">
                        <rect fill="#00E054" height="70" rx="2" width="4" y="59"></rect>
                        <rect fill="#40BCF4" height="28" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="42" rx="2" width="4" y="162"></rect>
                    </g>
                    <g transform="translate(278 78)">
                        <rect fill="#00E054" height="50" rx="2" width="4" y="86"></rect>
                        <rect fill="#40BCF4" height="70" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="60" rx="2" width="4" y="174"></rect>
                    </g>
                    <g transform="translate(258 94)">
                        <rect fill="#00E054" height="99" rx="2" width="4" y="70"></rect>
                        <rect fill="#40BCF4" height="48" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="30" rx="2" width="4" y="196"></rect>
                    </g>
                    <g transform="translate(238 83)">
                        <rect fill="#00E054" height="80" rx="2" width="4" y="104"></rect>
                        <rect fill="#40BCF4" height="58" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="32" rx="2" width="4" y="192"></rect>
                    </g>
                    <g transform="translate(218 108)">
                        <rect fill="#00E054" height="40" rx="2" width="4" y="79"></rect>
                        <rect fill="#40BCF4" height="48" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="62" rx="2" width="4" y="152"></rect>
                        <rect fill="#FF8000" height="4" rx="2" width="4" y="222"></rect>
                    </g>
                    <g transform="translate(198 78)">
                        <rect fill="#00E054" height="60" rx="2" width="4" y="112"></rect>
                        <rect fill="#40BCF4" height="80" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="30" rx="2" width="4" y="184"></rect>
                        <rect fill="#FF8000" height="10" rx="2" width="4" y="222"></rect>
                    </g>
                    <g transform="translate(178 64)">
                        <rect fill="#00E054" height="119" rx="2" width="4" y="100"></rect>
                        <rect fill="#40BCF4" height="68" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="10" rx="2" width="4" y="226"></rect>
                    </g>
                    <g transform="translate(158 91)">
                        <rect fill="#00E054" height="80" rx="2" width="4" y="88"></rect>
                        <rect fill="#40BCF4" height="28" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="32" rx="2" width="4" y="184"></rect>
                    </g>
                    <g opacity=".8" transform="translate(138 100)">
                        <rect fill="#00E054" height="50" rx="2" width="4" y="63"></rect>
                        <rect fill="#40BCF4" height="28" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="82" rx="2" width="4" y="138"></rect>
                    </g>
                    <g transform="translate(118 100)">
                        <rect fill="#00E054" height="50" rx="2" width="4" y="66"></rect>
                        <rect fill="#40BCF4" height="28" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="32" rx="2" width="4" y="172"></rect>
                    </g>
                    <g transform="translate(98 110)">
                        <rect fill="#00E054" height="30" rx="2" width="4" y="66"></rect>
                        <rect fill="#40BCF4" height="38" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="42" rx="2" width="4" y="131"></rect>
                        <rect fill="#FF8000" height="12" rx="2" width="4" y="182"></rect>
                    </g>
                    <g transform="translate(78 107)">
                        <rect fill="#00E054" height="60" rx="2" width="4" y="46"></rect>
                        <rect fill="#40BCF4" height="10" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="32" rx="2" width="4" y="149"></rect>
                    </g>
                    <g transform="translate(58 76)">
                        <rect fill="#00E054" height="60" rx="2" width="4" y="63"></rect>
                        <rect fill="#40BCF4" height="28" rx="2" width="4" y="18"></rect>
                        <rect fill="#40BCF4" height="10" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="36" rx="2" width="4" y="185"></rect>
                    </g>
                    <g transform="translate(38 39)">
                        <rect fill="#00E054" height="74" rx="2" width="4" y="83"></rect>
                        <rect fill="#40BCF4" height="77" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="22" rx="2" width="4" y="214"></rect>
                    </g>
                    <g transform="translate(18 81)">
                        <rect fill="#00E054" height="70" rx="2" width="4" y="56"></rect>
                        <rect fill="#40BCF4" height="28" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="42" rx="2" width="4" y="172"></rect>
                    </g>
                    <g transform="translate(-2 101)">
                        <rect fill="#00E054" height="80" rx="2" width="4" y="36"></rect>
                        <rect fill="#40BCF4" height="10" rx="2" width="4"></rect>
                        <rect fill="#FF8000" height="72" rx="2" width="4" y="124"></rect>
                    </g>
                </g>
            </svg>
        </div>
        <div class="mainTitlesecBak"></div>
        <div class="mainTitlesecFade"></div>
        {#if year === '' }
        <h3 class="arrowcheck">
            Your last update: { data.update }. <br />
            Forced update, year's stats and recommended films only for
            <a target="_blank" href="//buymeacoffee.com/giudimax">supporters</a>.
        </h3>
        {/if}
        <div class="mainSubtitle">
            <!--<a href="{ lbdurl }{ data.username }">
                <img alt="{ data.username }" class="avatar lazy" data-src="{ data.img }" src="images/poster.jpg" />
            </a>-->
            <span><a class="clickable" href="{ lbdurl}{ data.username }">
                { data.name }</a>'s
                { year==='' ? 'all-time stats' : 'year in review' }
            </span>
        </div>
        {#if year === '' }
        <div class="buttonstart">
            <a id="updatebtn" class="clickable seeallbutton updatebutton" href="/#">
                <span class="material-symbols-rounded icon">sync</span>Update
            </a>
            <a class="clickable seeallbutton updatebutton collagebutton" href="/{ data.username }/collage" target="_blank">
                <span class="material-symbols-rounded icon">grid_on</span>Last month collage
            </a>
        </div>
        {/if}
        <div class="numbersStats">
            {#if year === '' }
            <a href="//letterboxd.com/{ data.username }/films">
                <span class="number">{ data.totalFilms }</span>
                <span class="text">Films</span>
            </a>
            <div>
                <span class="number">{ data.totalRuntime }</span>
                <span class="text">Hours</span>
            </div>
            <div>
                <span class="number">{ data.totalDirectors }</span>
                <span class="text">Directors</span>
            </div>
            <div>
                <span class="number">{ data.totalCountries }</span>
                <span class="text">Countries</span>
            </div>
            {#if 'streak' in data }
            <a href="//letterboxd.com/{ data.username }/films/diary/for/{ data['streak'].year }/{ data['streak'].month }/"
               class="mostrap1">
                <div class="pannello p1">
                    <div class="testo">At least one film per week,
                        starting { data['streak'].monthName } { data['streak'].year }</div>
                </div>
                <span class="number">{ data['streak'].max }w</span>
                <span class="text">Longest Streak</span>
            </a>
            {/if}
            {#if '2+filmDays' in data}
            <div>
                <span class="number">{ data['2+filmDays'] }</span>
                <span class="text">2+ Film Days</span>
            </div>
            {/if}
            {:else}
            <div>
                <span class="number">{ data[year+'stats'].total }</span>
                <span class="text">Diary Entries</span>
            </div>
            <div>
                <span class="number">{ data[year+'stats'].likes }</span>
                <span class="text">Films liked</span>
            </div>
            <div>
                <span class="number">{ data[year+'stats'].reviews }</span>
                <span class="text">Reviews</span>
            </div>
            <div>
                <span class="number">{ data[year+'stats'].totalRuntime }</span>
                <span class="text">Hours</span>
            </div>
            {/if}
        </div>
    </section>

    <section class="sectionStats">
        <div class="sepline">
            <span>By release year</span>
            <div class="line"></div>
            <span class="clickable active" on:click={clickableFunction} data-hide="yearChart" data-hide2="years2" data-show="releaseYear" data-show2="years1">Films</span>
            {#if data.ru}
            <span class="clickable" on:click={clickableFunction} data-show="ratingYear" data-show2="years1" data-hide="yearChart" data-hide2="years2">Ratings</span>
            {/if}
            {#if arrayLength(data['logsPerYear']) > 0}
            <span class="clickable" on:click={clickableFunction} data-show="diaryYear" data-show2="years2" data-hide="yearChart" data-hide2="years1">Diary</span>
            {/if}
        </div>
        <div class="chart-container">
            <div class="yearChart" id="releaseYear"></div>
            <div class="yearChart hide" id="ratingYear"></div>
            <div class="yearChart hide" id="diaryYear"></div>
        </div>
        {#if 'years' in data }
        <div class="years">
            <span class="years1">{ data.years[0]._id }</span>
            <span class="years1">{ last(data.years)._id }</span>
            {#if data.logsPerYear.length > 0 }
            <span class="years2 hide">{ data.logsPerYear[0]._id }</span>
            <span class="years2 hide">{ last(data.logsPerYear)._id }</span>
            {/if}
        </div>
        {/if}
    </section>
    {#if data.ru }
    <section class="sectionStats">
        <div class="sepline">
            <span>Highest rated decades</span>
            <div class="line"></div>
        </div>
        {#each data.decades as element }
        <div class="decade">
            <div class="decadeLeft">
                <a href="//letterboxd.com/{ data.username }/films/rated/.5-5/decade/{ element._id }s/by/entry-rating/"
                   class="decadeTitle">{ element._id }s</a>
                <div><img src="images/greystar.webp" alt="greystar"/><span
                        class="decadeAverage">Average { element.avg }</span></div>
            </div>
            <div class="decPosters">
                {#each element.imgs as element2}
                <a class="poster decPosterImg" href="{ lbdurl }film/{ element2.uri }">
                    <div class="containertextimg"><span>{ element2.uri.replace("-", " ") }</span></div>
                    <img use:lazyImage on:load={handleImageLoad} src="images/poster.jpg" data-src="{ replaceSize(element2.img, 105, 70) }" alt="{ element.uri }"/>
                </a>
                {/each}
            </div>
        </div>
        {/each}
    </section>
    {/if}
    <section class="sectionStats">
        <div class="sepline">
            <span>Genres, Countries & Languages</span>
            <div class="line"></div>
            {#if data.ru}
            <span class="clickable active" on:click={clickableFunction} data-show="MWGCL" data-hide="secGCL">Most Watched</span>
            <span class="clickable" on:click={clickableFunction} data-show="HRGCL" data-hide="secGCL">Highest Rated</span>
            {/if}
        </div>
        <div id="MWGCL" class="attributes-chart threeColumns secGCL">
            {#each [['genres', 'genre', 'rgb(0, 224, 84)'], ['countries', 'country', 'rgb(64, 188, 244)'], ['originallanguage','language', 'rgb(255, 128, 0)']] as type}
                <div class="labels2">
                {#each Array.from({ length: 10 }, (_, i) => i) as i }
                <div>
                    <a class="clickable label1"
                       href="{ lbdurl }{ data.username }/films/{year!=='' ? 'diary/for/'+yearnum.toString() : ''}{type[1]}/{getUri( elementAt(data[('mw_'+type[0])],i)['name'] )}">
                        { elementAt(data[('mw_'+type[0])],i)['name'] }
                    </a>
                    <div>
                        <div class="genresFilms"
                             style="width: {  elementAt(data[('mw_'+type[0])],i)['sum'] *100/ elementAt(data[('mw_'+type[0])],0)['sum']  }%;">
                            <span>{ elementAt(data[('mw_'+type[0])],i)['sum'] } films</span></div>
                        <div class="progressBarWithVal"
                             style="width:{ elementAt(data[('mw_'+type[0])],i)['sum']*100/ elementAt(data[('mw_'+type[0])],0)['sum']  }%; background-color:{ type[2] };"></div>
                    </div>
                </div>
                {/each}
            </div>
            {/each}
        </div>
        {#if data.ru }
        <div id="HRGCL" class="attributes-chart threeColumns secGCL hide">
            {#each [['genres', 'genre', 'rgb(72, 255, 132)'], ['countries', 'country', 'rgb(116, 240, 255)'], ['originallanguage','language', 'rgb(255, 184, 96)']] as type}
                <div class="labels2">
                    {#each Array.from({ length: 10 }, (_, i) => i) as i }
                        <div>
                            <a class="clickable label1"
                               href="{ lbdurl }{ data.username }/films/{year!=='' ? 'diary/for/'+yearnum.toString() : ''}rated/.5-5/{type[1]}/{getUri( elementAt(data[('tr_'+type[0])],i)['name'] )}">
                                { elementAt(data[('tr_'+type[0])],i)['name'] }
                            </a>
                            <div>
                                <div class="genresFilms"
                                     style="width: {  elementAt(data[('tr_'+type[0])],i)['avg'] *100/ elementAt(data[('tr_'+type[0])],0)['avg']  }%;">
                                    <span>Average: { elementAt(data[('tr_'+type[0])],i)['avg'] }</span></div>
                                <div class="progressBarWithVal"
                                     style="width:{ elementAt(data[('tr_'+type[0])],i)['avg']*100/ elementAt(data[('tr_'+type[0])],0)['avg']  }%; background-color:{ type[2] };"></div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
        {/if}
    </section>
    <section class="sectionStats">
        <div class="sepline">
            <span>Themes & Nanogenres®</span>
            <div class="line"></div>
            {#if data.ru }
            <span class="clickable active" on:click={clickableFunction} data-show="MWTN" data-hide="secTN">Most Watched</span>
            <span class="clickable" on:click={clickableFunction} data-show="HRTN" data-hide="secTN">Highest Rated</span>
            {/if}
        </div>
        <div id="MWTN" class="attributes-chart twocolumn secTN">
            {#each ['theme', 'nanogenre'] as type }
            <div class="labels">
                {#each Array.from({ length: 10 }, (_, i) => i) as i }
                <a class="clickable label2" href="{ lbdurl }{ data.username }/films/{year!=='' ? 'diary/for/'+yearnum.toString() : ''}{ elementAt(data['mw_' + type + 's'],i)['type'] }/{ getUri(elementAt(data['mw_' + type + 's'],i)['name'], elementAt(data['mw_' + type + 's'],i)['uri']) }">
                    <span class="leftText">{ elementAt(data['mw_' + type + 's'],i)['name'] }</span>
                    <span class="bold right">{ elementAt(data['mw_' + type + 's'],i)['sum'] } films</span>
                    <div class="labcontainer"
                         style="width:{ elementAt(data['mw_' + type + 's'],i)['sum'] * 100 /elementAt(data['mw_' + type + 's'],0)['sum'] }%;">
                    </div>
                </a>
                {/each}
            </div>
            {/each}
        </div>
        {#if data.ru }
        <div id="HRTN" class="attributes-chart twocolumn secTN hide">
            {#each ['theme', 'nanogenre'] as type }
                <div class="labels">
                    {#each Array.from({ length: 10 }, (_, i) => i) as i }
                        <a class="clickable label2" href="{ lbdurl }{ data.username }/films/{year!=='' ? 'diary/for/'+yearnum.toString() : ''}rated/.5-5/{ elementAt(data['tr_' + type + 's'],i)['type'] }/{ getUri(elementAt(data['tr_' + type + 's'],i)['name'], elementAt(data['tr_' + type + 's'],i)['uri']) }">
                            <span class="leftText">{ elementAt(data['tr_' + type + 's'],i)['name'] }</span>
                            <span class="bold right">Average: { elementAt(data['tr_' + type + 's'],i)['avg'] }</span>
                            <div class="labcontainer"
                                 style="width:{ elementAt(data['tr_' + type + 's'],i)['avg'] * 100 /elementAt(data['tr_' + type + 's'],0)['avg'] }%;">
                            </div>
                        </a>
                    {/each}
                </div>
            {/each}
        </div>
        {/if}
    </section>
    {#if year===''}
        <section class="sectionStats">
            <div class="sepline">
                <span>List progress</span>
                <div class="line"></div>
            </div>
            <div class="pielists">
                {#each Array.from({ length: arrayLength(data['lists']) }, (_, i) => i) as i }
                <div class="donut"
                    style="background:conic-gradient(#40bcf4 0deg { 3.6* elementAt(data['lists'],i).perc }deg,#303c44 { 3.6* elementAt(data['lists'],i).perc }deg 360deg);">
                    <a class="hole" href="{ lbdurl }{ elementAt(data['lists'],i)._id }">
                        <span class="listtitle">{ elementAt(data['lists'],i).name }</span>
                        <span class="listperc">{ parseInt(elementAt(data['lists'],i).perc) }%</span>
                        <span class="listnum">{ elementAt(data['lists'],i).num } of { elementAt(data['lists'],i).tot }</span>
                    </a>
                </div>
                {/each}
            </div>
        </section>
        <section class="sectionStats">
            <div class="sepline">
                <span>Collections</span>
                <div class="line"></div>
                <span class="clickable active" on:click={clickableFunction} data-show="completeCollection" data-hide="collectionsx">Complete</span>
                <span class="clickable" on:click={clickableFunction} data-show="almostCollection" data-hide="collectionsx">Almost Complete</span>
            </div>
            <div class="collections">
                {#each Array.from({ length: arrayLength(data['collections']) }, (_, i) => i) as i }
                <div id="{ elementAt(data['collections'],i)['_id'] }Collection"
                    class="collectionsx {elementAt(data['collections'],i)._id !== 'complete' ? 'hide' : ''}">
                    {#each elementAt(data['collections'],i).collections as element}
                    <div class="singleCollection">
                        <a class="threeposters"
                           href="{ lbdurl }films/in/{ element['uri'] }/by/release-earliest/size/large/">
                            {#each element.posters as poster }
                            <img use:lazyImage class="lazy" src="images/poster_70.jpg" data-src="{ replaceSize(poster, 105, 70) }" alt=""/>
                            {/each}
                        </a>
                        <span>
                            <a class="name" href="{lbdurl}films/in/{element['uri']}/by/release-earliest/size/large/">
                                {element['name']}
                            </a>
                            {element['num']} watched
                        </span>
                    </div>
                    {/each}
                </div>
                {/each}
            </div>
        </section>
    {/if}
</div>