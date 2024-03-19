import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";
import { Chat, db, Prompt } from "../db";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  chat: Chat;
  prompt?: Prompt | null; // Optional prompt property
}

export function MainLink({ icon, color, label, chat, prompt }: MainLinkProps) {
  const firstMessage = useLiveQuery(async () => {
    return (await db.messages.orderBy("createdAt").toArray()).filter(
      (m) => m.chatId === chat.id
    )[0];
  }, [chat]);

  let displayText;
  if (prompt) {
    displayText = prompt.title;
  } else if (firstMessage?.content) {
    // If there is no prompt, fallback to the first message content.
    displayText = firstMessage.content;
  }

  return (
    <UnstyledButton
      sx={(theme) => ({
        // display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text
          size="sm"
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            flex: 1,
            width: 0,
          }}
        >
          {label} <br />
          {displayText}
        </Text>
      </Group>
    </UnstyledButton>
  );
}
