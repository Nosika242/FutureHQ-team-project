

export interface Author {
  avatar?: string;
  fullname?: string;
  username?: string;
}

export interface Post {
  id: number;
  title: string;
  text: string;
  image?: string;
  reaction: number;
  has_reacted: boolean;
  created_at?: string;
  updated_at?: string;
   author?: Author;
}
