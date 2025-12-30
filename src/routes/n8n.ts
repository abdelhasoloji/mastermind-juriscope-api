import { Router } from "express";
import { updateJob } from "@/db/jobsRepo";

export const n8nRouter = Router();

n8nRouter.post("/v1/webhooks/n8n", async (req, res) => {
  const { job_id, status, progress, result, error } = req.body;

  await updateJob(job_id, {
    status,
    progress,
    result,
    error
  });

  res.sendStatus(204);
});
