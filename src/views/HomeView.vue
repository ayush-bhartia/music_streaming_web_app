<template>
  <div class="home">
    <header>
      Streamusic
    </header>
    <main>
      <section class="player">
        <h2 class="song-title">{{ current.title }} - <span>{{ current.artist }}</span></h2>
      </section>
      <div class="contr">
        <button class="prev">Prev</button>
        <button class="play" v-if="!isPLaying" @click="play">Play</button>
        <button class="pause" v-else-if="isPlaying" @click="pauses">Pause</button>
        <button class="next">Next</button>
      </div>
    </main>

   <button class="aboutbutton"><router-link to="/about">About</router-link></button>
  </div>
   <button class="logout" @click="Logout">Logout</button>
</template>
<script>
import {ref, onBeforeMount} from 'vue'
import firebase from 'firebase'
export default {
  name: 'app',
  data () {
    return{
      current: {},
      index: 0,
      isPlaying: false,
      songs: [
        {
          title: 'Levitating',
          artist: 'Dua Lipa',
          src: require('../assets/levitating.mp3'),
        },
        {
          title: 'Falling',
          artist: 'Trevor Daniel',
          src: require('../assets/Falling.mp3')
        },
      ],
      player: new Audio()
      }
    },
    created () {
      this.current = this.songs[this.index];
      this.player.src = this.current.src;
    },
    methods: {
      play(song){
        if(typeof song.src != "undefined"){
        this.current = song;

        this.player.src = this.current.src;
      }

      this.player.play();
      this.isPLaying = true;
    },
    pauses() {
      this.player.pause();
      this.isPLaying = false;
    }
    },

  setup () {
    const user = firebase.auth.currentUser;
    const name = ref("");
    onBeforeMount(() => {
      if(user){
        name.value= user.email.split('@')[0];
      }
    });

    const Logout = () => {
      firebase
      .auth()
      .signOut()
      .then(()=> console.log("Signed Out"))
      .catch(err => alert(err.message));
    }
    return{
      name,
      Logout,
    }
}
}
</script>
<style scoped>
.home{
  background-color: rgb(255, 255, 255);
  /* background-image: url("../assets/loginbg.jpg"); */
  background-repeat: no-repeat;
  background-size: cover;
  /* background-color: #ccc; */
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  /* display: block; */
 /* background-color: rgba(182, 168, 145, 0.403); */
 color: rgb(255, 255, 255);
 display: inline; 
 font:100;
}
body{
  font-family: sans-serif;
}
header{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  font-family: 'Poppins', sans-serif;
  font: bolder;
  padding: 20px;
  background-color: #212121;
  color: white;
}
.logout{
  color: rgb(255, 255, 255);
  background-color: rgba(235, 74, 224, 0);
  padding: 15px;
  font-family: 'Poppins', sans-serif;
  font: bold;
  position: absolute;
  font-size: 1.1em;
  right: 5%;
  top: 1.8%;
  border-radius: 10px;
}
.box{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.logout:hover{
  background-color: rgba(0,0,255);
  transition-delay: 20ms;
  font: bolder(100px);
  color: rgb(255, 255, 255);
}
.aboutbutton{
  padding: 19px;
  height: 61px;
  background-color: rgba(235, 74, 224, 0);
  color: white;
  border-radius: 10px;
  font-size: 1.1em;
  font-family: 'Poppins', sans-serif;
  align-items: center;
  right: 100%;
  position: absolute;
  right: 10%;
  top: 1.8%;

}
.aboutbutton:hover{
  background-color: rgba(0,0,255);
  transition-delay: 20ms;
  font: bolder(100px);
  color: rgb(255,255,255);
}
.song-title{
  color: black;
}
</style>