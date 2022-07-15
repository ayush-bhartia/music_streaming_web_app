import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'


const firebaseConfig = {
    apiKey: "AIzaSyAbfSr7-u8ljrGKViIqrRAXHcNKOLL_HsU",
    authDomain: "music-streaming-web-app.firebaseapp.com",
    databaseURL: "https://music-streaming-web-app-default-rtdb.firebaseio.com",
    projectId: "music-streaming-web-app",
    storageBucket: "music-streaming-web-app.appspot.com",
    messagingSenderId: "733344846554",
    appId: "1:733344846554:web:b8a84b531069bd57064be3",
    measurementId: "G-0ZNQ1ZJK3P"
  };

  firebase.initializeApp(firebaseConfig);

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

export const firestore = firebase.firestore();


export default firebase;

