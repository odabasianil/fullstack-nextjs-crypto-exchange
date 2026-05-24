import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string | any;
  className?: string;
  labelClassName?: string;
  error?: any;
  required?: boolean;
  errorClassName?: string;
  coin?: string;
  tooltipLabel?: string;
  onChange?: (e: any) => void;
  step?: number;
  min?: number;
}


export const PriceInput = (props: InputProps) => {
  const {
    label,
    coin,
    tooltipLabel,
    labelClassName,
    onChange,
    className,
    step,
    min,
    max,
    ...rest
  } = props;
  const [openTooltip, setOpenTooltip] = useState(false);

  const handleOpenTooltip = () => {
    setOpenTooltip(true);
  }

  const handleBlur = () => {
    setOpenTooltip(false);
  }

  const handleChange = (e: any) => {
    if (e.target.value) {
      if (max && (e.target.value > max)) {
        return;
      }
      if (min && (e.target.value < min)) {
        return;
      }
    }

    onChange && onChange(e);
  }

  return (
    <div
      onFocus={handleOpenTooltip}
      onBlur={handleBlur}
      className={twMerge(
        "text-sm p-[1px] flex items-center rounded leading-10 relative",
        "w-full h-10 bg-white-300 dark:bg-black-600 dark:md:bg-secondary border border-transparent hover:border-primary",
        className
      )}>
      {label && <div className={twMerge("flex-shrink text-gray min-w-12 text-ellipsis whitespace-nowrap text-xs text-left ml-2", labelClassName)}>
        {label}
      </div>}
        {(openTooltip && tooltipLabel) && <div className="absolute bottom-12 rounded-md right-0 h-8 flex items-center px-3 dark:bg-gray-200 text-sm font-medium z-30">
          <div className="absolute w-2 h-2 rotate-45 -bottom-1 left-1/2 z-40 dark:bg-gray-200"></div>
          {tooltipLabel}
        </div>}
        <input
          type="number"
          onChange={handleChange}
          step={step}
          min={min}
          className={twMerge(
            'px-1 text-right bg-transparent border-none w-full h-full',
            'focus-visible:outline-none'
          )}
          {...rest}
        />
      {coin && <div className=" mx-2 text-right text-xs flex-shrink text-ellipsis whitespace-nowrap">
        {coin}
      </div>}
    </div>
  )
}