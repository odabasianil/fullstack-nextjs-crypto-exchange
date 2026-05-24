'use client'

import { Button } from "@/components/ui/button"
import { CountryModal } from "@/components/ui/country-modal"
import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Step1 } from "./step-1"
import { Step2 } from "./step-2"

export const VerificationView = () => {
  const [step, setStep] = useState(1);
  
  return (
    <>
      <div className="w-full flex flex-1 bg-[rgb(30,35,41)]">
        <div className="flex flex-col md:grid grid-cols-[1fr_2fr_1fr]">
          <div className="hidden md:block relative">
            <Image
              src="/images/verification-bg.svg"
              alt="Verification"
              width={352}
              height={901}
            />
            <Image
              src={`/images/verification-${step}.svg`}
              alt="Verification"
              width={352}
              height={480}
              className="absolute bottom-[10rem] left-0"
            />
          </div>
          {step === 1 && <Step1 setStep={setStep} />}
          {step === 2 && <Step2 setStep={setStep} />}
          <div>
            <Link
              href="/"
              className="order-1 md:order-none w-fit rounded-sm py-1.5 px-3 flex items-center text-sm bg-transparent hover:bg-gray-200 mt-16 "
            >
              <Icon
                name="save"
                size={16}
                className="text-gray-100 mx-1"
              />
              Kaydet ve Çık
            </Link>
          </div>
        </div>
      </div>

    </>
  )
}