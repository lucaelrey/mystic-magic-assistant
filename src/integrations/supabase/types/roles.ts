export type UserRole = {
  created_at: string;
  id: string;
  role: "admin" | "user";
  user_id: string | null;
}