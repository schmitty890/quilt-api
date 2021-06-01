import {
  addNewPattern,
  getPatterns,
  getPatternWithID,
  updatePattern,
  deletePattern,
} from "../controllers/patternController";

import {
  login,
  register,
  loginRequired,
  getUserWithID,
  updateUserWithID,
} from "../controllers/userController";

const routes = (app) => {
  app
    .route("/pattern")
    // get all contacts
    /**
     * @swagger
     * /pattern:
     *    get:
     *      description: Return all patterns
     *      consumes:
     *          - application/json
     *      responses:
     *          200:
     *              description: Returns an array of objects of each pattern
     */
    .get((req, res, next) => {
      // middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getPatterns)

    // add a new contact
    /**
     * @swagger
     * /pattern:
     *    post:
     *      description: Add new pattern
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: Pattern
     *            description: Pattern object
     *            in: body
     *            required: true
     *            schema:
     *              $ref: '#/definitions/Pattern'
     *      responses:
     *          200:
     *              description: Register a pattern
     *          400:
     *              description: Error from parameters
     *          500:
     *              description: Server Error
     */
    .post(loginRequired, addNewPattern);

  app
    .route("/pattern/:patternID")
    // get a specific contact
    /**
     * @swagger
     * /pattern/{id}:
     *    get:
     *      description: Return one pattern
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: Return a company based on company id
     */
    .get(getPatternWithID)

    // update a specific contact
    /**
     * @swagger
     * /pattern/{id}:
     *    put:
     *      description: Update one pattern
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: Pattern
     *            description: Pattern object
     *            in: body
     *            required: true
     *            schema:
     *              $ref: '#/definitions/Pattern'
     *          - name: id
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: Update a pattern based on pattern id
     */
    .put(updatePattern)

    // delete a specific contact
    .delete(loginRequired, deletePattern);

  app
    .route("/user/:userID")
    // get user with specific id
    .get(loginRequired, getUserWithID)
    // update a specific contact
    .put(loginRequired, updateUserWithID);

  /**
   * @swagger
   * definitions:
   *   Pattern:
   *     properties:
   *       name:
   *         type: string
   *       image:
   *         type: string
   *       category:
   *         type: string
   */
};

export default routes;
