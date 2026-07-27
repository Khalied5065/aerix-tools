import { notFound } from "next/navigation";

export default function ToolFallbackPage({ params }: { params: Promise<{ toolId: string }> }) {
  return notFound();
}
