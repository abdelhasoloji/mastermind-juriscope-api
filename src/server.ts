import express from "express";
import cors from "cors";
import { healthRouter } from "@/routes/health";
import { jobsRouter } from "@/routes/jobs";
import { n8nRouter } from "@/routes/n8n";

const app = express();

app.use(cors());
app.use(express.json());

app.use(healthRouter);
app.use(jobsRouter);
app.use(n8nRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API listening on :${port}`);
});
