import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"

export const AccountSquare = () => {

  return (
    <div className="md:border border-white-100 dark:border-secondary rounded-2xl mb-4 px-4 md:px-0">
      <div className="pb-6 md:pb-3 md:p-6 flex items-center justify-between">
        <div className="text-2xl font-semibold">Square</div>
        <Link target="_blank" href="/en/square/profile/square-creator-d4fc42eb075a" className="flex items-center gap-0.5 h-8">
          <div className="text-sm font-semibold">More</div>
          <Icon name="chevron-left" size={16} className="text-gray-300 dark:text-gray rotate-180" />
        </Link>
      </div>
      <div className="md:pl-3 mr-2 overflow-y-auto lg:max-h-[560px]">
        {
          new Array(20).fill(null).map((_, index) => (
            <div key={index} className="flex items-center justify-between px-0 md:px-3 p-3">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/user.png"
                  width={40}
                  height={40}
                  alt="user"
                  className="rounded-lg"
                />
                <div>
                  <div>Coinspekaer</div>
                  <div className="text-xs text-gray-300 dark:text-gray whitespace-normal w-[200px] lg:w-[350px] text-ellipsis line-clamp-1 truncate">Trading Crypto Since 2016 | Mainly Focused on Technical analysis 🟢</div>
                </div>
              </div>
              <Button
                appearance="secondary"
                className="text-xs font-semibold h-6 w-20"
              >
                Follow
              </Button>
            </div>
          ))
        }
      </div>
    </div>
  )
}