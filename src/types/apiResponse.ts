
import type { Post } from "../types";

export interface ArticleListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}