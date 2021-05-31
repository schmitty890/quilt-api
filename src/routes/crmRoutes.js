import {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
} from "../controllers/crmController";

import {
  login,
  register,
  loginRequired,
  getUserWithID,
  updateUserWithID,
} from "../controllers/userController";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// determine port server is running on
const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081;
// determine port for swagger docs
let hostURL =
  PORT === 8081 ? "localhost:8081" : "quilt-api-hdi7d.ondigitalocean.app";

// define swagger options
const options = {
  swaggerDefinition: {
    info: {
      title: "Quilting docs",
      version: "1.0.0",
      description: "endpoints for quilt project",
    },
    host: hostURL,
    basePath: "/",
  },
  apis: ["./src/routes/crmRoutes.js"],
};
const specs = swaggerJsdoc(options);

const routes = (app) => {
  app.get("/docs", swaggerUi.setup(specs));
  app
    .route("/contact")
    // get all contacts
    .get(
      (req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      },
      loginRequired,
      getContacts
    )

    // add a new contact
    .post(loginRequired, addNewContact);

  app
    .route("/contact/:contactID")
    // get a specific contact
    .get(loginRequired, getContactWithID)

    // update a specific contact
    .put(loginRequired, updateContact)

    // delete a specific contact
    .delete(loginRequired, deleteContact);

  app
    .route("/user/:userID")
    // get user with specific id
    .get(loginRequired, getUserWithID)
    // update a specific contact
    .put(loginRequired, updateUserWithID);

  // register new user route
  app
    .route("/auth/register")
    /**
     * @swagger
     * /auth/register/:
     *    post:
     *      description: Register one user
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: User
     *            description: User object
     *            in: body
     *            required: true
     *            schema:
     *              $ref: '#/definitions/User'
     *      responses:
     *          200:
     *              description: Register a user
     *          400:
     *              description: Error from parameters
     *          500:
     *              description: Server Error
     */
    .post(register);

  // login route
  app.route("/login").post(login);

  /**
   * @swagger
   * definitions:
   *   User:
   *     properties:
   *       firstName:
   *         type: string
   *       email:
   *         type: string
   *       password:
   *         type: string
   */
};

export default routes;
