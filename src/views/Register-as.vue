<template>
    <div class="register">
        <div class="box">
        <h1 class="header">Register</h1>
         <form @submit.prevent="Register">   
  <input  class="xyz" type="text" placeholder="Email" v-model="email"/><br>
  <input class="xyz" type="password" placeholder="Password" v-model="password"/><br>
  <input type="submit" class="buttonreg" value="Register" />
  <p><strong>Have an Account ?&nbsp;&nbsp;&nbsp;&nbsp;</strong>
    
    <router-link to="/login"><strong>Login Here</strong></router-link>
  </p>
</form>
</div>
    </div>
</template>

<script>
import firebase from 'firebase';
import {ref} from 'vue';

export default{
    setup() {
        const email = ref("");
        const password = ref("");
        
        const Register = () => {
            firebase 
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(user => {
                alert(user);
            })
            .catch(err => alert(err.message));
        }
         return{
            Register,
            email,
            password
         }
    }

}
</script>

<style>
.register{   
    background-image: url("../assets/loginbg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ccc;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  /* display: block; */
 background-color: rgba(182, 168, 145, 0.403);
 color: white;
}
.xyz{
    padding: 5px;
    margin: 6px;
    width: 300px;
    height: 35px;
    border-radius: 15px 0px;
    background-color: beige;
    font-size: 20px;
}
.header{
    font-size: 50px;
    font-family: 'Times New Roman', Times, serif;
}
.box{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 2px solid red;
    padding: 2%;
    border-radius: 5px 0px;
    backdrop-filter: blur(5px);
}
.buttonreg{
    padding: 15px;
    width: 95%;
    margin: 10px;
    border-radius: 10px 0px;
    font-size: 20px;
    background-color: aqua;
}
.buttonr:hover{
    background-color: beige;
}
</style>