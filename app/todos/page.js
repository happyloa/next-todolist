import { cookies } from "next/headers";
import TodosPageClient from "@/components/todos/TodosPageClient";

export default async function TodosPage() {
  const cookieStore = await cookies();
  const nickname = cookieStore.get("nickname")?.value || "";

  return <TodosPageClient initialNickname={nickname} />;
}
