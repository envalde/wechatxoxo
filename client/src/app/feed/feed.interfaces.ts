// definition Post table

export interface Post {
  content: string;
  likeCount: number;
  id: string;
}

export interface User {
  username: string;
  password: string;
  id: string;
}