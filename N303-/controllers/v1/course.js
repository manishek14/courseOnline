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
