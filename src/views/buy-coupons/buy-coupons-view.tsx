"use client";

import { CouponCard } from "./coupon-card";
import data from "../../data/crypto/buy-crypto-btc.json";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const BuyCouponsView = () => {
  return (
    <>
      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-3 mt-8 lg:px-0 px-4">
        {data.map((item) => (
          <CouponCard className="">
            <div className="flex items-center lg:gap-4 gap-3">
              <div className="border-r border-dashed lg:pr-4 pr-2">
                <Image src={item?.image} width={120} height={120} alt={""} />
              </div>
              <div className="w-full">
                <div className="text-sm font-medium">
                  <div className="">{item?.currency}</div>
                  <div className="text-lg font-medium">${item.amount}</div>
                </div>
                <div className="lg:mt-4 mt-2">
                  <div className="text-xs font-normal">{item.description}</div>
                  <div className="text-xs font-normal text-primary dark:text-primary-100 mt-1">
                    {item.highlight}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href={`/buy-coupons/${item.symbol}/${item.id}`}
                className="w-full"
              >
                <Button
                  appearance="primary"
                  className="text-sm h-8 px-3 flex gap-2 items-center justify-center w-full text-center"
                >
                  Buy Coupon
                </Button>
              </Link>
            </div>
          </CouponCard>
        ))}
      </div>
    </>
  );
};
