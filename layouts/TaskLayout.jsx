import BackButton from "@/components/custom/buttons/BackButton";
import BlackHeading from "@/components/custom/typography/BlackHeading";

export default function TaskLayout({ children, heading }) {
  return (
    <div className="relative">
      <div className="absolute top-10 left-10">
        <BackButton />
      </div>
      <div className="flex flex-col grow items-center justify-center gap-5 h-screen max-w-sm w-full mx-auto px-8 lg:px-0 py-10">
        <div className="flex items-center justify-between w-full">
          <BlackHeading text={heading} />
        </div>
        {children}
      </div>
    </div>
  );
}
