import { Icon } from "@/components/ui/icon";
import Link from "next/link";

interface FaqItem {
  id: number;
  icon: string;
  text: string;
  link: string;
}

interface FaqProps {
  data: {
    faqItems: FaqItem[];
  };
}
const Faq: React.FC<FaqProps> = ({ data }) => {
  return (
    <div className="lg:mt-12 lg:pb-[80px] md:mt-[96px] md:pb-[48px] mt-[80px] pb-12">
      <div className="text-xl dark:text-white-100 text-black-1000 pb-3 font-semibold">
        FAQ
      </div>
      {data.faqItems.map((item: FaqItem) => (
        <div
          key={item.id}
          className="dark:text-white-100 text-black-1000 text-base mt-6 flex items-center justify-start"
        >
          <Icon
            name={item.icon}
            size={24}
            className="text-primary-100 dark:text-primary-100 cursor-pointer mr-3"
          />
          <Link
            href={item.link}
            className="dark:text-white-100 text-black-1000 font-semibold"
          >
            {item.text}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Faq;
