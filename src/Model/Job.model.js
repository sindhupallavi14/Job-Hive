export default class JobModel {
  constructor(
    id,
    jobCategory,
    jobDesignation,
    location,
    companyName,
    salary,
    openings,
    Skills,
    applyBy,
    applicants
  ) {
    this.id = id;
    this.jobCategory = jobCategory;
    this.jobDesignation = jobDesignation;
    this.location = location;
    this.companyName = companyName;
    this.salary = salary;
    this.openings = openings;
    this.Skills = Skills;
    this.applyBy = applyBy;
    this.applicants=applicants;
  }

  static getAll() {
    return jobs;
  }

  static getJobById(id) {
    return jobs.find((job) => job.id == id);
  }

  static add(jobObj) {
    let newJob = new JobModel(
      jobs.length + 1,
      jobObj.jobCategory,
      jobObj.jobDesignation,
      jobObj.location,
      jobObj.companyName,
      jobObj.salary,
      jobObj.openings,
      jobObj.Skills,
      jobObj.applyBy,
      jobObj.applicants
    );

    jobs.push(newJob);
  }

  static update(jobObj) {
    const editJobidx = jobs.findIndex((job) => job.id == jobObj.id);

    if (editJobidx !== -1) {
      jobs[editJobidx] = { ...jobs[editJobidx], ...jobObj };
  }
  }

  static delete(id) {
    const index = jobs.findIndex((job) => job.id == id);
    if (index !== -1) {
      jobs.splice(index, 1);
      return true; // Job deleted
    }
    return false; // Job not found
  }
}

var jobs = [
  new JobModel(
    "1",
    "TECH",
    "SDE",
    "Mumbai",
    "Coding Ninjas",
    "4.5 LPA",
    "30",
    "React, Node",
    "20-03-2025","20"
  ),
  new JobModel(
    "2",
    "FINANCE",
    "Analyst",
    "Bangalore",
    "Goldman Sachs",
    "12 LPA",
    "10",
    "Excel, SQL",
    "15-04-2025","5"
  ),
  new JobModel(
    "3",
    "MARKETING",
    "SEO Specialist",
    "Delhi",
    "Google",
    "7.5 LPA",
    "5",
    "SEO, SEM",
    "10-05-2025","14"
  ),
];
