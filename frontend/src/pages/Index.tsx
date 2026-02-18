import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateUser } from "@/lib/api";
import UserCard from "@/components/UserCard";

const Index = () => {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name?: string; email?: string } }) =>
      updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const handleSave = (id: number, data: { name?: string; email?: string }) => {
    mutation.mutate({ id, data });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="py-10 text-center">
        <p className="text-4xl mb-2">🦕</p>
        <h1 className="font-display text-4xl font-bold text-foreground">
          Dino Discovery Camp
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Summer 2026 · Users from database
        </p>
      </header>

      <main className="mx-auto max-w-xl px-4 pb-16 space-y-4">
        {isLoading && (
          <p className="text-center text-muted-foreground">Loading users…</p>
        )}
        {error && (
          <p className="text-center text-destructive text-sm max-w-xl mx-auto">
            {error instanceof Error ? error.message : "Could not load users."}
            {error instanceof Error &&
              error.message.includes("fetch") &&
              " Is the backend running? (npm run dev:backend)"}
          </p>
        )}
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onSave={(data) => handleSave(user.id, data)}
          />
        ))}
      </main>
    </div>
  );
};

export default Index;
