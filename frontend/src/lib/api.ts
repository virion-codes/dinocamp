// Vite bakes in env at build/dev start — restart frontend after changing .env
const API_URL =
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.DEV ? "http://localhost:3000" : "");

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/api/users`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = body?.detail ? `${body.error}: ${body.detail}` : body?.error || res.statusText || "Failed to fetch users";
    throw new Error(msg);
  }
  return res.json();
}

export async function updateUser(
  id: number,
  data: { name?: string; email?: string }
): Promise<User> {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? 'Failed to update user');
  }
  return res.json();
}
