import express from "express";
import createHttpError from "http-errors";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* GET / Introduction
app.get("/", (req: express.Request, res: express.Response) => {
  res.send({
    statusCode: 200,
    success: true,
    message: "microservice-template-nodejs-js",
    data: "A backend template made using Node.js, Express.js, and JavaScript for building REST API based microservices.",
  });
});

// 404 handler
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createHttpError(404, "Not found"));
  }
);

// error handler
// eslint-disable-next-line no-unused-vars
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: err.message,
      },
    });
  }
);

export default app;
