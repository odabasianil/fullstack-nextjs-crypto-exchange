import { Button } from "@/components/ui/button";
import { CountryModal } from "@/components/ui/country-modal";
import { Icon } from "@/components/ui/icon";
import Image from "next/image"
import { useState } from "react";

export const Step1 = (props: any) => {
  const { setStep } = props;
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    "code": "TR",
    "en": "Turkey (Türkiye)",
    "countryImageUrl": "https://bin.bnbstatic.com/image/countrylogo/TR.png",
  });

  const handleContinue = () => {
    setStep(2);
  }

  return (
    <>
      <div className="order-2 md:order-none flex mt-[4rem] px-4 md:p-0 md:ml-[7rem]">
        <div className="flex flex-col w-full md:w-[436px]">
          <div className="text-[2rem] leading-10 font-medium">
            Doğrulamanızı tamamlayalım
          </div>
          <div className="min-h-[572px]">
            <p className="mt-2 text-gray-100">İkamet ettiğiniz yeri seçin ve belirtilen adımları takip edin</p>
            <p className="mt-6 text-sm">İkamet</p>
            <div className="pl-3 pr-6 text-sm flex justify-between items-center cursor-pointer w-full border border-gray-300 rounded-[4px] mt-1 h-12" onClick={() => setOpen(true)}>
              <div className="flex gap-2 items-center">
                <Image
                  src={selectedCountry.countryImageUrl}
                  alt={selectedCountry.en}
                  width={24}
                  height={24}
                  className="rounded-sm"
                />
                <div>{selectedCountry.en}</div>
              </div>
            </div>
            <div className="my-6 text-gray-100">Hesabınızı doğrulamak adına aşağıdaki adımları <b className="text-white-100">7 dakika </b>içinde tamamlayın</div>
            <div className="flex items-center gap-2 text-sm text-gray-100">
              <Icon
                name="identity"
                size={16}
                className="text-gray-100"
              />
              Kişisel veriler
            </div>
            <div className="mt-6 mb-4 font-medium">Rehber</div>
            <div className="flex items-center gap-2 text-sm text-gray-100 cursor-pointer">
              <Icon
                name="play"
                size={16}
                className="text-gray-100"
              />
              <div className="underline">
                Kimliğimi nasıl doğrularım?
              </div>
            </div>
            <Button
              appearance="primary"
              className="mt-12 h-[38px] text-sm rounded-[4px] w-[208px]"
              onClick={handleContinue}
            >
              Devam
            </Button>
          </div>
        </div>
      </div>
      <CountryModal
        open={open}
        setOpen={setOpen}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </>
  )
}