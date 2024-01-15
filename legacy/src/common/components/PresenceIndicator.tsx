"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@clerk/nextjs";
import { RealtimePresenceState } from "@supabase/supabase-js";
import { cn } from "../utils";
import { Users2 } from "lucide-react";

interface PresenceState {
  id: string;
  fullName?: string | null;
  profileImage?: string;
}

export const PresenceIndicator: FC = () => {
  const supabase = createClientComponentClient();
  const { user } = useUser();

  const [users, setUsers] = useState<RealtimePresenceState<PresenceState>[number]>([]);

  const channel = useMemo(() => {
    if (!user || !supabase) return null;
    return supabase.channel("corporate-group:acme");
  }, [user, supabase]);

  useEffect(() => {
    if (!channel) return;
    if (!user) channel.unsubscribe();

    channel.on("presence", { event: "sync" }, () => {
      const presenceState = channel.presenceState<PresenceState>();
      const users = Object.keys(presenceState)
        .map((presenceKey) => presenceState[presenceKey])
        .flat()
        .filter((presence) => presence.id !== user?.id);

      setUsers(users.sort());
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED" && user) {
        const state: PresenceState = { id: user.id, fullName: user.fullName, profileImage: user.imageUrl };
        channel.track(state);
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [channel, user]);

  if (true)
    return (
      <div className="flex p-1 rounded-full bg-muted">
        {users.map((user, index) => (
          <Avatar key={user.presence_ref} className={cn("border-2", { "ml-[-1rem]": index !== 0 })}>
            <AvatarImage src={user.profileImage} />
            <AvatarFallback>{user.fullName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        ))}
        <Avatar className={cn("border-2", { "ml-[-1rem]": users.length })}>
          <AvatarFallback>
            <Users2 size={20} />
          </AvatarFallback>
        </Avatar>
      </div>
    );
};
