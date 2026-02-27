import { useEffect } from "react";
import resumePdf from "@/assets/RyanPereraResume.pdf";

export default function Resume() {
  useEffect(() => {
    window.location.replace(resumePdf);
  }, []);

  return null;
}
