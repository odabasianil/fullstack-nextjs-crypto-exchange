import { CountryModal } from "@/components/ui/country-modal"
import Image from "next/image"
import { useState } from "react";

export const CountryField = ({ country, setCountry, field }: any) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <div className="my-3" style={{ order: field?.sortOrder }}>
        <p className="text-gray-100 text-sm">{field?.fieldName}</p>
        <div
          tabIndex={field?.sortOrder}
          className="pl-3 pr-6 flex items-center cursor-pointer border border-gray-300 rounded-[4px] mt-1 h-12"
          onClick={() => setOpen(true)}
        >
          <Image src={country.countryImageUrl} alt={country.en} width={24} height={24} className="rounded-sm" />
          <span className="ml-2">{country.en}</span>
        </div>
      </div>
      <CountryModal open={open} setOpen={setOpen} selectedCountry={country} setSelectedCountry={setCountry} />
    </>
  )
};