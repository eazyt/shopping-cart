const Product = require('../models/product');
const secret = require('../config/secret')

const mongoose = require('mongoose');

mongoose.connect(secret.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log(`succefully connected to the Database`)
  })
  .catch((e) => {
    console.log(`could not connect to database`, e)
  })

const products = [
  new Product({
  imagePath: 'http://placeimg.com/640/480/science',
  title: 'The God\'s must be Crazy',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 10.99
  }),
  new Product({
  imagePath: 'http://placeimg.com/640/480/science',
  title: 'The Avengers - Age of Ultron',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 11.99
  }),
  new Product({
  imagePath: 'http://placeimg.com/640/480/science',
  title: 'Tron',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 100.99
  }),
  new Product({
  imagePath: 'http://placeimg.com/640/480/science',
  title: 'The End Game',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 99.10
  }),
  new Product({
  imagePath: 'http://placeimg.com/640/480/science',
  title: 'The Fast and Slow',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 22.75
  }),
  new Product({
  imagePath: 'http://placeimg.com/640/480/science',
  title: 'Basic Insticnt',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 29.50
  }),
  new Product({
  imagePath: 'http://placeimg.com/640/480/science',
  title: 'Home Alone',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 19.00
  }),
  new Product({
  imagePath: 'http://placeimg.com/640/480/science',
  title: 'Planet of Apes',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 219.00
  }),
]


let done = 0;

for (let i = 0; i < products.length; i++) { 
  products[i].save(() => { 
    done++
    if (done === products.length) { 
      exit();
    }
  })
}

function exit() { 
  mongoose.disconnect();
}