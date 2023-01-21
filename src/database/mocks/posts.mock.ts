import { DBPost } from "../types/DBPost";

export const posts: DBPost[] = [
  {
    id: 1,
    content: "to triste",
    is_private: false,
    user_id: 1,
    crated_at: "2023-01-17",
  },
  {
    id: 2,
    content: "to feliz",
    is_private: true,
    user_id: 1,
    crated_at: "2023-01-15",
  },
  {
    id: 3,
    content: ":)",
    is_private: false,
    user_id: 2,
    crated_at: "2023-01-15",
  },
];
