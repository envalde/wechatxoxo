// definition Post table

export interface Post {
  content: string;
  likeCount: number;
  id: number;
}

export interface User {
  username: string;
  password: string;
  id: string;
}