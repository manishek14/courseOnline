const connectDB = require("./configs/db")
const path = require ("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })

const startServer = async () => {
    await connectDB();

    const app = require("./app")

    console.log("PORT from env:", process.env.PORT, typeof process.env.PORT)
    const port = process.env.PORT || 3000

    app.get("/" , (req , res) => {
        console.log("token =>" , req.header("Authorization").split(" ")[1])
        res.json({message : "ok"})
    })

    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
}

startServer();