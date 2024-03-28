<script>
    import {onMount} from 'svelte'
    import SharedPage from "./page.svelte"
    import jszip from "jszip"
    import PapaParse from "papaparse"
    import { baseUrl } from './config.js'

    import Dropzone from "svelte-file-dropzone";

    let loading = false
    let data = {}
    let tmpdata = {}
    let file
    let jsonData
    let message = ""

    //let files = {accepted: [], rejected: []}
    let selectedFile = undefined

    function handleFilesSelect(e) {
        //const { acceptedFiles, fileRejections } = e.detail;
        //files.accepted = [...files.accepted, ...acceptedFiles];
        //files.rejected = [...files.rejected, ...fileRejections];
        console.log(e)
        selectedFile = e.detail.acceptedFiles[0]
    }


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

    async function setFile(){
        loading = true
        try {
            const zip = await jszip.loadAsync(selectedFile)
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

            localStorage.setItem(username.toLowerCase(), JSON.stringify(tmpdata))
            data = await getStats(tmpdata)
            data['username'] = username.toLowerCase()
            if (name !== ''){data['name'] = name}
            else{data['name'] = username}
            data['ru'] = filt.length>50
            data['update'] = new Date()
            data['update'] = data['update'].toString().split("T")[0]
            message = ""
            localStorage.setItem(username.toLowerCase() + "_stats", JSON.stringify(data))
            window.location.pathname = import.meta.env.BASE_URL + '?username=' + username.toLowerCase()

        } catch (error) {
            selectedFile = undefined
            message = "There is an error in the file you chose, make sure you have uploaded a file in .zip format. <br/>" +
                "If the problem continues contact me on <a href='https://t.me/giudimax' target='_blank'>telegram" +
                " and send me your zip file</a><br/>"
        }
       loading = false
    }


    onMount(async () => {

    })

</script>


<main>
    {#if loading}
        <div>Loading</div>
    {/if}
    <div class="fileUploadContainer">
    <img class="logo" src="images/logo.webp" alt="statsboxd logo">
    {#if selectedFile !== undefined }
        <div class="confirmationBox">
            <p>Selected File:</p>
            <p class="high">{selectedFile.name}</p>
            <p>Click the button below to confirm</p>
            <a on:click={setFile} class="icon" href="#"><span class="material-symbols-outlined">check_circle</span></a>
        </div>
    {:else}
        <p>
            Welcome to Statsboxd, to get your stats please export your data from Letterboxd
            (<a href="https://letterboxd.com/data/export/">or click here</a>) and upload the zip file.<br />
            If you are a supporter user you can access the old version at <a href="//legacy.statsboxd.top">legacy.statsboxd.top</a>
        </p>
        {#if message !== ''}<p class="message">{@html message}</p>{/if}
        <Dropzone on:drop={handleFilesSelect} containerClasses="fileUpload"/>
    {/if}
    </div>
</main>
