import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language") ?? "";
  const locale = acceptLanguage.toLowerCase().startsWith("fr") ? "fr" : "en";

  redirect(`/${locale}`);
}
