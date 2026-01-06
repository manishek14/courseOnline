const courseModel = require("../../models/course");
const sessionModel = require("../../models/session");

exports.create = async (req, res) => {
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
    cover: req.file.filename,
  });

  const mainCourse = await courseModel
    .findById(course._id)
    .populate("creator", "-password");

  return res.status(201).json(mainCourse);
};

exports.createSession = async (req, res) => {
  const { title, time, free } = req.body;
  const { id } = req.params;

  const session = await sessionModel.create({
    title,
    time,
    free,
    video: req.file.filename,
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
  const course = await courseModel.findOne({href : req.params.herf}).lean()

  const session = await sessionModel.findOne({_id : req.params.sessionID})

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

