
import { Input } from "@/components/ui/input";
import { KYCField } from "@/core/models/auth/models/kyc.model";
import { twMerge } from "tailwind-merge";

export const DateField = ({
  birthDate,
  handleBirthDateChange,
  field,
  error
}: {
  birthDate: { year: string; month: string; day: string };
  handleBirthDateChange: (key: "year" | "month" | "day", value: string) => void;
  field: KYCField;
  error: string;
}) => {

  return (
    <div className={twMerge("w-full my-3 flex flex-col gap-1")} style={{ order: field?.sortOrder }}>
      <label className="text-sm text-gray-100">{field?.fieldName}</label>
      <div className="grid grid-cols-3 gap-[7px] items-center">
        {(["day", "month", "year"] as const).map((value: "year" | "month" | "day") => (
          <Input
            type="text"
            className={twMerge(
              "rounded-[4px] text-sm",
              error && "!border-error"
            )}
            tabIndex={field?.sortOrder}
            maskformat={value === "year" ? "####" : "##"}
            value={birthDate[value]}
            placeholder={value === "year" ? "YYYY" : value === "month" ? "MM" : "DD"}
            maxLength={value === "year" ? 4 : 2}
            onChange={(e: any) => handleBirthDateChange(value, e.target.value)}
          />
        ))}
      </div>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
};
