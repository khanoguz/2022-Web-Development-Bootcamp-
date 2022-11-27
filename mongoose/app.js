const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  // connect to database
  await mongoose.connect('mongodb://127.0.0.1/fruitsDB');
  console.log("Connected");
}

const fruitSchema = new mongoose.Schema({
  name: {
    required: [true,"You have to enter a name!"],
    type: String
  },
  rating: {
    type: Number,
    min:1,
    max:10
  },
  review: String
})

const peopleSchema = new mongoose.Schema({
  name:String,
  age:Number,
  favoriteFruit: fruitSchema
})

const Fruit = mongoose.model("Fruit", fruitSchema);
const People = mongoose.model("People", peopleSchema);

// const fruit = new Fruit({
//   name:"Apple",
//   rating: 7,
//   review: "Pretty solid fruit"
// });

//check validation
// const fruit = new Fruit({
//   rating: 7,
//   review: "Pretty solid fruit"
// });

// creates new fruit every run this line
//fruit.save()
const people = new People({
  name:"John",
  age:37
});
//people.save()
// const kiwi = new Fruit({
//   name:"Kiwi",
//   rating:10,
//   review:"Amazing fruit"
// });
//
// const orange = new Fruit({
//   name:"Orange",
//   rating:4,
//   review:"Meh"
// });
//
// const banana = new Fruit({
//   name:"Banana",
//   rating:3,
//   review:"weird taste"
// });

const newFruit = new Fruit({
  name: "Pinapple",
  rate:5,
  review: "not bad, not the best"
})
//newFruit.save()
const person = new People({
  name:"Oguz Kagan",
  age:26,
  favoriteFruit: newFruit
})

const johnsFruit = new Fruit({
  name:"Cherry",
  rate:9,
  review: "Johny dog loves it!"
})
johnsFruit.save();
People.updateOne({name:"John"},{favoriteFruit:johnsFruit},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully updated the doc");
  }
})
//person.save()
//Fruit.insertMany([kiwi, orange, banana], function(err){
  //if (err){
    //console.log(err);
  //}
  //else{
    //console.log("Successfully saved all the fruits to fruitsDB");
  //}
//})

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }
  else{
    //for(var i=0;i<fruits.length;i++){
      //console.log(fruits[i].name);
    //}

    mongoose.connection.close()
    fruits.forEach(function(ff){
      console.log(ff.name);
    })
  }
})
//
// Fruit.updateOne({_id: "63825e74dffb469108380155" }, {name:"Peach"}, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully updated the document");
//   }
// })
//
// Fruit.deleteOne({name:"Peach"}, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully deleted the doc");
//   }
// })
//
// People.deleteMany({name:"Oguz"}, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully deleted all of them");
//   }
// })
