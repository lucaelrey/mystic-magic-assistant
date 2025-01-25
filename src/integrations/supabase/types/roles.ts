export type UserRole = {
  id: string;
  user_id: string | null;
  role: "admin" | "user";
  created_at: string;
};