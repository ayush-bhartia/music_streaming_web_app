<template>
    <div class="register">
        <h1>Register</h1>
         <form @submit.prevent="Register">   
  <input  class="xyz" type="text" placeholder="Email" v-model="email"/><br>
  <input type="password" placeholder="Password" v-model="password"/><br>
  <input type="submit" value="Register" />
  <p>
    Have an Account
    <router-link to="/login">Login Here</router-link>
  </p>
</form>
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
    margin: 5px;
    width: 100px;
    border-radius: 20px;
}
</style>