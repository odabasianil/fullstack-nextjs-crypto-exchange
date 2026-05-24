import { headers } from "next/headers";
import data3 from "@/data/faq/tabs.json";
import FaqMenu from "@/views/faq/menu";
import { FaqHeader } from "@/views/faq/faq-detail/faq-header";
import { BreadCrumb } from "@/components/ui/breadcrumb";
import { FaqCards } from "@/views/faq/faq-detail/faq-cards";
import { PopularTopicsLinks } from "@/views/faq/faq-landing/popular-topics-links";
import data2 from "@/data/faq/popular-topics-links.json";
import { FaqStep1 } from "@/views/faq/faq-detail/faq-step-1";
import { FaqStep2 } from "@/views/faq/faq-detail/faq-step-2";
import { BASE_URL } from "@/core/services/global.api.webservice";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  if (!params) {
    return;
  }

  const requestUrl = headers().get("x-pathname") || "";
  const activeUrl = data3.find((item) => item.link === requestUrl);
  const isClose = true;

  const segments = [
    { name: "Support Center", href: "/support" },
    { name: "FAQ", href: "/support/faq" },
    { name: "Account Functions", href: "/support/faq/account-functions" },
  ];

  const CommonLayout = ({
    children,
    menuIsClose,
    menuData,
    breadcrumbSegments,
    hasDetail = false,
    menuParentUrl,
  }: {
    children: React.ReactNode;
    menuIsClose: boolean;
    menuData: any;
    breadcrumbSegments: any[];
    hasDetail?: boolean;
    menuParentUrl?: string;
  }) => (
    <div className="">
      <FaqHeader />
      <div className="flex rounded-tr-[32px]">
        <FaqMenu
          isClose={menuIsClose}
          data={menuData}
          requestUrl={requestUrl}
          parentUrl={menuParentUrl}
        />
        {!hasDetail ? (
          <div className="flex flex-col w-full">
            <div className="min-w-[calc(100%-48px)] pt-6 px-4 pb-0 md:min-w-fit md:p-0">
              <BreadCrumb
                segments={breadcrumbSegments}
                className="lg:mx-8 md:mx-6 md:mt-10 mx-0 mb-4"
              />
            </div>

            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );

  if (activeUrl?.link === requestUrl) {
    return (
      <CommonLayout
        menuIsClose={isClose}
        menuData={data3}
        breadcrumbSegments={segments}
      >
        <div className="lg:mx-8 md:mx-6 pt-2 px-4 md:px-0 min-w-[calc(100%-48px)]">
          {activeUrl.submenus && <FaqCards data={activeUrl.submenus} />}
          <PopularTopicsLinks data={data2.popularTopicsData} rowClass="gap-0" />
        </div>
      </CommonLayout>
    );
  }

  const response = await fetch(
    `${BASE_URL}/api/faq?question=${params.question.toLowerCase()}`
  );

  if (response.status === 500) {
    return (
      <CommonLayout
        menuIsClose={isClose}
        menuData={data3}
        breadcrumbSegments={segments}
      >
        <div className="lg:mx-8 md:mx-6 pt-2 px-4 md:px-0 min-w-[calc(100%-48px)]">
          <PopularTopicsLinks data={data2.popularTopicsData} rowClass="gap-0" />
        </div>
      </CommonLayout>
    );
  }

  const data = await response.json();

  return (
    <>
      <CommonLayout
        menuParentUrl={data.parentUrl}
        hasDetail={true}
        menuIsClose={data.level === 1 ? true : false}
        menuData={data3}
        breadcrumbSegments={segments}
      >
        {data.level === 1 ? (
          <div className="pt-6 px-4 md:pt-0 md:px-0 w-full">
            <BreadCrumb
              segments={segments}
              className="lg:mx-8 md:mx-6 md:mt-10 mx-0 mb-4"
            />
            <FaqStep1 data={data} />
          </div>
        ) : (
          <FaqStep2 data={data} />
        )}
      </CommonLayout>
    </>
  );
}
