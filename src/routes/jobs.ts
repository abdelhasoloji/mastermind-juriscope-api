import { Router } from "express";
import { verifySupabaseJwt } from "@/auth/verifySupabaseJwt";
import { createJob, getJobById, updateJob } from "@/db/jobsRepo";

export const jobsRouter = Router();

jobsRouter.post("/v1/jobs", async (req, res) => {
  const userId = verifySupabaseJwt(req.headers.authorization);
  const { type, payload } = req.body;

  const job = await createJob(type, payload, userId);

  // TODO: trigger n8n webhook here

  res.status(202).json({
    id: job.id,
    status: job.status
  });
});

jobsRouter.get("/v1/jobs/:id", async (req, res) => {
  const userId = verifySupabaseJwt(req.headers.authorization);
  const job = await getJobById(req.params.id);

  if (!job || job.created_by !== userId) {
    return res.sendStatus(404);
  }

  res.json(job);
});
