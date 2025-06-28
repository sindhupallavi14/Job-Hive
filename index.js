import express from "express";
import path from "path";
import JobController from "./src/Controller/Job.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import UserController from "./src/Controller/user.controller.js";
import session from "express-session";
import { uploadFile } from "./src/MiddleWare/file-upload.middleware.js";
import { auth } from "./src/MiddleWare/auth.middleware.js";

const server=express();

server.use(session(
    {
        secret:"JobshiveKey",
        resave:false,
        saveUninitialized:false,
        cookie:{secure:false}
    }
))

server.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});


const jobController=new JobController();
const userController=new UserController();
server.use(expressEjsLayouts);
server.use(express.static("src/Views"));
server.use(express.static("public"));

server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),"src","View"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/resumes", express.static("public/resumes"));



server.get("/",jobController.getHomePage);
server.get("/jobs",jobController.getJobs);
server.get("/jobs/:id",jobController.getJobDetails);
server.get("/search",jobController.getSearchResults);

// delete
server.delete("/jobs/:id",jobController.deleteJob);

// add the new job
server.get("/postJob",jobController.getAddJob);
server.post("/jobs",jobController.postNewJob);

// update the job
server.get("/update/:id",jobController.getUpdateJob);
server.post("/update",jobController.postUpdateJob);

server.get("/applicants",auth, (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login"); 
    }
    jobController.getApplicants(req, res);
});
server.post("/apply",uploadFile.single("resume"),jobController.postApplicants.bind(jobController))

// Recruiter registration and login
server.get("/register",userController.getRegisterForm);
server.get("/login",userController.getLoginForm);
server.post("/register",userController.postRegister);
server.post("/login",userController.postLogin);
server.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});
server.listen(5100,()=>console.log("listening"));