<template>
  <div class="home">
    <div class="box">
   <h1>Welcome {{ user }}</h1> 
   <router-link to="/about">About<br><br><br><br><br></router-link>
   <br>
  </div>
   <button class="logout" @click="Logout">Logout</button>
  </div>
</template>

<script>
import {ref, onBeforeMount} from 'vue'
import firebase from 'firebase'
export default {
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
      Logout
    }
  }
}
</script>
<style scoped>
.home{
  /* background-color: rgb(236, 127, 127);
  color: black; */
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
 color: rgb(237, 16, 16);
 display: inline; 
 font:100;
}
.logout{
  color: rgb(97, 97, 200);
  background-color: rgba(235, 74, 224, 0);
  padding: 15px;
  font-family: 'Poppins', sans-serif;
  font: bold;
  color: black;
  position: absolute;
  font-size: 1.1em;
  right: 5%;
  top: 5%;
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
</style>


