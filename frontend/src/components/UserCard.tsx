import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Pencil, X } from "lucide-react";
import type { User } from "@/lib/api";

const DINO_EMOJIS = ["🦕", "🦖", "🦴", "🌋"];

function dinoEmojiForUser(id: number) {
  return DINO_EMOJIS[(id - 1) % DINO_EMOJIS.length];
}

interface UserCardProps {
  user: User;
  onSave: (data: { name?: string; email?: string }) => void;
}

const UserCard = ({ user, onSave }: UserCardProps) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    onSave({ name, email });
    setEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setEditing(false);
  };

  return (
    <Card className="relative overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <span className="text-4xl" title="Dino camper">
            {dinoEmojiForUser(user.id)}
          </span>
          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="space-y-2">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 text-sm"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9 text-sm"
                />
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={handleSave} className="shrink-0">
                    <Check className="h-4 w-4 mr-1" /> Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel} className="shrink-0">
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-display text-lg font-bold text-foreground">{user.name}</h3>
                <p className="text-muted-foreground text-sm mt-0.5">{user.email}</p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-2"
                  onClick={() => {
                    setName(user.name);
                    setEmail(user.email);
                    setEditing(true);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
                </Button>
              </>
            )}
          </div>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 bg-success text-success-foreground py-2 text-sm font-semibold transition-all duration-300 ${
            showSuccess ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <Check className="h-4 w-4" /> Saved!
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
