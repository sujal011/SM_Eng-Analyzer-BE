import dotenv from "dotenv";
import {runAI} from "./langflow";
import cors from "cors";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
  const post_type: string | undefined = req.body?.post_type;
  if (!post_type) {
    res.status(400).json({ error: "post_type is required" });
    return;
  }

    try {
      const response = await runAI(post_type);
    
      res.status(200).json({ response });
    } catch (error) {
      res.status(500).json({ error: error.message });
      
    }
});

// Export the app for Vercel
export default app;

// Uncomment this if you want to run locally
app.listen(PORT, () => {
  console.log("Server is listening in the port " + PORT);
});