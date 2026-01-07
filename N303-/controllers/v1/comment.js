const commentsModel = require("../../models/comment")
const coursesModel = require("../../models/course")

exports.createComment = async (req , res) => {
    const { body , courseHref } = req.body

    const course = await coursesModel.findOne({href : courseHref}).lean()

    const comment = await commentsModel.create({
        body,
        course : course._id,
        creator : req.user._id,
        isAccept : 0,
        isAnswer : 0
    })
    return res.status(201).json({message : "comment created successfully"})
}

