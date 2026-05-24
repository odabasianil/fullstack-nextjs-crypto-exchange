import { Icon } from "./icon";
import { Input } from "./input";
import { Modal } from "./modal";
import { useState } from "react";
import countries from "@/data/countries.json";
import Image from "next/image";

export const CountryModal = (props: any) => {
  const {open, selectedCountry, setSelectedCountry, setOpen} = props;
  const [value, setValue] = useState('');

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <>  
      <Modal
        open={open}
        setOpen={setOpen}
        className="py-0 min-w-[300px] rounded-md w-min"
      >
        <div className="flex justify-between items-center h-16">
          <p className="text-xl font-medium">Ülke / Bölge</p>
          <Icon
            name="close"
            size={24}
            onClick={() => setOpen(false)}
            className="cursor-pointer text-gray-100"
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Ara"
            value={value}
            onChange={handleChange}
            label={<Icon name="search" size={16} color="transparent" />}
            wrapperClassName="w-full"
            className="pl-10 w-full md:w-[336px] h-10 rounded-[4px] hover:border-primary focus:border-primary placeholder:text-gray-100 placeholder:font-semibold"
            isClearable
            clearIconSize={16}
          />
        </div>
        <ul className="my-2 h-[320px] overflow-auto -mx-6">
          {
            countries.map((country: any) => (
              country.en.toLowerCase().includes(value.toLowerCase()) && (
                <li
                  key={country.en}
                  className="px-6 py-2 text-sm cursor-pointer w-full h-12"
                  onClick={() => {
                    setSelectedCountry(country);
                    setOpen(false);
                  }}
                >
                  <div className="flex gap-4 items-center font-semibold">
                    <Image
                      src={country.countryImageUrl}
                      alt={country.en}
                      width={24}
                      height={24}
                      className="rounded-sm"
                    />
                    <div>{country.en}</div>
                  </div>
                </li>
              )
            ))
          }
          {
            !countries.some((country: any) => country.en.toLowerCase().includes(value.toLowerCase())) && (
              <li className="px-6 py-2 text-sm text-gray-100">
                <div className="pt-10 flex flex-col gap-6 items-center">
                <Image 
                  src="/images/no-result.svg" 
                  alt="No Result" 
                  width={96}
                  height={96}
                />
                <span>No records found</span>
              </div>
              </li>
            )
          }
        </ul>
      </Modal>
    </>
  )
} 