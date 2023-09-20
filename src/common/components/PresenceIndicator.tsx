"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@clerk/nextjs";
import { RealtimePresenceState } from "@supabase/supabase-js";
import { cn } from "../utils";

interface PresenceState {
  id: string;
  fullName?: string | null;
  profileImage?: string;
}

export const PresenceIndicator: FC = () => {
  const supabase = createClientComponentClient();
  const user = useUser();

  const [users, setUsers] = useState<RealtimePresenceState<PresenceState>[string]>([]);

  const appRoom = useMemo(() => supabase.channel("app-room", { config: { presence: { key: "my-channel" } } }), []);

  useEffect(() => {
    appRoom.on("presence", { event: "sync" }, () => {
      const state = appRoom.presenceState<PresenceState>()["my-channel"];
      if (!state) return;
      console.log(state);
      setUsers(state.filter((presence) => presence.id !== user.user?.id));
    });

    appRoom.subscribe(async (status) => {
      if (status === "SUBSCRIBED" && user.user) {
        const state: PresenceState = { id: user.user.id, fullName: user.user.fullName, profileImage: user.user.imageUrl };
        appRoom.track(state, { key: "my-channel" });
      }
    });

    return () => {
      appRoom.unsubscribe();
    };
  }, []);

  if (users.length)
    return (
      <div className="flex p-1 rounded-full bg-muted">
        {users.map((user, index) => (
          <Avatar key={user.presence_ref} className={cn("border-2", { "ml-[-1rem]": index !== 0 })}>
            <AvatarImage src={user.profileImage} />
            <AvatarFallback>
              {user.fullName?.slice(0, 2)} {user.profileImage}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    );
};
