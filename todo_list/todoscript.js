 
 
 //document.addEventListener("DOMContentLoaded", function() {
    var inp=document.getElementById("input");
    let item=document.getElementById("item");
    function add(){

    if(inp.value === ''){
        alert("enter Task");
        
    }
    else{
        let li=document.createElement("li");
        li.innerHTML=input.value;
        li.classList.add("list-item");
        item.appendChild(li);
        inp.value='';
    
    let span =document.createElement("span");
    span.innerHTML="\u00d7";
    
    
    li.appendChild(span);
    saveData();
    }
 }

 item.addEventListener("click",function(dets){
     if(dets.target.tagName=="LI"){
        dets.target.classList.toggle("checked");
        saveData();
     }
     else if(dets.target.tagName=="SPAN"){
        dets.target.parentElement.remove();
        saveData();
     }
 },false);

 function saveData(){
    localStorage.setItem("data",item.innerHTML);
 }
 function showTask(){
    item.innerHTML=localStorage.getItem("data");
 }
showTask();
//});
