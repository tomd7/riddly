import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/jokes")({
  component: JokesPage,
});

function JokesPage() {
  return <>Blagues</>;
}
