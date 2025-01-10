import dotenv from "dotenv";
import {runAIFlow} from "./langflow";
import cors from "cors";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/analyze", async (req: Request, res: Response) => {
    const post_type: string = req.query.ptype as string;
  
    const response = await runAIFlow(post_type);
  
    res.status(200).json({ response });
  });
  
  app.listen(PORT, () => {
    console.log("Server is listening in the port " + PORT);
  });