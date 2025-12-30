import { db } from "./client";
import { Job } from "@/types/job";

export async function createJob(
  type: string,
  payload: any,
  userId: string
): Promise<Job> {
  const { rows } = await db.query(
    `insert into jobs (type, status, progress, payload, created_by)
     values ($1, 'pending', 0, $2, $3)
     returning *`,
    [type, payload, userId]
  );
  return rows[0];
}

export async function getJobById(id: string): Promise<Job | null> {
  const { rows } = await db.query(
    `select * from jobs where id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function updateJob(
  id: string,
  fields: Partial<Job>
): Promise<void> {
  const sets = [];
  const values = [];
  let i = 1;

  for (const [k, v] of Object.entries(fields)) {
    sets.push(`${k} = $${i++}`);
    values.push(v);
  }

  if (!sets.length) return;

  await db.query(
    `update jobs set ${sets.join(", ")}, updated_at = now() where id = $${i}`,
    [...values, id]
  );
}
