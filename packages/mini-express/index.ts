// import express, { Request, NextFunction, Response } from "express";
import express, { Request, NextFunction, Response } from "./mini-express";

const app = express();


function globalMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("Global middleware");
  next();
}

app.use(globalMiddleware);
function handleUrl(req: Request, res: Response, next: NextFunction) {
  console.log(req.url);
  next();
}
function handleRequestTime(req: Request, res: Response, next: NextFunction) {
  console.log(new Date().toLocaleString());
  next();
}

// app.get("/", handleUrl, handleRequestTime, (req, res) => {
app.get("/", handleUrl, handleRequestTime, (req, res) => {
  res.send("Hello root!");
});

app.get(
  "/about",
  handleUrl, handleRequestTime,
  (req: Request, res: Response) => {
    res.send("Hello about!");
  }
); 


app.listen(3000, () => {
  console.log("Example app listening on port 3000!, http://localhost:3000/");
});
