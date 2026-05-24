import { FaqPreview } from "@/components/ui/faq-preview";
import { HowItWorks } from "@/components/ui/how-it-works";

export default function SideBarContent() {
  return (
    <>
      <div className="lg:w-[383px] md:w-[240px]">
        <HowItWorks className="w-full" />
        <FaqPreview/>
      </div>
    </>
  );
}
