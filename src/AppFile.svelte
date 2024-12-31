<script>
    import {onMount} from 'svelte'
    import jszip from "jszip"
    import PapaParse from "papaparse"
    import { baseUrl } from './config.js'
    import Dropzone from "svelte-file-dropzone";

    let loading = true
    let data = {}
    let tmpdata = {}
    let message = ""
    let selectedFile = undefined

    function handleFilesSelect(e) {
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

            tmpdata['username'] = username.toLowerCase()
            if (name !== ''){tmpdata['name'] = name}
            else{tmpdata['name'] = username}
            tmpdata['ru'] = filt.length>50
            tmpdata['update'] = new Date()
            tmpdata['update'] = tmpdata['update'].toString().split("T")[0]
            localStorage.setItem(username.toLowerCase(), JSON.stringify(tmpdata))

            data = await getStats(tmpdata)
            data['username'] = tmpdata['username']
            data['name'] = tmpdata['name']
            data['ru'] = tmpdata['ru']
            data['update'] = tmpdata['update']
            data['donator'] = false
            tmpdata['yearsStats'] = data['yearsStats']
            message = ""
            localStorage.setItem(username.toLowerCase(), JSON.stringify(tmpdata))
            localStorage.setItem(username.toLowerCase() + "_stats", JSON.stringify(data))
            localStorage.setItem("latest", username.toLowerCase())
            window.location.search = '?username=' + username.toLowerCase();

        } catch (error) {
            console.log(error)
            selectedFile = undefined
            message = "There is an error in the file you chose, make sure you have uploaded a file in .zip format. <br/>" +
                "If the problem continues contact me on <a href='https://t.me/giudimax' target='_blank'>telegram" +
                " and send me your zip file</a><br/>"
        }
       loading = false
    }

    onMount(async () => {
        const localStorageData = localStorage.getItem("latest")
        if(localStorageData !== null && localStorageData !== "undefined") {
            window.location.search = '?username=' + localStorageData.toLowerCase();
        }else{loading = false}
    })

</script>


<main>
    {#if loading}
        <div class="loaderContainer2"><div class="loader2"></div></div>
    {/if}
    <div class="fileUploadContainer">
    <img class="logo" src="images/logo.webp" alt="statsboxd logo">
    {#if selectedFile !== undefined }
        <div class="confirmationBox">
            <p>Selected File:</p>
            <p class="high">{selectedFile.name}</p>
            <a type="button" class="btn" on:click={setFile} href="#">Click here to confirm</a>
        </div>
    {:else}
        <p>
            Welcome to Statsboxd, to get your stats please export your data from Letterboxd
            (<a href="https://letterboxd.com/data/export/?fromApp=false" target="_top">or click here</a>) and upload the zip file.<br />
        </p>
        {#if message !== ''}<p class="errormsg message">{@html message}</p>{/if}
        <Dropzone on:drop={handleFilesSelect} containerClasses="fileUpload"/>
        <p>
            If you like the project consider to <a target="_blank" href="//buymeacoffee.com/giudimax">supporting me</a> and/or
            <a target="_blank" href="//github.com/GiuDiMax/statsboxd-svelte">collaborating on the public repository</a>
            <br />
        </p>
        <br/>
        <strong style="display:none">Supporters features:</strong>
        <ul style="line-height: 1.5em; display:none">
            <li>Stats without zip file using statsboxd.top?username=username&donator;</li>
            <li>Share your stats;</li>
            <li>Technical support;</li>
            <li>Contact me after making a donation by writing your username.</li>
        </ul>
    {/if}
    </div>
</main>
