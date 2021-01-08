require('dotenv').config()

module.exports = {

  database: process.env.DB_URI,
  port: process.env.PORT,
  secretKey: process.env.SECRET,
  stripePublishableKey: process.env.STRIPE_PUB,
  stripeSecretKey: process.env.STRIPE_CERT
}
