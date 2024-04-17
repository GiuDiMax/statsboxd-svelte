import {baseUrl, baseUrlOld} from "./config.js"
const limit = 10

export async function addMissingData(data, username, year=0){
    //return
    if(year > 0){
        await splitPost(data['missingCrew'], "addPeople")
        localStorage.setItem(username.toLowerCase() + "_" + year.toString() + "_stats", JSON.stringify(data))
    }else {
        const missingRatings = data['missingRatings'].filter((item2) => !data['missing'].some((item1) => item1.id === item2.id))
        await Promise.all([
            splitPost(data['missing'], "addFilms"),
            splitPost(missingRatings, "addRatings"),
            splitPost(data['missingCollections'], "addCollections"),
            splitPost(data['missingCrew'], "addPeople"),
        ])
        data['missing'] = []
        data['missingRatings'] = []
        data['missingCollections'] = []
        data['missingCrew'] = []
        localStorage.setItem(username.toLowerCase() + "_stats", JSON.stringify(data))
    }
}

async function splitPost(arr, path){
    for (let i = 0; i < arr.length; i += limit) {
        postWorker(arr.slice(i, i + limit), path)
    }
}

async function postWorker(array, path){
    if(array.length === 0){return}
    return await fetch(baseUrlOld + path,
        {
            method: "POST",
            headers: {"Accept-Encoding": "br"},
            body: JSON.stringify(array)
        },
    )
}
