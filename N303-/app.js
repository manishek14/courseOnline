const express = require("express")
const app = express()
const cors = require("cors")
const helmet = require("helmet")
const path = require("path")
const authsRouter = require("./routes/v1/auth")
const usersRouter = require("./routes/v1/user")
const categoriesRouter = require("./routes/v1/category")
const coursesRouter = require("./routes/v1/course")
const commentsRouter = require("./routes/v1/comment")

app.use(express.urlencoded({ extended : false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use("/course/covers" ,express.static(path.join(__dirname , "public" , "course" , "covers")))

app.use("/v1/auth" , authsRouter)
app.use("/v1/user" , usersRouter)
app.use("/v1/category" , categoriesRouter)
app.use("/v1/course" , coursesRouter)
app.use("/v1/comment" , commentsRouter)

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({ error: err.message })
})

module.exports = app


