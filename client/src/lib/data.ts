export type Posts = {
  id: number;
  title: string;
  calories: number;
  body: string;
  userId: number;
  categoryId: number;
  totalVotes: number;
  views: number;
  createdAt: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Comments = {
  id: number;
  postId: number;
  username: string;
  content: string;
};

export async function getPosts(): Promise<Posts[]> {
  const response = await fetch('/api/posts', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return (await response.json()) as Posts[];
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch('/api/categories', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return (await response.json()) as Category[];
}

export async function getPostsByCategory(
  categoryName: string
): Promise<Posts[]> {
  const response = await fetch(`/api/categories/${categoryName}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return (await response.json()) as Posts[];
}

export async function getComments(postId: number): Promise<Comments[]> {
  const response = await fetch(`/api/comments/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return (await response.json()) as Comments[];
}
