import { Button } from "@/components/ui/button";
import { CountryModal } from "@/components/ui/country-modal";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { setCookie } from "@/utils/set-cookie";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Step2 = (props: any) => {
  const router = useRouter();
  const { setStep } = props;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdayYear, setBirthdayYear] = useState('');
  const [birthdayMonth, setBirthdayMonth] = useState('');
  const [birthdayDay, setBirthdayDay] = useState('');
  const [tcIdentity, setTcIdentity] = useState('');

  const [selectedCountry, setSelectedCountry] = useState({
    "code": "TR",
    "en": "Turkey (Türkiye)",
    "countryImageUrl": "https://bin.bnbstatic.com/image/countrylogo/TR.png",
  });

  const goBack = () => {
    setStep(1);
  }

  const handleContinue = () => {
    setCookie('isLogin', 'true', 365);
    window.location.href = '/me/dashboard';
  }

  const handleChangeName = (e: any) => {
    setName(e.target.value);
  }

  const handleChangeSurname = (e: any) => {
    setSurname(e.target.value)
  }

  const handleChangeBirthdayYear = (e: any) => {
    setBirthdayYear(e.target.value)
  }

  const handleChangeBirthdayMonth = (e: any) => {
    setBirthdayMonth(e.target.value)
  }

  const handleChangeBirthdayDay = (e: any) => {
    setBirthdayDay(e.target.value)
  }

  const handleChangeTcIdentity = (e: any) => {
    setTcIdentity(e.target.value)
  }
  return (
    <>
      <div className="order-2 md:order-none flex mt-[4rem] px-4 md:p-0 md:ml-[7rem]">
        <div className="flex flex-col w-full md:w-[436px]">
          <div className="text-[2rem] leading-10 font-medium">
            Kişisel Veriler
          </div>
          <div className="min-h-[200px] w-full">
            <p className="mt-6 text-sm">Uyruk</p>
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
            <div className="my-6 text-sm">Lütfen adınızı tam olarak resmi belgenizde göründüğü gibi girin.&& 2. Yalnızca Türkçe karakterler.</div>
            
            <div className="mt-3 grid grid-cols-2 gap-1 items-center w-full">
              <div>
                <label htmlFor="" className="text-sm text-gray-100 mb-1">Ad</label>
                <Input
                  type="text"
                  value={name}
                  onChange={handleChangeName}
                  className="h-[46px] rounded-[4px] text-sm"
                />
              </div>
              <div>
                <label htmlFor="" className="text-sm text-gray-100 mb-1">Soyad</label>
                <Input
                  type="text"
                  value={surname}
                  onChange={handleChangeSurname}
                  className="h-[46px] rounded-[4px] text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-gray-100">Doğum Tarihi</label>
              <div className="grid grid-cols-3 gap-[7px] items-center">
                <Input
                  type="text"
                  className="h-[46px] rounded-[4px] text-sm"
                  placeholder="YYYY"
                  value={birthdayYear}
                  onChange={handleChangeBirthdayYear}
                  maxLength={4}
                />
                <Input
                  type="text"
                  className="h-[46px] rounded-[4px] text-sm"
                  placeholder="AA"
                  value={birthdayMonth}
                  onChange={handleChangeBirthdayMonth}
                  maxLength={2}
                />
                <Input
                  type="text"
                  className="h-[46px] rounded-[4px] text-sm"
                  placeholder="GG"
                  value={birthdayDay}
                  onChange={handleChangeBirthdayDay}
                  maxLength={2}
                />
              </div>
            </div>
            <div className="my-3 flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-gray-100 ">Türkiye Cumhuriyeti Kimlik Numarası (T.C. Kimlik No.)</label>
              <Input
                type="text"
                className="h-[46px] rounded-[4px] text-sm"
                value={tcIdentity}
                onChange={handleChangeTcIdentity}
                maxLength={11}
              />
            </div>
            <div className="text-primary-200 underline cursor-pointer text-xs" onClick={() => setStep(1)}>
              Türkiye Cumhuriyeti kimlik numarasına sahip değilim 
            </div>
            <div className="mt-12 flex items-center gap-4">
              <button onClick={goBack} className="bg-transparent border-none flex gap-1 items-center px-4 h-12 text-sm hover:text-primary">
                <Icon name="chevron-left" size={16} />
                Geri
              </button>
              <Button
                appearance="primary"
                className="h-[38px] text-sm rounded-[4px] w-[212px]"
                onClick={handleContinue}
              >
                Devam et
              </Button>
            </div>
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