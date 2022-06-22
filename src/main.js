import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbfSr7-u8ljrGKViIqrRAXHcNKOLL_HsU",
  authDomain: "music-streaming-web-app.firebaseapp.com",
  projectId: "music-streaming-web-app",
  storageBucket: "music-streaming-web-app.appspot.com",
  messagingSenderId: "733344846554",
  appId: "1:733344846554:web:b8a84b531069bd57064be3",
  measurementId: "G-0ZNQ1ZJK3P"
};
const app = initializeApp(firebaseConfig);
createApp(App).use(store).use(router).mount('#app')
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// Code from dev.to 
let provider = new firebase.auth.GoogleAuthProvider();
firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
            console.log(token) // Token
            console.log(user) // User that was authenticated
        })
        .catch((err) => {
          console.log(err); // This will give you all the information needed to further debug any errors
        });
        firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Successfully signed out.");
        });
        
      
        