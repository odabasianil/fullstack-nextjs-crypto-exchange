import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KYCField } from "@/core/models/auth/models/kyc.model";
import { kycService } from "@/core/services/user/kyc.service";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { DateField } from "./fields/datefield";
import { GenderField } from "./fields/gender";
import { CountryField } from "./fields/country";
import { ImageUploadField } from "./fields/upload";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export const VerificationForm = ({ moduleId, title, fields }: any) => {
  const toast = useToast();

  const [birthDate, setBirthDate] = useState({ year: "", month: "", day: "" });
  const [inputs, setInputs] = useState<any>([]);
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({}); // Track field errors
  const [selectedGender, setSelectedGender] = useState<"Male" | "Female" | "Other">('Other');
  const [selectedCountry, setSelectedCountry] = useState({
    "code": "TR",
    "en": "Turkey",
    "countryImageUrl": "/images/countries/tr.svg",
  });

  const handleBirthDateChange = (key: "year" | "month" | "day", value: string) => {
    setBirthDate((prev) => ({ ...prev, [key]: value }));
  };

  const validateFields = (data: any) => {
    const newErrors: Record<string, string> = {};

    console.log(data);

    fields?.forEach((field: KYCField) => {
      const inputValue = data?.answers?.find((input: any) => input.fieldId === field.moduleFieldId)?.value;

      console.log(inputValue)
      if (field.isRequired && !inputValue) {
        newErrors[field.fieldName] = `${field.fieldName} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      kycModuleID: moduleId,
      answers: [...inputs],
    };

    console.log(birthDate)

    const findField = (fieldName: string | number) => (
      fields?.find((field: KYCField) => field.fieldName === fieldName || field.fieldType === fieldName)
    )

    const getField = (fieldName: string | number) => ({
      fieldName: fields?.find((field: KYCField) => field.fieldName === fieldName || field.fieldType === fieldName)?.fieldName,
      fieldId: fields?.find((field: KYCField) => field.fieldName === fieldName || field.fieldType === fieldName)?.moduleFieldId,
    });

    if (findField(5) && birthDate.day && birthDate.month && birthDate.year) {
      data?.answers?.push({
        value: `${birthDate.day}.${birthDate.month}.${birthDate.year}`,
        ...getField(5),
      });
    }
    if (findField("Gender")) {
      data?.answers?.push({ value: selectedGender, ...getField("Gender") });
    }
    if (findField(6) && image) {
      data?.answers?.push({ value: stripBase64Header(image), ...getField(6) });
    }
    if (findField("Nationality")) {
      data?.answers?.push({ value: selectedCountry?.en, ...getField("Nationality") });
    }
    if (findField("Country")) {
      data?.answers?.push({ value: selectedCountry?.en, ...getField("Country") });
    }

    if (!validateFields(data)) {
      console.log("Validation failed.");
      return;
    }

    kycService.kycSubmit(data)
      .then((res: any) => {
        if (res.success) {
          toast?.open(res?.data?.message, 'check-circle', '', 'text-success')
          window.location.href = '/me/settings/kyc'
        } else {
          toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error')
        }
      })
      .catch((err) => {
        toast?.open(err?.response?.data?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
      });
  }
  console.log(errors)

  const stripBase64Header = (base64: string) => base64?.split(",")?.[1];

  const handleChange = (e: any, field: KYCField) => {
    const regex = new RegExp(field?.validationRule);
    if (regex.test(e.target.value) || e.target.value === '') {
      setInputs((inputs: any) => {
        const newInputs = inputs?.filter((input: any) => input.fieldName !== field.fieldName);
        return [
          ...newInputs,
          {
            value: e.target.value,
            fieldName: field.fieldName,
            fieldId: field.moduleFieldId
          }
        ];
      })
    }
  }

  return (
    <>
      <div className="order-2 md:order-none flex mt-[4rem] px-4 md:p-0 md:ml-[7rem]">
        <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-[436px]">
          <div>
            <Link
              href="/me/settings/kyc"
              className="order-1 md:order-none w-fit rounded-sm py-1 pr-2 flex items-center bg-transparent hover:bg-gray hover:dark:bg-secondary mb-4"
            >
              <Icon
                name="chevron-left"
                size={24}
                className="text-gray-100 mx-1"
              />
              Geri
            </Link>
          </div>
          <div className="text-[2rem] leading-10 font-medium">
            {title}
          </div>
          <div className="min-h-[200px] w-full flex flex-col mt-4">
            {
              fields?.map((field: KYCField) => {
                if (field?.fieldName === 'Gender') {
                  return (
                    <GenderField
                      selected={selectedGender}
                      setSelected={setSelectedGender}
                      field={field}
                    />
                  )
                }
                if (field?.fieldName === 'Nationality' || field?.fieldName === 'Country') {
                  return (
                    <CountryField
                      country={selectedCountry}
                      setCountry={setSelectedCountry}
                      field={field}
                    />
                  )
                }
                if (field?.fieldType === 6) {
                  return (
                    <ImageUploadField
                      image={image}
                      setImage={setImage}
                      field={field}
                      error={errors?.[field.fieldName]}
                    />
                  )
                }
                if (field?.fieldType === 5) {
                  return (
                    <DateField
                      birthDate={birthDate}
                      handleBirthDateChange={handleBirthDateChange}
                      field={field}
                      error={errors?.[field.fieldName]}
                    />
                  )
                }
                return (
                  <div className={twMerge("my-3 flex flex-col gap-1")} style={{ order: field?.sortOrder }}>
                    <label htmlFor="" className="text-sm text-gray-100 ">{field?.fieldName}</label>
                    <Input
                      type="text"
                      className="h-[46px] rounded-[4px] text-sm"
                      value={inputs?.find((input: any) => input.fieldName === field.fieldName)?.value}
                      placeholder={field?.description}
                      onChange={(e: any) => handleChange(e, field)}
                      maxLength={field?.maxLength}
                      tabIndex={field?.sortOrder}
                      required={field?.isRequired}
                      error={errors?.[field.fieldName]}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Button
              appearance="primary"
              className="h-[38px] text-sm rounded-[4px] w-[212px]"
              tabIndex={fields?.length + 1}
              type="submit"
            >
              Devam et
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}