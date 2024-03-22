<script>
    import {onMount} from 'svelte'
    import SharedPage from "./page.svelte"
    import jszip from "jszip"
    import PapaParse from "papaparse"
    import { baseUrl } from './config.js';

    let loading = false
    let data = {}
    let tmpdata = {}
    let file;
    let jsonData;

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

    async function parseCsv(zip, filename) {
        const csvFile = await zip.file(filename)
        const csvData = await csvFile.async('text')
        return await PapaParse.parse(csvData, {header: true, skipEmptyLines: true}).data
    }

    onMount(async () => {
        const localStorageData = localStorage.getItem("stats")
        if(localStorageData !== null && localStorageData !== "undefined") {
            data = JSON.parse(localStorageData)
            return
        }
        data.message = "Please upload your file"
        const input = document.querySelector('input[type="file"]');
        input.addEventListener('change', async (e) => {
            loading = true
            try {
                file = e.target.files[0]
                const zip = await jszip.loadAsync(file)
                const [watchedData, ratingsData, diaryData] = await Promise.all([
                    parseCsv(zip, 'watched.csv'),
                    parseCsv(zip, 'ratings.csv'),
                    parseCsv(zip, 'diary.csv'),
                ]);

                console.log("ok read files")

                const ratingDict = ratingsData.reduce((acc, curr) => {
                    acc[curr['Letterboxd URI']] = curr['Rating'];
                    return acc;
                }, {});

                const diaryDict = diaryData.reduce((acc, curr) => {
                    const { 'Name': name, 'Year': year, 'Rewatch': rewatch } = curr;
                    const key = `${name}_${year}`;
                    acc[key] = acc[key] || [];
                    acc[key].push({ date: curr['Watched Date'], rewatch: rewatch === 'Yes' })
                    return acc;
                }, {});

                tmpdata['watched'] = watchedData.map(item => {
                    const key = `${item['Name']}_${item['Year']}`
                    return {
                        _id: item['Letterboxd URI'].split('/').pop(),
                        r: parseFloat(ratingDict[item['Letterboxd URI']]) || null,
                        d: diaryDict[key] || []
                    };
                });

                console.log("ok tmpdata")
                data = await getStats(tmpdata)
                data['username'] = "giudimax"
                localStorage.setItem("stats", JSON.stringify(data))
                //data = tmpdata
                console.log("ok stats")
                data.message = undefined

            } catch (error) {
                console.log(error)
                data.message = "Error"
            }
            loading = false
        })
    })

</script>

<input type="file" hidden={loading || Object.keys(data).length > 1}/>
<main>
    {#if loading}
        <p>Loading</p>
    {:else}
        {#if data.message !== undefined}
            <p>{data.message}</p>
        {:else}
            <SharedPage data={data} year=""/>
        {/if}
    {/if}
</main>
