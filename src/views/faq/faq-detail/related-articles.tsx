'use client';
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

interface Article {
  name: string;
  url: string;
}

interface RelatedArticlesProps {
  data: Article[];
}

export const RelatedArticles = ({ data }: RelatedArticlesProps) => {
  const router = usePathname();
  return (
    <div>
      <div className="text-xl dark:text-white-100 text-black-1100 mb-6 font-semibold">
        Related Articles
      </div>
      <ul>
        {data.map((article, index) => {
          const isActive = router === article.url;
          return (
            <li
              key={index}
              className={twMerge(
                "lg:w-fit md:w-auto hover:bg-gray-1000 hover:dark:bg-black-900 py-1.5 px-2 rounded my-3",
                isActive && "bg-gray-1000 dark:bg-black-900 font-semibold"
              )}
            >
              <Link
                href={article.url}
                className="text-white-1000 dark:text-gray-900"
              >
                <div className="lg:text-sm text-base">{article.name}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
