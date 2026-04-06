import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/riddles")({
  component: RiddlesPage,
});

export function RiddlesPage() {
  return <>Devinettes</>;
}
