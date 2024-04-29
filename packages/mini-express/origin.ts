import express, { Request, NextFunction, Response } from "express";

const app = express();

function handleUrl(req: Request, res: Response, next: NextFunction) {
  console.log(req.url);
  next();
}
function handleRequestTime(req: Request, res: Response, next: NextFunction) {
  console.log(req.url);
  next();
}

app.get("/", handleUrl, handleRequestTime, (req, res) => {
  res.send("Hello root!");
});

app.get("/about", [handleUrl, handleRequestTime], (req: Request, res: Response) => {
  res.send("Hello about!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!, http://localhost:3000/");
});
