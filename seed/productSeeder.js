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
  imagePath: 'https://images.app.goo.gl/pCSLqMQj2yAPwGdx6',
  title: 'The God\'s must be Crazy',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 10.99
  }),
  new Product({
  imagePath: 'https://images.app.goo.gl/P5sR5n57bJ4SSBZB9',
  title: 'The Avengers - End Game',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 101.99
  }),
  new Product({
  imagePath: 'https://images.app.goo.gl/NL7yW7kiHZUZijqD9',
  title: 'Tron',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 100.99
  }),

  new Product({
  imagePath: 'https://images.app.goo.gl/TQ5epJo6LEUyN3dP9',
  title: 'Infinity',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 22.75
  }),

  new Product({
  imagePath: 'https://images.app.goo.gl/1H4m5bBycJCmFCGT6',
  title: 'The Martian',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 19.00
  }),


  new Product({
  imagePath: 'https://images.app.goo.gl/nQikXeZH5hfmsqEY6',
  title: 'Gladiator',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 1899.00
  }),







  new Product({
  imagePath: 'https://images.app.goo.gl/nWMvPqbrQ7Eupp9r6',
  title: 'Clash of the Titans',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis consequuntur laborum, qui beatae nostrum cumque optio illo facilis rem quas voluptates quia, necessitatibus aut sapiente rerum. Animi, reprehenderit deleniti?',
  price: 2139.00
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