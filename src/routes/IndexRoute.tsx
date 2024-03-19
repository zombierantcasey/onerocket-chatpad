import { useNavigate } from "@tanstack/react-location";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import { db } from "../db";

export function IndexRoute() {
  const navigate = useNavigate();
  const chats = useLiveQuery(() =>
    db.chats.orderBy("createdAt").reverse().toArray()
  );

  useEffect(() => {
    if (chats && chats.length > 0) {
      navigate({ to: `/chats/${chats[0].id}` });
    }
  }, [chats, navigate]);

  return <div>{}</div>;
}
