let blurProp = document.getElementById("blurProp")
let blurOut = document.getElementById("blurOut")
let invertProp = document.getElementById("invertProp")
let invertOut = document.getElementById("invertOut")
let sepiaProp = document.getElementById("sepiaProp")
let sepiaOut = document.getElementById("sepiaOut")
let saturateProp = document.getElementById("saturateProp")
let saturateOut = document.getElementById("saturateOut")
let hueProp = document.getElementById("hueProp")
let hueOut = document.getElementById("hueOut")
let image = document.getElementById("mainImg")
const fullscreen = document.getElementById("fullscreen");

let filePath ='assets/img/img.jpg';

let i = 1;
function getFilePath(){
  let day = '';
  let date = new Date()
  if(date.getHours()>=6 && date.getHours()<12){
    day = 'morning'
  }
  else if(date.getHours()>=12 && date.getHours()<18){
    day = 'day'
  }
  else if(date.getHours()>=18 && date.getHours()<24){
    day = 'evening'
  }
  else if(date.getHours()>=0 && date.getHours()<6){
    day = 'night'
  }
  if(i<10){
    filePath = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+day+"/0"+i.toString()+".jpg";
  }
  else{
    filePath = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+day+"/"+i.toString()+".jpg";
  }
  i++
  if(i>20){
    i=1
  }
  img.src = filePath;
  img.onload = function() { 
    image.width = img.width;
    image.height = img.height;
    img.setAttribute("crossOrigin", "anonimus")
    ctx = image.getContext("2d");
    ctx.drawImage(img, 0, 0);
  }
}

function drawImage() {
  img.src = filePath;
  img.onload = function() { 
    image.width = img.width;
    image.height = img.height;
    img.setAttribute("crossOrigin", "anonimus")
    const ctx = image.getContext("2d");
    ctx.filter = `blur(${(blurProp.value*3)}px) invert(${invertProp.value}%) sepia(${sepiaProp.value}%) saturate(${saturateProp.value}%) hue-rotate(${hueProp.value}deg)`;
    console.log(ctx.filter);
    ctx.drawImage(img, 0, 0);
  };  
}

let img = new Image();
console.log(  document.getElementById("btnLoad").files[0])
drawImage();
console.log(image.dataset)

/*reset*/
document.getElementById("reset").addEventListener("mousedown", function(){
  document.getElementById("reset").classList.add("btn-active")
  document.getElementById("save").classList.remove("btn-active")
  document.getElementById("next").classList.remove("btn-active")
  blurProp.value = 0;
  invertProp.value = 0;
  sepiaProp.value = 0;
  saturateProp.value = 100;
  hueProp.value = 0;
  blurOut.value = 0;
  invertOut.value = 0;
  sepiaOut.value = 0;
  saturateOut.value = 100;
  hueOut.value = 0;
  image.style = "";
})

/*next*/
document.getElementById("next").addEventListener("mousedown", function(){
  document.getElementById("next").classList.add("btn-active")
  document.getElementById("reset").classList.remove("btn-active")
  document.getElementById("save").classList.remove("btn-active")
  getFilePath()
})

/*load*/
document.getElementById("btnLoad").addEventListener("change", function() {
  const file = document.getElementById("btnLoad").files[0];
  const reader = new FileReader();
  reader.onload = () => {
    filePath = reader.result;
    img.src = filePath;
    img.onload = function() { 
      image.width = img.width;
      image.height = img.height;
      img.setAttribute("crossOrigin", "anonimus")
      ctx = image.getContext("2d");
      ctx.drawImage(img, 0, 0);
    }
  }
  reader.readAsDataURL(file);
  document.getElementById("btnLoad").files[0] = '';
  console.log(document.getElementById("btnLoad").files[0])
});

/*save*/
document.getElementById("save").addEventListener("mousedown", function(){
  document.getElementById("save").classList.add("btn-active")
  document.getElementById("reset").classList.remove("btn-active")
  document.getElementById("next").classList.remove("btn-active")
  drawImage();
  setTimeout(function(){
    var link = document.createElement('a');
    link.download = 'Redactered picture';
    link.href = image.toDataURL("image/png");
    link.click();
    link.delete;
    img.src = filePath;
    img.onload = function() { 
      image.width = img.width;
      image.height = img.height;
      img.setAttribute("crossOrigin", "anonimus")
      ctx = image.getContext("2d");
      ctx.drawImage(img, 0, 0);
      // if(image.style[0]==="b"){
      //   image.style="blur("+ (blurProp.value) +"px)";
      // }
    };  
  }, 500)
})
image.addEventListener("mousedown", (e) =>{
  drawImage()
})

/////////////////////
/*props*/
function blurChange(){
  blurOut.value = blurProp.value;
  image.style.setProperty('--blur', blurProp.value+'px');
}

function invertChange(){
  invertOut.value = invertProp.value;
  image.style.setProperty('--invert', invertProp.value+'%');
}

function sepiaChange(){
  sepiaOut.value = sepiaProp.value;
  image.style.setProperty('--sepia', sepiaProp.value+'%');
}

function saturateChange(){
  saturateOut.value = saturateProp.value;
  image.style.setProperty('--saturate', saturateProp.value+'%');
}

function hueChange(){
  hueOut.value = hueProp.value;
  image.style.setProperty('--hue', hueProp.value+'deg');
}

/*fullscreen*/
fullscreen.addEventListener("mousedown", function(){
  if(document.fullscreenElement){
      document.exitFullscreen()
  }
  else{
      document.documentElement.requestFullscreen();
  }
})
