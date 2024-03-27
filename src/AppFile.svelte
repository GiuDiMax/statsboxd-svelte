<script>
    import {onMount} from 'svelte'
    import SharedPage from "./page.svelte"
    import jszip from "jszip"
    import PapaParse from "papaparse"
    import { baseUrl } from './config.js'

    let loading = false
    let data = {}
    let tmpdata = {}
    let file
    let jsonData
    let message = ""

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
        data.message = "Please upload your file"
        const input = document.querySelector('input[type="file"]');
        input.addEventListener('change', async (e) => {
            loading = true
            try {
                file = e.target.files[0]
                const zip = await jszip.loadAsync(file)
                const [watchedData, ratingsData, diaryData, reviewsData, profileData] = await Promise.all([
                    parseCsv(zip, 'watched.csv'),
                    parseCsv(zip, 'ratings.csv'),
                    parseCsv(zip, 'diary.csv'),
                    parseCsv(zip, 'reviews.csv'),
                    parseCsv(zip, 'profile.csv'),
                ]);

                console.log("ok read files")

                const username = profileData[0]['Username']
                const name = profileData[0]['Given Name'] + profileData[0]['Family Name']

                const ratingDict = ratingsData.reduce((acc, curr) => {
                    acc[curr['Letterboxd URI']] = curr['Rating'];
                    return acc;
                }, {});

                const reviewArray = reviewsData.map(review => review['Letterboxd URI']);

                const diaryDict = diaryData.reduce((acc, curr) => {
                    const { 'Name': name, 'Year': year, 'Rewatch': rewatch } = curr;
                    const key = `${name}_${year}`;
                    acc[key] = acc[key] || [];
                    acc[key].push({
                        date: curr['Watched Date'],
                        rewatch: rewatch === 'Yes',
                        review: reviewArray.includes(curr['Letterboxd URI']),
                    })
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

                const filt = tmpdata['watched'].filter(d => 'r' in d);

                localStorage.setItem(username, JSON.stringify(tmpdata))
                data = await getStats(tmpdata)
                data['username'] = username.toLowerCase()
                if (name !== ''){data['name'] = name}
                else{data['name'] = username}
                data['ru'] = filt.length>50
                data['update'] = new Date()
                data['update'] = data['update'].toString().split("T")[0]
                localStorage.setItem(username.toLowerCase() + "_stats", JSON.stringify(data))
                window.location.pathname = import.meta.env.BASE_URL + '?username=' + username.toLowerCase()

            } catch (error) {
                console.log(error)
                data.message = "Error"
            }
            loading = false
        })
    })

</script>

<input type="file" hidden={loading}/>
<main>
    {#if loading}
        <p>Loading</p>
    {:else}
        <p>{message}</p>
    {/if}
</main>
