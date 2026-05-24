import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import InfoTooltip from "../../../components/ui/info-tooltip";

interface PaymentModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  paymentMethods: {
    category: string;
    options: {
      name: string;
      price: string;
      icon: string;
      warningIcon?: string;
    }[];
  }[];
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  setOpen,
  paymentMethods,
}) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [tooltipTarget, setTooltipTarget] = useState<HTMLElement | null>(null);

  const handleMouseEnter = (iconName: string, target: HTMLElement) => {
    setShowTooltip(iconName);
    setTooltipTarget(target);
  };

  const handleMouseLeave = () => {
    setShowTooltip(null);
    setTooltipTarget(null);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (optionName: any) => {
    setSelectedOption(optionName);
  };

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        className="md:w-[520px] flex flex-col items-center text-center"
        showCloseButton={true}
        isBackdropClickable={false}
        title="Pay With"
        isMobileOpen={true}
      >
        <div className="h-[488px] text-white-100 font-medium w-full">
          {paymentMethods.map((method: any) => (
            <div key={method.category}>
              <div className="mb-3">
                <div className="leading-6 flex justify-between w-full">
                  <div className="dark:text-gray-100 text-gray-300 text-xs font-medium">
                    {method.category}
                  </div>
                  <div className="dark:text-gray-100 text-black-300 text-xs font-medium">
                    Price
                  </div>
                </div>
              </div>
              {method.options.map((option: any) => (
                <div
                  key={option.name}
                  onClick={() => handleClick(option.name)}
                  className={`p-[15px] border ${
                    selectedOption === option.name
                      ? "dark:border-white border-secondary"
                      : "dark:border-secondary border-white-100"
                  } rounded-[10px] flex justify-center items-start flex-col mb-3 relative cursor-pointer group`}
                >
                  <div className="flex justify-between items-center w-full">
                    <Icon name={option.icon} size={24} className="mr-3" />
                    <div className="text-left flex-1 flex items-center text-sm font-medium dark:text-white text-gray-300">
                      {option.name}
                      {option.warningIcon && (
                        <div
                          className="relative"
                          onMouseEnter={(e) =>
                            handleMouseEnter(option.name, e.currentTarget)
                          }
                          onMouseLeave={handleMouseLeave}
                        >
                          <Icon
                            name="payment-warning"
                            size={16}
                            className="ml-1 text-gray cursor-pointer hover:text-primary"
                          />
                        </div>
                      )}
                    </div>
                    <div className="text-right text-white-100 text-sm font-normal">
                      {option.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Button
          appearance="primary"
          className="w-full h-12 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          Confirm
        </Button>
      </Modal>
      {tooltipTarget && (
        <InfoTooltip
          text="Wello is a third party payment provider."
          targetRef={{ current: tooltipTarget }}
          visible={showTooltip !== null}
          className="bg-gray-600"
          arrowClass="bg-gray-600"
        />
      )}
    </>
  );
};
