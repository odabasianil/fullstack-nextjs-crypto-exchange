import { MarketsTabs } from "@/views/markets/tabs";
import data from "@/data/markets/overview/mini-list.json"
import { MiniList } from "@/views/markets/overview/mini-list";
import { OverviewTab } from "@/views/markets/overview/tab";


export interface MiniListProps {
  title: string;
  link: string;
  list: MiniListItem[];
  theme?: string;
}

export interface MiniListItem {
  image: string;
  name: string;
  price: string;
  symbol: string;
  exchange: string;
  link: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden md:grid grid-cols-4 gap-4 mb-4">
        {
          data.map((item: MiniListProps, index: number) => (
            <MiniList
              key={index}
              title={item.title}
              link={item.link}
              list={item.list}
            />
          ))
        }
      </div>
      <OverviewTab />
      {children}
    </>
  );
}
