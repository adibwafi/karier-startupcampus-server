const express = require("express");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const UploadApiResponse = require("cloudinary").v2;
const fs = require("fs");
const Application = require("../models/application");
const Job = require("../models/job");
require("dotenv").config();

class ControllerApplication {
  //POST APPLICATION
  static async addApplication(req, res, next) {
    try {
      
      let { id } = req.params;
      const findJob = await Job.findOne({ _id: id });
      if (!findJob) {
        throw { name: "DATA_NOT_FOUND", params: "Job" };
      }
      // const { fullName, email, phoneNumber, fileURL, jobId, coverLetter } = req.body;
      // if (!fullName || !email || !phoneNumber || !fileURL) {
      //   throw { name: `BADREQUEST` };
      // }
      if (!req.file) return res.send('Please upload a file')

      // const dataBuffer = fs.readFileSync(req.file.path);
      let uploadedFile = UploadApiResponse;

      // upload Multer
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Resume",
        resource_type: "auto",
        access_mode: "public",
        access_type: "anonymous"
      });

      const { secure_url } = uploadedFile;
      // console.log(uploadedFile, "<><><><><>")

      // Post Application
      let application = await Application.create({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        coverLetter: req.body.coverLetter,
        fileURL: secure_url,
        jobId: id,
      });
      res.status(201).json(application);
    } catch (err) {
      next(err);
    }
  }

  //GET ALL APPLICATIONS
  static async getApplications(req, res, next) {
    try {
      let applications = await Application.find().populate("jobId");
      res.status(200).json(applications);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerApplication;
