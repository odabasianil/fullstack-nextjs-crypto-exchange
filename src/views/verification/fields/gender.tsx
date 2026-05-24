import { RadioButton } from "@/components/ui/radio";
import { twMerge } from "tailwind-merge";

export const GenderField = ({ selected, setSelected, field }: any) => {
    
  const handleChangeGender = (value: string) => {
    setSelected(value);
  };

  return (
    <div className={twMerge("my-3 flex flex-col gap-1")} style={{ order: field?.sortOrder }}>
      <label className="text-sm text-gray-100">{field?.fieldName}</label>
      <div className="flex items-center gap-4">
        {["Male", "Female", "Other"].map((gender) => (
          <RadioButton
            key={gender}
            label={gender}
            name="gender"
            tabIndex={field?.sortOrder}
            checked={selected === gender}
            value={gender}
            onChange={handleChangeGender}
          />
        ))}
      </div>
    </div>
  )
};