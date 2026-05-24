import { CoinCard } from "./coin-card"
import { HomeDownload } from "./download"
import { HomeFaq } from "./faq"
import { GetStarted } from "./get-started"
import { Mockup } from "./mockup"
import { NewsCard } from "./news-card"
import { RegisterBanner } from "./register-banner"

export const HomeView = () => {

  return (
    <>
      <div className="container mx-auto max-w-[1248px] w-full ">
        <div className="flex flex-col lg:flex-row justify-between py-6 lg:py-12">
          <div className="w-full lg:w-3/5">
            <GetStarted />
          </div>
          <div className="w-full lg:w-2/5 flex flex-col gap-4">
            <CoinCard />
            <NewsCard />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:gap-20 py-10 lg:py-20">
          <div className="w-full lg:w-1/2 flex justify-center">
            <Mockup />
          </div>
          <div className="hidden lg:flex justify-center w-1/2">
            <HomeDownload />
          </div>
        </div>
        <div className="w-full py-10 lg:py-20">
          <HomeFaq />
        </div>
      </div>
      <div className="bg-white-200 dark:bg-black-100">
        <RegisterBanner />
      </div>
    </>
  )
}