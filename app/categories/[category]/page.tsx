import { notFound } from "next/navigation";

export default function CategoryFallbackPage({ params }: { params: Promise<{ category: string }> }) {
  return notFound();
}
