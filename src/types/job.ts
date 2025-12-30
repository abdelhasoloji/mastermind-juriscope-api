export type JobStatus = "pending" | "running" | "completed" | "failed";

export interface Job {
  id: string;
  type: string;
  status: JobStatus;
  progress: number | null;
  payload: any;
  result: any;
  error: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
}
