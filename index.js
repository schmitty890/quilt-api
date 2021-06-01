import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./src/routes/crmRoutes";
import patternRoutes from "./src/routes/patternRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081;

// enable cors
app.use(cors());

// mongoose connection
mongoose.Promise = global.Promise;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/quiltDB";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        if (err) {
          req.user = undefined;
        }
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

// determine port server is running on
// const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081;
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
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve);

app.get("/docs", swaggerUi.setup(specs));

routes(app);
patternRoutes(app);
// serving static files
app.use(express.static("public"));

app.get("/test", (req, res) => {
  res.send("test route!");
});

app.get("/", (req, res) => {
  console.log(`hi on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
