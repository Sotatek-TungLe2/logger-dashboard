// lib/toast.ts
import { toast } from "sonner";

export function showToast(message: string, type: "default" | "success" | "error" = "default") {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
  }
}
