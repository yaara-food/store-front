import { redirect } from "next/navigation";
import { ModelType } from "../../lib/form";

export default function AdminRedirectPage() {
  redirect(`/admin/${ModelType.order}`);
}
