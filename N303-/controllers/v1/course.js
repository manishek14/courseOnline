const courseModel = require("../../models/course");
const sessionModel = require("../../models/session");
const categoryModel = require("../../models/category")

exports.create = async (req, res) => {
  if (!req.files.cover || req.files.cover.length === 0) {
    return res.status(400).json({ error: 'Cover file is required' });
  }

  const {
    name,
    description,
    href,
    price,
    status,
    discount,
    categoryID,
    creator,
  } = req.body;

  const course = await courseModel.create({
    name,
    description,
    href,
    price,
    status,
    discount,
    categoryID,
    creator: req.user._id,
    cover: req.files.cover[0].filename,
  });

  const mainCourse = await courseModel
    .findById(course._id)
    .populate("creator", "-password");

  return res.status(201).json(mainCourse);
};

exports.createSession = async (req, res) => {
  if (!req.files.video || req.files.video.length === 0) {
    return res.status(400).json({ error: 'Video file is required' });
  }

  const { title, time, free } = req.body;
  const { id } = req.params;

  const session = await sessionModel.create({
    title,
    time,
    free,
    video: req.files.video[0].filename,
    course: id,
  });

  return res.status(201).json({ session });
};

exports.getSessions = async (req, res) => {
  const { id } = req.params;

  const sessions = await sessionModel.find({ course: id });

  return res.json({ sessions });
};

exports.getAllSessionInfo = async (req , res) => {
  const course = await courseModel.findOne({href : req.params.href}).lean()

  if (!course) {
    return res.status(404).json({ message: "Course not found" })
  }

  const session = await sessionModel.findOne({title : req.params.sessionID})

  const sessions = await sessionModel.find({course : course._id})

  return res.json({ session , sessions })
}

exports.rmSession = async (req , res) => {
  const { id } = req.params

  const isSession = await sessionModel.find({_id : id}).lean()

  if(isSession) {
    const deleteSession = await sessionModel.findOneAndDelete({_id : id})
    return res.json({message : "the session removed successfully."})
  } else {
    return res.status(404).json({message : "this id isnt valid"})
  }
}

exports.getCourses = async (req, res) => {
  const { href } = req.params
  const category = await categoryModel.findOne({ href })

  if(category) {
    const categoryCourses = await courseModel.find({categoryID : category._id})

    return res.json(categoryCourses)
  } else{
    return res.status(404).json({message : "category not found"})
  }
}

