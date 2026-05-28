import { createFileRoute } from "@tanstack/react-router";
import { TokenForm } from "@/components/token/TokenForm";

export const Route = createFileRoute("/token-builder")({
  head: () => ({ meta: [{ title: "Token Builder · Pure Agent" }] }),
  component: TokenBuilderPage,
});

function TokenBuilderPage() {
  return <TokenForm />;
}