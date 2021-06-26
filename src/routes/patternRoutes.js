import {
  addNewPattern,
  getPatterns,
  getPatternWithID,
  updatePattern,
  deletePattern,
  getPatternsByCategory,
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
    // get all patterns
    /**
     * @swagger
     * /pattern:
     *    get:
     *      tags:
     *          - pattern endpoints
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
     *      tags:
     *          - pattern endpoints
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
    .post(addNewPattern);

  app
    .route("/pattern/:patternID")
    // get a specific contact
    /**
     * @swagger
     * /pattern/{id}:
     *    get:
     *      tags:
     *          - pattern endpoints
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

    // update a specific pattern
    /**
     * @swagger
     * /pattern/{id}:
     *    put:
     *      tags:
     *          - pattern endpoints
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
    .route("/getPatternsByCategory/:category")
    // get all contacts by category
    /**
     * @swagger
     * /getPatternsByCategory/{category}:
     *    get:
     *      tags:
     *          - pattern endpoints
     *      description: Return all patterns of a category
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: category
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: Returns an array of objects of a pattern category
     */
    .get((req, res, next) => {
      // middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getPatternsByCategory);

  app
    .route("/user/:userID")
    // get user with specific id
    /**
     * @swagger
     * /user/{id}:
     *    get:
     *      tags:
     *          - user endpoints
     *      description: Return user by id
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: userID
     *            in: path
     *            required: true
     *            type: string
     *            schema:
     *              $ref: '#/definitions/User'
     *      responses:
     *          200:
     *              description: Returns a user object
     */
    .get(loginRequired, getUserWithID)
    // update a specific contact
    /**
     * @swagger
     * /user/{id}:
     *    put:
     *      tags:
     *          - user endpoints
     *      description: Update one user
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: User
     *            description: User object
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

  /**
   * @swagger
   * definitions:
   *   User:
   *     properties:
   *       userID:
   *         type: string
   */
};

export default routes;
