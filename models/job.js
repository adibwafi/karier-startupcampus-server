const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  requirement: {
    type: String,
    required: [true, "Requirement is required"],
  },
  jobType: {
    type: String,
    required: [true, "Job-type is required"],
  },
  is_active: {
    type: Boolean,
    default: true
  },
  applications: [{ type: Schema.Types.ObjectId, ref: 'applications' }],
});

const Job = mongoose.model("jobs", jobSchema)
module.exports = Job;
