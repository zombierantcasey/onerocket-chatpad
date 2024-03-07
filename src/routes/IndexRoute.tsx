import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export function IndexRoute() {
  const settings = useLiveQuery(() => db.settings.get("general"));
  const { openAiApiKey } = settings ?? {};

  return (
    <>
    </>
  );
}
