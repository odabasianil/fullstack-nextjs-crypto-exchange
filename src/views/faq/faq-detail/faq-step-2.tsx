"use client";
import { BreadCrumb } from "@/components/ui/breadcrumb";
import { RegisterPreview } from "@/components/ui/register-preview";
import { Share } from "@/components/ui/share";
import { RelatedArticles } from "./related-articles";
import data2 from "@/data/faq/related-articles.json";
import { FaqBody } from "./faq-body";

interface Faq2Data {
  level?: string | undefined
  html?: string;
  date?: string;
  title?: string;
}
interface Faq2DataProps {
  data: Faq2Data;
}
const segments = [
  { name: "Support Center", href: "/support" },
  { name: "FAQ", href: "/faq" },
  { name: "Account Functions", href: "/faq/account-functions" },
  { name: "Identity Verification", href: "/faq/identity-verification" },
];

export const FaqStep2 = ({ data }: Faq2DataProps) => {
  return (
    <>
      <div className="grid lg:min-w-[unset] lg:ml-8 lg:mr-8 lg:grid-cols-[1fr_280px] lg:gap-[80px] md:ml-6 md:mr-0 md:grid-cols-1 md:gap-6 md:pt-10 min-w-[calc(100%-64px)] ml-4 mr-0 w-full grid-cols-1 gap-6 pt-6">
        <div className="mr-3">
          <BreadCrumb segments={segments} className="mb-4" />
          <FaqBody data={data}/>
        </div>
        <div className="block md:mr-0 mr-3">
          <div className="sticky top-6">
            <div className="lg:gap-10 md:gap-6 md:flex-col flex-col md:items-start flex justify-center gap-6">
              <Share className={""} />
              <RegisterPreview className={""} />
              <RelatedArticles data={data2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
