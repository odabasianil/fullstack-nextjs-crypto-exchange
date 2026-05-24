import clsx from "clsx";
import { forwardRef, FocusEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import Image from "next/image";

interface phoneModeProps {
  flag: string;
  phone: string;
}
interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string | any;
  labelStyle?: "default" | "floating";
  labelClassName?: string;
  wrapperClassName?: string;
  error?: any;
  required?: boolean;
  hideErrorMessage?: boolean;
  errorClassName?: string;
  isClearable?: boolean;
  isPassword?: boolean;
  clearIconSize?: number;
  disabled?: boolean;
  value?: string;
  isCreditCard?: boolean;
  maskformat?: string;
  clearIconClass?: string;
  counter?: boolean;
  getCode?: boolean;
  onGetCodeClick?: () => void;
  pasteMode?: boolean;
  onPasteClick?: () => void;
  phoneInput?: phoneModeProps;
  onPhoneClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    id,
    label,
    labelStyle,
    labelClassName,
    wrapperClassName,
    error,
    required = false,
    hideErrorMessage = false,
    errorClassName,
    isClearable = false,
    isPassword = false,
    clearIconSize = 20,
    disabled = false,
    value = "",
    isCreditCard = false,
    maskformat = "",
    clearIconClass = "",
    counter = false,
    getCode = false,
    pasteMode = false,
    onGetCodeClick,
    onPasteClick,
    onChange,
    onPhoneClick,
    phoneInput,
    ...rest
  } = props;
  const inputClass = twMerge(
    clsx(
      "bg-transparent h-[46px] rounded-lg px-4",
      "focus-visible:outline-none",
      error
        ? "!border !border-error focus:border-error"
        : "border border-white-400 dark:border-gray-300",
      disabled && "dark:text-background-700 text-white-700",
      phoneInput?.phone && "pl-[90px]"
    ),
    props.className
  );
  const inputProps: any = {
    id,
    ref,
    className: inputClass,
    disabled: disabled,
    value: value,
  };

  const [count, setCount] = useState("0");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleCounterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const ClearButton = () => {
    if (!props.value) return null;

    return (
      <div
        onClick={() => props.onChange?.({ target: { value: "" } } as any)}
        className={twMerge(
          "absolute right-2 top-1/2 cursor-pointer transform -translate-y-1/2",
          isPassword ? "right-10" : "right-2",
          counter && "right-12"
        )}
      >
        <Icon
          name="circle-close"
          size={clearIconSize}
          className={twMerge(
            clsx("text-gray-300 dark:text-gray-500", clearIconClass)
          )}
        />
      </div>
    );
  };

  const Counter = () => {
    return (
      <div className="text-sm dark:text-gray-900 text-white-1000 absolute right-4 top-1/2 cursor-pointer transform -translate-y-1/2">
        {count.length}/50
      </div>
    );
  };

  const PasteMode = () => {
    return (
      <div
        onClick={onPasteClick}
        className="absolute right-4 top-1/2 cursor-pointer transform -translate-y-1/2 text-sm text-primary-200 dark:text-primary-100"
      >
        Paste
      </div>
    );
  };

  const GetCode = () => {
    return (
      <div
        className="absolute right-4 top-1/2 cursor-pointer transform -translate-y-1/2 text-sm"
        onClick={() => {
          setIsCodeSent(true);
          if (onGetCodeClick) onGetCodeClick();
        }}
      >
        <div className="dark:text-primary-100 text-primary-200">
          {!isCodeSent ? (
            <div className="animation-shake">Get Code</div>
          ) : (
            <div className="flex items-center">
              <div className="text-sm text-gray mr-1">Code Sent</div>
              <Icon name="payment-warning" size="20" className="text-gray" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const Label = () => {
    if (!label) return null;

    return (
      <label
        htmlFor={id}
        className={twMerge(
          clsx(
            "text-[11px] uppercase font-sans text-primary-400",
            "absolute left-4 top-1/2 pointer-events-none transition-all transform -translate-y-1/2",
            labelClassName
          )
        )}
      >
        {label} {required && <span className="text-error">*</span>}
      </label>
    );
  };

  const PhoneMode = () => {
    return (
      <div
        className="absolute left-2.5 top-1/2 transform -translate-y-1/2"
        onClick={onPhoneClick}
      >
        <div className="cursor-pointer flex gap-1 items-center">
          {phoneInput?.flag && (
            <Image
              src={phoneInput?.flag || ""}
              width="16"
              height={16}
              className=""
              alt=""
            />
          )}
          <div className="text-base text-black-200 dark:text-white-100">
            {phoneInput?.phone}
          </div>
          <Icon
            name="chevron-down"
            size={20}
            className={twMerge("text-gray ml-1 mr-2 min-w-4")}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={twMerge(clsx("flex flex-col"), wrapperClassName)}>
      <div
        className={twMerge(
          clsx(
            "relative flex flex-col",
            disabled && "dark:bg-gray-300 bg-gray-800"
          )
        )}
      >
        <>
          {labelStyle !== "floating" && <Label />}
          {counter && <Counter />}
          {isClearable && <ClearButton />}
          {getCode && <GetCode />}
          {pasteMode && <PasteMode />}
          {phoneInput && <PhoneMode />}
          {isCreditCard ? (
            <PatternFormat
              format={maskformat}
              mask=""
              {...rest}
              {...inputProps}
            />
          ) : (
            <input {...rest} {...inputProps} onChange={handleCounterChange} />
          )}
          {labelStyle === "floating" && <Label />}
        </>
      </div>
      {error && !hideErrorMessage && (
        <span
          className={twMerge(
            "mt-1 text-sm text-error-100 dark:text-error",
            errorClassName
          )}
        >
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";
