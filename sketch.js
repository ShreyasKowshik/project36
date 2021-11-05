var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var fedtime,lastfed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,550);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedFood=createButton("Eat Food");
  feedFood.position(700,95);
  feedFood.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

fedtime=database.ref("FeedTime")
  fedtime.on("value",function(data){
    lastfed=data.val()
  })
 
textSize(25)
fill("yellow")
text("lastfed:"+lastfed,350,30)
 
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodStockVal=foodObj.getFoodStock()
if(foodStockVal<=0){
  foodObj.updateFoodStock(foodStockVal*0)
}
else{foodObj.updateFoodStock(foodStockVal-1)}

database.ref("/").update({
  FeedTime:hour(),
  Food:foodObj.getFoodStock()
})

}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}