// server/models/jobs.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const SkillsSchema = new Schema({
    name: String,
    imageUrl: String
});

const LifeAtCompanySchema = new Schema({
    description: String,
    imageUrl: String
});

const JobsSchema = new Schema({
    title: String,
    companyLogoUrl: String,
    companyWebsiteUrl: String,
    rating: Number,
    location: String,
    packagePerAnnum: String,
    jobDescription: String,
});

const Jobs = mongoose.model("Jobs", JobsSchema);

const JobDetailsSchema = new Schema({
    title: String,
    companyLogoUrl: String,
    companyWebsiteUrl: String,
    rating: Number,
    location: String,
    packagePerAnnum: String,
    jobDescription: String,
    employmentType: String,
    skills: [SkillsSchema],
    lifeAtCompany: LifeAtCompanySchema
});

const JobDetails = mongoose.model('JobDetails', JobDetailsSchema);

module.exports = { Jobs, JobDetails };
