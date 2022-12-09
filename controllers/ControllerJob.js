const express = require("express");
const axios = require("axios");
const Job = require("../models/job");
require("dotenv").config();

class ControllerJob {
  //POST JOB
  static async addJob(req, res, next) {
    try {
      const { title, description, requirement, jobType } = req.body;
      if (!title || !description || !requirement || !jobType) {
        throw { name: `BADREQUEST` };
      }
      let job = await Job.create({
        title: req.body.title,
        description: req.body.description,
        requirement: req.body.requirement,
        jobType: req.body.jobType,
      });
      res.status(201).json(job);
    } catch (err) {
      next(err);
    }
  }

  //GET ALL JOBS
  static async getJobs(req, res, next) {
    try {
      let jobs = await Job.find().populate("applications");
      res.status(200).json(jobs);
    } catch (err) {
      next(err);
    }
  }

  //GET JOB BY ID
  static async getJobById(req, res, next) {
    try {
      let { id } = req.params;
      let findJob = await Job.findOne({ _id: id }).populate("applications");
      if (!findJob) {
        throw { name: "DATA_NOT_FOUND" };
      }
      res.status(200).json(findJob);
    } catch (err) {
      next(err);
    }
  }

  //PATCH STATUS JOBS
  static async updateStatus(req, res, next) {
    try {
      let { id } = req.params;
      let findJob = await Job.findOne({ _id: id });
      if (!findJob) {
        throw { name: "DATA_NOT_FOUND" };
      }
      await findJob.updateOne({ is_active: req.body.is_active });
      res.status(200).json({
        message: `Job status set to ${!findJob.is_active? "Active" : "Closed"}.`,
      });
    } catch (err) {
      next(err);
    }
  }

  //EDIT JOB
  static async editJob(req, res, next) {
    try {
      let { id } = req.params;
      let findJob = await Job.findOne({ _id: id });
      if (!findJob) {
        throw { name: "DATA_NOT_FOUND" };
      }
      await findJob.updateOne({
        title: req.body.title,
        description: req.body.description,
        requirement: req.body.requirement,
        jobType: req.body.jobType,
      });
      res.status(200).json({
        message: `Job updated successfully.`,
      });
    } catch (err) {
      next(err);
    }
  }

  //DELETE STATUS JOBS
  static async deleteJob(req, res, next) {
    try {
      let { id } = req.params;
      let findJob = await Job.findOne({ _id: id });
      if (!findJob) {
        throw { name: "DATA_NOT_FOUND" };
      }
      await findJob.deleteOne({ _id: id });
      res.status(200).json({
        message: `Job deleted successfully.`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerJob;
