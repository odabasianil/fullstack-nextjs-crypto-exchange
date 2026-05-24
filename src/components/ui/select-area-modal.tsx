import { Modal } from "./modal";
import countries from "@/data/phone-country.json";
import Image from "next/image";
import { Input } from "./input";
import { Icon } from "./icon";
import { useState } from "react";

interface SelectAreaModalInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAreaClick?: ({ flag, code }: { flag: string; code: string }) => void;
}

export const SelectAreaModal = (props: SelectAreaModalInterface) => {
  const { open, setOpen, onAreaClick = () => {} } = props;
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        className="md:w-[360px] h-fit overflow-hidden max-w-[80vw] w-full md:max-h-[488px]"
        title="Select area Code"
        showCloseButton={true}
        backdropClassName="z-50"
      >
        <div className="px-3">
          <Input
            type="text"
            placeholder="Ara"
            value={value}
            onChange={handleChange}
            label={<Icon name="search" size={16} color="transparent" />}
            wrapperClassName="w-full"
            className="pl-10 w-full md:w-full h-10 rounded-[4px] hover:border-primary focus:border-primary placeholder:text-gray-100 placeholder:font-semibold"
            isClearable
            clearIconSize={16}
          />
        </div>
        <div className="px-4 overflow-auto h-96">
          {countries.map((country: any, index) => (
            <div
              key={index}
              className="flex h-[64px] justify-between items-center cursor-pointer"
              onClick={() => {
                onAreaClick?.({ flag: country.countryImageUrl, code: country.mobileCode });
              }}
            >
              <div className="flex gap-2.5 items-center">
                <Image
                  width={16}
                  height={16}
                  src={country.countryImageUrl}
                  alt=""
                />
                <div className="text-base text-black-200 dark:text-white-100">
                  {country.name}
                </div>
              </div>
              <div className="text-base text-black-200 dark:text-white-100">
                {country.mobileCode}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};
