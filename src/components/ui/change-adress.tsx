import { useState } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Icon } from "./icon";
import Select from "./select";
import { Input } from "./input";

interface Address {
  autofill: string;
  location: string;
  postalCode: string;
}

const ChangeAdress = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState<Address>({
    autofill: "Autofill verified address",
    location: "Kağıthane, İstanbul, Turkey (Türkiye)",
    postalCode: "34000",
  });
  const [inputAddress, setInputAddress] = useState<Address>(address);
  const [value, setValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [postalValue, setPostalValue] = useState("");


  const options = [
    { label: 'Afghanistan', flag: 'https://bin.bnbstatic.com/image/countrylogo/AD.png', value:'1' },
    { label: 'Albania (Shqipëri)', flag: 'https://bin.bnbstatic.com/image/countrylogo/AE.png', value:'2' },
    { label: 'Algeria (‫الجزائر‬‎)', flag: 'https://bin.bnbstatic.com/image/countrylogo/AF.png', value:'3' },
    { label: 'Albania', flag: 'https://bin.bnbstatic.com/image/countrylogo/AG.png' , value:'4' },
    { label: 'Angola', flag: 'https://bin.bnbstatic.com/image/countrylogo/AI.png', value:'5' },
    { label: 'Albania (Shqipëri)', flag: 'https://bin.bnbstatic.com/image/countrylogo/AM.png', value:'6' },
    { label: 'Algeria', flag: 'https://bin.bnbstatic.com/image/countrylogo/AQ.png', value:'7' },
    { label: 'Algeria (‫الجزائر‬‎)', flag: 'https://bin.bnbstatic.com/image/countrylogo/AR.png', value:'8' },
  ];

  const handleChangeButton = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setAddress(inputAddress);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputAddress(address);
    setIsEditing(false);
  };

  const handleAdressChange = (e: any) => {
    setAddressValue(e.target.value);
  };
  const handleCityChange = (e: any) => {
    setCityValue(e.target.value);
  };
  const handlePostalChange = (e: any) => {
    setPostalValue(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col mt-2">
        {isEditing ? (
          <div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between pt-2.5 items-center w-full">
                <div className="flex items-center">
                  <Icon name="map" size={20} className="" />
                  <p className="font-normal pl-1 text-sm dark:text-white">
                    {address.autofill}
                  </p>
                </div>
                <div
                  onClick={handleCancel}
                  className="text-primary text-sm cursor-pointer"
                >
                  Fill
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-start">
              <label
                htmlFor=""
                className="text-sm dark:text-gray-100 text-gray-700 mb-1 text-left"
              >
                Country
              </label>
              <Select
                options={options}
                defaultValue="Select Country"
                className="flex w-full !h-[48px] text-xs mr-2"
                valueClass="px-1"
                isSearchable={true}
                value={value}
                setValue={setValue}
                listClass="w-full text-left flex items-center"
                selectedClass="dark:text-white text-black-100  "
                closeIcon={true}
              />
            </div>
            <div className="text-left mt-2 pt-4">
              <label
                htmlFor=""
                className="text-sm dark:text-gray-100 text-gray-700mb-1 text-left"
              >
                Address
              </label>
              <Input
                type="text"
                value={addressValue}
                className="h-[46px] rounded-[4px] text-sm"
                placeholder="Enter Adress"
                onChange={handleAdressChange}
              />
            </div>
            <div className="flex justify-between">
              <div className="text-left mt-2 pt-4 w-[48%]">
                <label
                  htmlFor=""
                  className="text-sm dark:text-gray-100 text-gray-700 mb-1 text-left"
                >
                  City
                </label>
                <Input
                  type="text"
                  value={cityValue}
                  onChange={handleCityChange}
                  className="h-[46px] rounded-[4px] text-sm"
                  placeholder="Enter City"
                  required={true}
                />
              </div>
              <div className="text-left mt-2 pt-4 w-[48%]">
                <label
                  htmlFor=""
                  className="text-sm dark:text-gray-100 text-gray-700mb-1 text-left"
                >
                  Postal Code
                </label>
                <Input
                  type="password"
                  value={postalValue}
                  onChange={handlePostalChange}
                  className="h-[46px] rounded-[4px] text-sm"
                  placeholder="Enter Postal Code"
                  required={true}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="flex justify-between pt-2.5 items-center w-full">
              <div className="flex items-center">
                <Icon name="map" size={20} className="" />
                <p className="font-normal pl-1 text-sm dark:text-white">
                  {address.autofill}
                </p>
              </div>
              <div
                onClick={handleChangeButton}
                className="text-primary text-sm cursor-pointer"
              >
                Change
              </div>
            </div>
            <div className="flex flex-col items-start mt-2">
              <p className="mb-2 text-sm daark:text-white font-medium">
                {address.location}
              </p>
              <p className="text-sm daark:text-white font-medium0">
                Postal Code: {address.postalCode}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChangeAdress;
