import { Icon } from "@/components/ui/icon";
import {
  MiniListItem,
  MiniListProps,
} from "@/app/(root)/markets/[overview]/layout";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const MiniList = (props: MiniListProps) => {
  const { title, link, list, theme } = props;

  return (
    <div
      className={twMerge(
        "p-2 pt-4 flex flex-col gap-2 border border-white-100 dark:border-secondary rounded-2xl ",
        theme === "primary" && "md:w-[486px] w-full md:pt-3 md:pl-3 md:pb-2"
      )}
    >
      <div className="px-2 flex items-center justify-between text-xs">
        <div
          className={twMerge(
            "font-semibold",
            theme === "primary" && "md:text-base"
          )}
        >
          {title}
        </div>
        <Link href={link} className="flex items-center group">
          More
          <Icon
            name="chevron-left"
            size={12}
            className="text-gray group-hover:text-white-100 rotate-180"
          />
        </Link>
      </div>
      <div className="w-full">
        {list.map((item: MiniListItem, index: number) => (
          <Link
            href={item.link}
            key={index}
            className={twMerge(
              "flex items-center justify-between p-2 hover:bg-white-200 dark:hover:bg-black-500 text-sm",
              theme === "primary" && "py-3 px-4"
            )}
          >
            <div className="flex items-center gap-2">
              <Image src={item.image} width={24} height={24} alt={item.name} />
              <div className="font-medium">{item.symbol}</div>
            </div>
            <div className="">{item.price}</div>
            <div
              className={twMerge(
                "font-medium",
                item.exchange.includes("-") ? "text-error" : "text-success"
              )}
            >
              {item.exchange}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
