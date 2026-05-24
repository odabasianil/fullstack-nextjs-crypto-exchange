import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import data from "@/data/locale/currencies.json";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { userService } from "@/core/services/auth/user.service";
import { UpdateUser } from "@/core/store/reducers/user.slice";
import { twMerge } from "tailwind-merge";

export const SelectCurrency = ({isOnlyShow = false}: {isOnlyShow?: boolean}) => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<any>([]);

  const handleSearch = (value: string) => {
    const filteredResult = data.filter((item) => item.name.toLocaleUpperCase().includes(value.toLocaleUpperCase()));
    setResult(filteredResult);
  }
  const handleChange = (e: any) => {
    setValue(e.target.value);

    handleSearch(e.target.value);
  }

  const dispatch = useDispatch();
  const user = userService.getUser();

  const [activeCurrency, setActiveCurrency] = useState('TRY');
  useEffect(() => {
    if(!user) return;
    setActiveCurrency(user?.fiatCurrency);
  }, [user]);


  const changeCurrency = (e: any, item: any) => {
    e.preventDefault();
    if(!user) return;
    const updateUser =  {
      ...user,
      fiatCurrency: item.link
    };
    dispatch(UpdateUser(updateUser));
    setActiveCurrency(item.link);
  }
  
  return (
    <>
      <div>
        {!isOnlyShow && <p className="text-sm mb-4 text-gray">Para birimi</p>}
        <div>
          <Input
            type="text"
            placeholder="Ara"
            value={value}
            onChange={handleChange}
            className="px-3 h-[30px] placeholder:font-medium hover:border-primary focus:border-primary w-full"
            wrapperClassName="mb-4"
          />
          <div className="flex flex-col gap-4 h-[calc(100vh-268px)] md:h-[300px] overflow-y-auto font-semibold">
            {
              (result?.length > 0 || value) ? result?.map((item: any, index: number) => (
                <Link href="#" 
                  key={index} 
                  className={twMerge(
                    "text-sm text-black-100 dark:text-white-100 hover:!text-primary",
                    activeCurrency === item.link && '!text-primary'
                  )}
                  onClick={(e) => changeCurrency(e, item)}
                  >
                  <p>{item.name}</p>
                </Link>
              )) : data.map((item: any, index: number) => (
                <Link href="#" key={index} 
                  className={twMerge(
                    "text-sm text-black-100 dark:text-white-100 hover:!text-primary",
                    activeCurrency === item.link && '!text-primary'
                  )}
                  onClick={(e) => changeCurrency(e, item)}>
                  <p>{item.name}</p>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}