const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Fullname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  coverLetter: {
    type: String,
  },
  fileURL: {
    type: String,
    // required: [true, "Resume is required"],
  },
  jobId: {
    type: Schema.Types.ObjectId, ref: 'jobs'
  },
});

const Application = mongoose.model("applications", applicationSchema)
module.exports = Application;
