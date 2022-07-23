<template>
  <div class="home">
    <header>
      Streamusic
    </header>
    <main>
      <section class="player">
        <h2 class="song-title">{{ current.title }} - <span>{{ current.artist }}</span></h2>
      </section>
      <div class="controls">
        <button class="prev" @click="prev">Prev</button>
        <button class="play" v-if="!isPlaying" @click="play">Play</button>
        <button class="pause" v-else @click="pause">Pause</button>
        <button class="next" @click="next">Next</button>
      </div>
      <section class="playlist">
        <h3>My Playlist</h3>
        <button v-for="song in songs" :key="song.src" @click="play(song)" :class="(song.src === current.src) ? 'song playing' : 'song'">
        {{ song.title }}-{{ song.artist }}
        </button>
      </section>      
    </main>

   <button class="aboutbutton"><router-link to="/about">About</router-link></button>
   <!-- ---- -->
   <!-- <div id="control-panel">
        <input type="checkbox" id="trail" name="trail" checked />
        <button id="clear">Clear</button>
        </div>
        <canvas id="c"></canvas> -->
   <!-- -------- -->
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
      this.player.addEventListener('ended', function(){
        this.index++;
        if(this.index > this.songs.length-1){
        this.index=0;
        }

      }.bind(this))
      this.isPlaying = true;
    },
    pause() {
      this.player.pause();
      this.isPlaying = false;
    },
    prev(){
      this.index--;
      if(this.index < 0){
        this.index=this.songs.length - 1;
      }
      this.current= this.songs[this.index];
      this.play(this.current);

    },
    next(){
      this.index++;
      if(this.index > this.songs.length-1){
        this.index=0;
      }
      this.current= this.songs[this.index];
      this.play(this.current);
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
},
}
// --------
// window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

// document.onselectstart = function() {
//   return false;
// };
// var c = document.getElementById('c');
// var ctx = c.getContext('2d');
// var dpr = window.devicePixelRatio;
// var cw = window.innerWidth;
// var ch = window.innerHeight;
// c.width = cw * dpr;
// c.height = ch * dpr;
// ctx.scale(dpr, dpr);
// var rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);}
// ctx.lineCap = 'round';
// var orbs = [];
// // var orbCount = 30;
// // var radius;

// var trailCB = document.getElementById('trail');
// var trail = trailCB.checked;
// var clearer = document.getElementById('clear');

// function createOrb(mx,my){
//   var dx = (cw/2) - mx;
// 	var dy = (ch/2) - my;
// 	var dist = Math.sqrt(dx * dx + dy * dy);
// 	var angle = Math.atan2(dy, dx);
// 	orbs.push({
// 		x: mx,
// 		y: my,
// 		lastX: mx,
// 		lastY: my,
// 		hue: 0,
// 		colorAngle: 0,
// 		angle: angle + Math.PI/2,
// 		//size: .5+dist/250,
// 		size: rand(1,3)/2,
// 		centerX: cw/2,
// 		centerY: ch/2,		
// 		radius: dist,
// 		speed: (rand(5,10)/1000)*(dist/750)+.015,
// 		alpha: 1 - Math.abs(dist)/cw,
// 		draw: function() {			
// 			ctx.strokeStyle = 'hsla('+this.colorAngle+',100%,50%,1)';	
// 			ctx.lineWidth = this.size;			
// 			ctx.beginPath();
// 			ctx.moveTo(this.lastX, this.lastY);
// 			ctx.lineTo(this.x, this.y);
// 			ctx.stroke();
// 		},	
// 		update: function(){
// 			var mx = this.x;
// 			var my = this.y;	
// 			this.lastX = this.x;
// 			this.lastY = this.y;
// 			var x1 = cw/2;
// 			var y1 = ch/2;
// 			var x2 = mx;
// 			var y2 = my;		
// 			var rise = y1-y2;
// 			var run = x1-x2;
// 			var slope = -(rise/run);
// 			var radian = Math.atan(slope);
// 			var angleH = Math.floor(radian*(180/Math.PI));		
// 			if(x2 < x1 && y2 < y1){angleH += 180;}		
// 			if(x2 < x1 && y2 > y1){angleH += 180;}		
// 			if(x2 > x1 && y2 > y1){angleH += 360;}		
// 			if(y2 < y1 && slope =='-Infinity'){angleH = 90;}		
// 			if(y2 > y1 && slope =='Infinity'){angleH = 270;}		
// 			if(x2 < x1 && slope =='0'){angleH = 180;}
// 			if(isNaN(angleH)){angleH = 0;}
			
