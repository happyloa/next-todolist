import { cookies } from "next/headers";
import TodosPageClient from "@/components/todos/todos-page-client";

export default async function TodosPage() {
  const cookieStore = await cookies();
  const nickname = cookieStore.get("nickname")?.value || "";

  return <TodosPageClient initialNickname={nickname} />;
}
