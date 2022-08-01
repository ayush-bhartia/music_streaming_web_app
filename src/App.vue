<template>   
 <musicplayer />
</template>

<script>
import { onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import firebase from 'firebase'
import musicPlayer from './components/musicplayer.vue';

export default {
  name: "App",
  components: {
    musicPlayer,
},
  setup() {
    const router = useRouter();
    const route = useRoute();
    onBeforeMount(() => {
          firebase.auth().onAuthStateChanged((user) => {
            if(!user){
              router.replace('/login');              
            }else if (route.path == "/login" || route.path == "/register"){
              router.replace('/');
            }
          })
    });
  },
}
</script>

<style lang="scss">
body{
  margin: 0px;
  padding: 0px;
  color: #fff;
}
.login{
  display: block;
  background-color: #2c3e50 ;
  color: #42b983;
}
.register{
  display: flex;
  flex-direction: column;
}
.about{
  background-color: black ;
  color: purple;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a{
  color: inherit;
}

nav {
  padding: 20px;
  background-color: black;
} 

 nav a {
  font-weight: bold;
  color: #2c3e50;
} 

nav a.router-link-exact-active {
  color: #42b983;
} 
</style>
