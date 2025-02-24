import { sendApplicationEmail } from "../MiddleWare/nodemailer.js";
import JobModel from "../Model/Job.model.js";
export default class JobController {
  constructor() {
    this.applicants = [];
  }

  getHomePage(req, res) {
    res.render("HomePage");
  }

  getJobs(req, res) {
    let jobs = JobModel.getAll();
    res.render("Jobs", { jobs: jobs });
  }

  getJobDetails(req, res) {
    let jobId = req.params.id;
    let job = JobModel.getJobById(jobId);
    if (job) {
      res.render("Job-Details", { job });
    } else {
      res.status(404).send("Job Not Found");
    }
  }

  getAddJob(req, res) {
    res.render("new-job");
  }

  postNewJob(req, res) {
    JobModel.add(req.body);
    let jobs = JobModel.getAll();
    return res.render("Jobs", { jobs: jobs });
  }

  getUpdateJob(req, res) {
    const id = req.params.id;

    const jobFound = JobModel.getJobById(id);

    if (jobFound) {
      res.render("update-job", { job: jobFound, errorMessage: null });
    } else {
      res.status(401).send("Job Not Found");
    }
  }

  postUpdateJob(req, res) {
    const jobId = req.body.id;
    const updatedJob = {
      id: jobId,
      jobCategory: req.body.jobCategory,
      jobDesignation: req.body.jobDesignation,
      location: req.body.location,
      companyName: req.body.companyName,
      salary: req.body.salary,
      openings: req.body.openings,
      Skills: req.body.skills,
      applyBy: req.body.applyBy,
    };

    JobModel.update(updatedJob);

    let jobs = JobModel.getAll();
    return res.render("Jobs", { jobs: jobs });
  }

  postApplicants(req, res) {
    const { name, email, contact,jobId } = req.body;
    const resumeFile = req.file ? req.file.filename : null;

    const job=JobModel.getJobById(jobId);
    if(!job)
    {
      return res.status(404).send("Job not found");
    }

    const newApplicant = {
      id: this.applicants.length + 1,
      name,
      email,
      contact,
      resume: resumeFile,
    };

    this.applicants.push(newApplicant);
    job.applicants=parseInt(job.applicants)+1;
    sendApplicationEmail(email, name);
    res.redirect("/jobs");
  }
  getApplicants(req, res) {
    res.render("Applicants", { applicants: this.applicants });
  }

  deleteJob(req,res){
    const jobID=req.params.id;
    const isDeleted=JobModel.delete(jobID)

    if(isDeleted)
    {
      res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: "Job not found" });
    }
  }
}
