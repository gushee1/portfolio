import type { Metadata } from "next";
import { ResumePage } from "../components/resume";

export const metadata: Metadata = {
  title: "Will Gushée · Resume"
};

export default function Page() {
  return <ResumePage />;
}
