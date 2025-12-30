const { connect } = require("mongoose")
require("dotenv").config({ path: "./.env" })

const run = async () => {
  await connect("mongodb://localhost:27017/courseOnline");
  console.log("Connected to myDB");
}

run()
.catch((err) => console.error(err))