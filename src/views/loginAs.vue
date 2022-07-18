<template>

  <div class="login">
    <div class="box">
   <h1 id="h1">Login</h1>    
   <form @submit.prevent="Login">   
  <input class="email" type="text" placeholder="Email" v-model="email"/><br>
  <input class="email" type="password" placeholder="Password" v-model="password"/><br>
  <input class="button" type="submit" value="Login" />
  <p id="text"><strong>Sign In With Google</strong>
     <br><br>
    <button @click="socialLogin" class="socialbutton">
    <img src="../assets/googlelogo.png" alt="Google Logo">
    </button>
  </p>
  <p id="need"><strong>Need an Account ?</strong> &nbsp;&nbsp;&nbsp;<router-link to="/register"><strong>Register</strong></router-link></p>
</form>
</div>
  </div>
</template>


<script>
import {ref} from 'vue';
import firebase from 'firebase';
// import { useRouter } from 'vue-router';

export default {
    setup(){
        const email = ref("");
        const password = ref("");

        const Login= () => {
            firebase
            .auth()
            .signInWithEmailAndPassword(email.value,password.value)
            .then(data => console.log(data))
            .catch(err => alert(err.message)); 
        }

        return{
            Login,
            email,
            password
        }

    },
    methods: {
      socialLogin(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(()=>{
          this.$router.replace('home');
        }).catch((err) => {
          alert('Oops. ' + err.message)
        });
      }
    }
}
</script>
<style scoped>
.login{
  background-image: url("../assets/loginbg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ccc;
  align-items: center;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  /* display: block; */
 background-color: rgba(182, 168, 145, 0.403);
 color: white; 
 font:100;
}
.email{
  padding: 10px;
  margin: 5px;
  border-radius: 10px 0px;
  font-size: 20px;
  background-color: beige;  width: 100%;
}
img{
  opacity: 1.0;
}
#need{
    color: rgb(255, 255, 255);
    font-size: 20px;
}
#text{
  font-size: x-large;
}
#h1{
  font-size: 50px;
  font-family: 'Times New Roman', Times, serif;
  color: rgba(62, 130, 255, 0.9);
}
.box{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  align-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  border: 2px solid red;
  border-radius: 50px;
  padding: 3%;
}
.button{
  padding: 10px;
  /* width: 100px; */
  margin: 5px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgb(235, 74, 224,0.1);
  color: rgb(236, 236, 236);
  font-family: sans-serif;
  font: bold;
  font-size: x-large ;  
  width: 107%;
  left: -100%;
}
.button:hover{
  background-color: rgb(0, 0, 255);
  transition-delay: 20ms;
}
.socialbutton{
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  outline:0;
  border:0;
}
.socialbutton:active{
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
}
.socialbutton img {
  width:100%;
}
</style>
