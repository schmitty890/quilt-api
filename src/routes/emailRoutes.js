import { sendEmail } from "../controllers/emailController";
const routes = (app) => {
  app
    .route("/email")
    // send email to me
    .post(sendEmail);
};

export default routes;
