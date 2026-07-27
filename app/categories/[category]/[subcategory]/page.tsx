import { notFound } from "next/navigation";

export default function CategorySubcategoryFallbackPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  return notFound();
}
