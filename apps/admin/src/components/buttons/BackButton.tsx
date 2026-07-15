// apps/admin/src/components/buttons/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@bn/ui";
import { CircleArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="ghost" 
      className="text-grey-600 hover:text-grey-700 hover:bg-grey-800 flex items-center gap-2 rounded-xl"
    >
      <CircleArrowLeft size={20}/>
    </Button>
  );
}