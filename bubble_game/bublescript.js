
document.addEventListener("DOMContentLoaded", function() {
    var scor=0;

function make(){
    var cir="";
    for (var i=0;i<90;i++){
        var rr=Math.floor(Math.random()*15);
    cir+=`<div class="bubl">${rr}</div>`;
    }
    document.querySelector(".bubt").innerHTML=cir;
    
}


function tim(){
    var ti=30;
    tir= setInterval(function ff(){
        
    if(ti>0){
        ti--;
        document.querySelector("#timr").innerHTML=ti;
    }
    else{
        clearInterval(tir);
        var buble=document.querySelector(".bubt");
        var scoreContent = document.querySelector("#scr").innerHTML;

var styledText = '<span class="styled-text">GAME OVER 😁👌</span> ' ;
buble.innerHTML = styledText;
        
    }

},1000);
}

function newhit(){
  var rr=Math.floor(Math.random()*10);
            document.querySelector("#hiti").innerHTML=rr;
 }

 function score(time){
   
    //alert(time);
    if(time<3)
   scor+=30;
else if(time<5)
scor+=20;
else 
scor+=10;

document.querySelector("#scr").innerHTML=scor;

document.querySelector("#scoredis").textContent=scor;
var pl=document.querySelector("#scoredis");




gsap.set(pl, {
    opacity: 0, 
    y: 0  
});

animation=gsap.to(pl, {
    opacity: 2,
    y: -500,
    duration: 2,
    overwrite: "auto",
    //repeat:-1
    
  });

   
 }


function fg(){
var buble=document.querySelector(".bubt");
let lastClickTime = Date.now();
buble.addEventListener("click", function(dets)
{
    
if(dets.target.innerHTML==document.querySelector("#hiti").innerHTML){

    const currentTime = Date.now();

    
        const timeDuration = currentTime - lastClickTime;
        score(timeDuration/1000);
   

    lastClickTime = currentTime;

newhit();
make();
}

});
}

tim();
newhit();
make();
fg();








});