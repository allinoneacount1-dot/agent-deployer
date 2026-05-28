import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EmailInbox } from "@/components/email/EmailInbox";
import { EmailParserView } from "@/components/email/EmailParserView";
import { mockEmails } from "@/lib/mock-data";

export const Route = createFileRoute("/email-console")({
  head: () => ({ meta: [{ title: "Email Console · Pure Agent" }] }),
  component: EmailConsolePage,
});

function EmailConsolePage() {
  const [selectedId, setSelectedId] = useState(mockEmails[0].id);
  const selected = mockEmails.find((e) => e.id === selectedId) ?? mockEmails[0];

  return (
    <div className="grid lg:grid-cols-[20rem_1fr] gap-6">
      <EmailInbox emails={mockEmails} selectedId={selectedId} onSelect={setSelectedId} />
      <EmailParserView email={selected} />
    </div>
  );
}