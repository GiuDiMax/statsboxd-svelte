<script>
    export let data;
    export let year;
    export let yearnum;
    let showYears = false;
    const lbdurl = "https://letterboxd.com/"
    import Highcharts from 'highcharts'
    import {onMount, createEventDispatcher } from "svelte"

    function init() {

        let dataChart = {}
        let generalChart = {
            chart: {type: 'column', backgroundColor: 'transparent', margin: 0, border: 0},
            xAxis: {labels: {enabled: false}, title: false, lineColor: 'transparent', visible: false},
            yAxis: {min: -1, labels: {enabled: false}, title: false, lineColor: 'transparent', visible: false},
            legend: {enabled: false},
            title: {text: null},
            plotOptions: {column: {pointPadding: 0.2, borderWidth: 0, borderRadius: 3, groupPadding: 0,}},
        }

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
    $: {if (Object.keys(data).length > 0) {init(data)}}

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
            <!--<strong>Join the <a target="_blank" href="https://t.me/+lBgbgJ53QwM0OWE8">supporters Telegram group</a>.</strong>-->
            Forced update, year's stats and recommended films only for
            <a target="_blank" href="//buymeacoffee.com/giudimax">supporters</a>.
        </h3>
        {/if}
        <div class="mainSubtitle">
            <a href="{ lbdurl }{ data.username }"><img alt="{ data.username }" class="avatar lazy"
                                                       data-src="{ data.img }" src="images/poster.jpg" /></a>
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
            <span class="clickable active" data-hide="yearChart" data-hide2="years2" data-show="releaseYear"
                  data-show2="years1">Films</span>
            {#if data.ru}
            <span class="clickable" data-show="ratingYear" data-show2="years1" data-hide="yearChart"
                  data-hide2="years2">Ratings</span>
            {/if}
            {#if arrayLength(data['logsPerYear']) > 0}
            <span class="clickable" data-show="diaryYear" data-show2="years2" data-hide="yearChart"
                  data-hide2="years1">Diary</span>
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

</div>