// 			this.colorAngle = angleH;
// 			this.x = this.centerX + Math.sin(this.angle*-1) * this.radius;
// 			this.y = this.centerY + Math.cos(this.angle*-1) * this.radius;
// 			this.angle += this.speed;
		
// 		}
// 	});
// }

// function orbGo(e){
// 	var mx = e.pageX - c.offsetLeft;
// 	var my = e.pageY - c.offsetTop;		
// 	createOrb(mx,my);
// }

// function turnOnMove(){
// 	c.addEventListener('mousemove', orbGo, false);	
// }

// function turnOffMove(){
// 	c.removeEventListener('mousemove', orbGo, false);	
// }

// function toggleTrails(){
// 	trail = trailCB.checked;
// }

// function clear(){
//  orbs = []; 
// }

// c.addEventListener('mousedown', orbGo, false);
// c.addEventListener('mousedown', turnOnMove, false);
// c.addEventListener('mouseup', turnOffMove, false);
// trailCB.addEventListener('change', toggleTrails, false);
// clearer.addEventListener('click', clear, false);

// var count = 100;
// while(count--){
// 		createOrb(cw/2, ch/2+(count*2));
// }

// var loop = function(){
//   window.requestAnimFrame(loop);
// 	if(trail){
// 		ctx.fillStyle = 'rgba(0,0,0,.1)';
// 		ctx.fillRect(0,0,cw,ch);
// 	} else {
// 		ctx.clearRect(0,0,cw,ch);
// 	}
// 	var i = orbs.length;
// 	while(i--){	
// 		var orb = orbs[i];	
// 		var updateCount = 3;
// 		while(updateCount--){
// 		orb.update();		
// 		orb.draw(ctx);
// 		}
		
// 	}
// }            
// loop();
</script>
<style scoped>
.home{
  /* background-color: rgb(0, 0, 0); */
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
   background: #000;  /*extra*/
   color: #aaa;  /*extra*/
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
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}
.song-title span {
  font-weight:400;
  font-style: italic;
}
.controls{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
}
button{
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}
.button:hover{
  opacity: 0.8;
}
.play, .pause{
  font-size: 20px;
  font-weight: 700;
  padding: 15px 25px;
  margin: 0px 15px;
  border-radius: 8px;
  color: white;
  background-color: rgb(255, 97, 97);
}
.next, .prev{
 font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  margin: 0px 15px;
  border-radius: 6px;
  color: white;
  background-color: rgba(255, 62, 62, 0.718);
}
main{
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 25px;
}
.playlist h3 {
  color: black;
  padding: 0px 30px;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
}
.playlist .song {
  display: block;
  width: 100%;
  padding: 15px;
  margin: 20px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  /* background-color: aqua; */
}
.playlist .song:hover{
  color: #FF5858;
}
.playlist .song.playing {
  color: #FFF;
  background-image: linear-gradient(to right, #CC2E5D, #FF5858);
}
/* ---- */
/* canvas {
    display: block;
    height: 100%;
    left: 0;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    width: 100%
  }
  
   #control-panel {
    background: rgba(0,0,0,.75);
    border: 1px solid #333;
    left: 20px;
    padding: 10px 15px;
    position: absolute;
    top: 20px;
    z-index: 2;
  }  
  #clear {
    display: block; 
    margin: 10px 0 5px;
    color: white;
  }   */
</style>