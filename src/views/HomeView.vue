<template>
  <div class="home">
   <h1>Welcome {{ name }}</h1> 
   <router-link to="/about">About<br><br><br><br><br></router-link>
   <br>
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
  background-color: white;
  color: black;
}
.logout{
  color: blue;
  background-color: peru;
  padding: 10px;
}

</style>


