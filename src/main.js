import App from './App.svelte'
import AppFile from './AppFile.svelte'
import './assets/css/font.css'
import './assets/css/main.css'
import './assets/css/mobile.css'

const appBaseUrl = '';
const pathname = window.location.pathname
    .split(import.meta.env.BASE_URL.replace("/",""))[1]
    .replace("/","")

let app;
if (pathname === '') {
  app = new AppFile({
    target: document.getElementById('app'),
  });
} else {
  app = new App({
    target: document.getElementById('app'),
  });
}

export default app;