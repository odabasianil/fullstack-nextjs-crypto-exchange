import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import data from "@/data/locale/languages.json";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { UpdateUser } from "@/core/store/reducers/user.slice";
import { userService } from "@/core/services/auth/user.service";
import { twMerge } from "tailwind-merge";
import { getCookie, setCookie } from "cookies-next";
import i18n from "@/i18n";

export const SelectLanguage = ({
  isOnlyShow = false,
}: {
  isOnlyShow?: boolean;
}) => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<any>([]);

  const handleSearch = (value: string) => {
    const filteredResult = data.filter((item) =>
      item.name.toLocaleUpperCase().includes(value.toLocaleUpperCase())
    );
    setResult(filteredResult);
  };

  const handleChange = (e: any) => {
    handleSearch(e.target.value);
  };

  const dispatch = useDispatch();
  const user = userService.getUser();
  const language = userService.getlanguage();

  const [activeLanguage, setActiveLanguage] = useState('tr');

  useEffect(() => {
    console.log('language', language);
    if(language){
      setActiveLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    if(!user) return;
    setActiveLanguage(user?.language);
    console.log('user.language', user?.language);
  }, [user]);


  const changeLanguage = async (e: any, item: any) => {
    e.preventDefault();
    setCookie('language', item.link, { maxAge: 60 * 60 * 24 * 365 });
    setActiveLanguage(item.link);
    i18n.changeLanguage(item.link);

    //eğer login olmuş biriyse user bilgilerini güncelle
    if(!user) return;
    const updateUser =  {
      ...user,
      language: item.link
    };
    dispatch(UpdateUser(updateUser));

    var updateResult = await userService.updateUserInfos({
      fiatCurrency: undefined,
      language: item.link,
      userAlias: undefined,
    });
    if(updateResult.success){
      console.log(updateResult.data);
    } else {
      console.log(updateResult.messageList[0].message);
    }
  }

  return (
    <>
      <div>
        {!isOnlyShow && <p className="text-sm mb-4 text-gray">Dil</p>}
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
            {result?.length > 0 || value
              ? result?.map((item: any, index: number) => (
                  <Link
                    href="#"
                    onClick={(e) => changeLanguage(e, item)}
                    key={index}
                    className={twMerge(
                      "text-sm text-black-100 dark:text-white-100 haver:!text-primary",
                      activeLanguage === item.link && '!text-primary'
                    )}
                  >
                    <p>{item.name} {user?.language == item.link ? '*':''}</p>
                  </Link>
                ))
              : data.map((item: any, index: number) => (
                  <Link
                    href="#"
                    key={index}
                    onClick={(e) => changeLanguage(e, item)}
                    className={twMerge(
                      "text-sm text-black-100 dark:text-white-100 haver:!text-primary",
                      activeLanguage === item.link && '!text-primary'
                    )}
                  >
                    <p>{item.name} {user?.language == item.link ? '*':''}</p>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};
