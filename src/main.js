//import App from './App.svelte'
import AppStats from './AppStats.svelte'
import AppYearStats from './AppYearStats.svelte'
import AppFile from './AppFile.svelte'
import './assets/css/font.css'
import './assets/css/main.css'
import './assets/css/mobile.css'

const appBaseUrl = ''
const pathSplit = window.location.href.split(import.meta.env.BASE_URL)[1].split("/")
let username = ""
let year = 0
if (pathSplit.length > 0 && pathSplit[0] !== ''){username = pathSplit[0]}
if (pathSplit.length > 1 && pathSplit[1] !== ''){year = parseInt(pathSplit[1])}

let app;
if(username !== '' && year > 0) {
  app = new AppYearStats({target: document.getElementById('app'), props: {username: username, year: year}})
}else if(username !== '') {
  app = new AppStats({target: document.getElementById('app'), props: {username: username}})
} else{
  app = new AppFile({target: document.getElementById('app')})
}
export default app;