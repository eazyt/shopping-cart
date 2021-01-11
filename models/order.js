var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cart: {
    type: Object,
    // required: true
  },
  name: {
    type: String,
    // required: true
  },
  paymentId: {
    type: String,
    // required: true
  },
  street:{ type: String
},
  city:{ type: String
},
  zip_code:{ type: String
},
  state:{ type: String
},
  country:{ type: String
},

});

module.exports = mongoose.model('Order', schema);