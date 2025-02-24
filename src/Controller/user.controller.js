
import { sendWelcomeEmail } from "../MiddleWare/nodemailer.js";
import UserModel from "../Model/User.model.js";


export default class UserController {
  
  getRegisterForm(req, res) {
    res.render("register");
  }

  postRegister(req, res) {
    const {name,email,password}=req.body;
    UserModel.add(name,email,password);
    sendWelcomeEmail(email,name);
    res.redirect("/login");
  }

  postLogin(req, res) {
    const {email,password}=req.body;
    const user=UserModel.isValidUser(email,password);
    if(!user)
    {
      return res.render("login",{errorMessage:"Invalid Credentials"})
    }
    req.session.userEmail=email;
    req.session.userName=user.name;
    req.session.user=user;
    res.redirect("/jobs");
  }

  getLoginForm(req, res) {
    res.render("login",{errorMessage:null});
  }
}
