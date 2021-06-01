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

const routes = (app) => {
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
  app
    .route("/login")
    /**
     * @swagger
     * /login/:
     *    post:
     *      description: Log in a user
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: LoginUser
     *            description: LoginUser object
     *            in: body
     *            required: true
     *            schema:
     *              $ref: '#/definitions/LoginUser'
     *      responses:
     *          200:
     *              description: Register a user
     *          400:
     *              description: Error from parameters
     *          500:
     *              description: Server Error
     */
    .post(login);

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

  /**
   * @swagger
   * definitions:
   *   LoginUser:
   *     properties:
   *       email:
   *         type: string
   *       password:
   *         type: string
   */
};

export default routes;
