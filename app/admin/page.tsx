import { redirect } from "next/navigation";
import { ModelType } from "../../lib/types/form";

export default function AdminRedirectPage() {
  redirect(`/admin/${ModelType.order}`);
}
