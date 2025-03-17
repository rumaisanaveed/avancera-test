import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/");
  };
  return (
    <Button
      className="flex items-center gap-1 text-sm lg:text-base py-1 px-4 lg:px-8 lg:py-2 rounded-md cursor-pointer"
      onClick={handleButtonClick}
    >
      <ArrowLeft size={16} />
      <p>Back</p>
    </Button>
  );
}
