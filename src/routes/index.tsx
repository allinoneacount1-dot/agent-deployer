import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pure Agent — email to ERC-20, on Base Sepolia" },
      {
        name: "description",
        content:
          "An agent that reads an email, parses intent, and deploys a real ERC-20 contract on Base Sepolia. No dashboards to learn. No SDKs to wire.",
      },
    ],
  }),
  component: Landing,
});
