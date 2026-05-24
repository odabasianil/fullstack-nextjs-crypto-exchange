import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import ChangeAdress from "@/components/ui/change-adress";
import { WarningModal } from "@/views/auth/login-password/warning-modal";

interface CartModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const CartModal: React.FC<CartModalProps> = ({ open, setOpen }) => {
  const [value, setValue] = useState("");
  const [expiryValue, setExpiryValue] = useState("");
  const [cvvValue, setCvvValue] = useState("");
  const [creditCardError, setCreditCardError] = useState("");
  const [expiryError, seteEpiryError] = useState("");
  const [openWarning, setOpenWarning] = useState(false);

  const handleChange = (e: any) => {
    const cardNumber = e.target.value.replace(/\D/g, "");
    setValue(e.target.value);

    if (cardNumber.length < 12 || cardNumber.length > 19) {
      setCreditCardError("The card number must be within 12-19 digits");
    } else {
      setCreditCardError("");
    }

    if (cardNumber.length === 9) {
      setCreditCardError("");
    }
  };

  const handleExpiryChange = (e: any) => {
    const expiry = e.target.value.replace(/\D/g, "");
    setExpiryValue(e.target.value);

    if (expiry.length < 4) {
      seteEpiryError("Enter a valid expiry date");
    } else {
      seteEpiryError("");
    }
  };

  const handleCvvChange = (e: any) => {
    setCvvValue(e.target.value);
  };

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        className="md:w-[484px] flex flex-col items-center text-center"
        showCloseButton={true}
        isBackdropClickable={false}
        title="Add New Card"
        description="Enter card information and billing address"
        isMobileOpen={true}
      >
        <div className="w-full">
          <div className="w-full max-h-[428px] mb-6 overflow-auto">
            <div className="text-left mt-2 pt-4">
              <label
                htmlFor=""
                className="text-sm dark:text-gray-100 text-gray-700 mb-1 text-left"
              >
                Name
              </label>
              <Input
                value="John Doe"
                disabled={true}
                type="text"
                className="h-[46px] rounded-[4px] text-sm"
              />
            </div>
            <div className="text-left mt-2 pt-4">
              <label
                htmlFor=""
                className="text-sm dark:text-gray-100 text-gray-700 mb-1 text-left"
              >
                Credit or Debit Card
              </label>
              <Input
                isCreditCard={true}
                type="text"
                value={value}
                onChange={handleChange}
                className="h-[46px] rounded-[4px] text-sm"
                placeholder="Enter card number"
                maskformat="#### #### #### ####"
                error={creditCardError}
              />
            </div>
            <div className="flex justify-between">
              <div className="text-left mt-2 pt-4 w-[48%]">
                <label
                  htmlFor=""
                  className="text-sm dark:text-gray-100 text-gray-700 mb-1 text-left"
                >
                  Expiry Date
                </label>
                <Input
                  isCreditCard={true}
                  maskformat="##/##"
                  type="text"
                  value={expiryValue}
                  onChange={handleExpiryChange}
                  className="h-[46px] rounded-[4px] text-sm"
                  placeholder="MM/YY"
                  required={true}
                  error={expiryError}
                />
              </div>
              <div className="text-left mt-2 pt-4 w-[48%]">
                <div className="flex items-center">
                  <label
                    htmlFor=""
                    className="text-sm dark:text-gray-100 text-gray-700 mb-1 text-left"
                  >
                    CVV/CVC
                  </label>
                  <div onClick={() => setOpenWarning(true)}>
                    <Icon
                      name="payment-warning"
                      size={16}
                      className="ml-1 text-gray cursor-pointer"
                    />
                  </div>
                </div>
                <Input
                  isCreditCard={true}
                  maskformat="###"
                  type="password"
                  value={cvvValue}
                  onChange={handleCvvChange}
                  className="h-[46px] rounded-[4px] text-sm"
                  placeholder="Enter CVV"
                  required={true}
                />
              </div>
            </div>
            <ChangeAdress />
          </div>
          <Button
            appearance="primary"
            disabledGray
            className="w-full h-12 flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            Confirm
          </Button>
        </div>
      </Modal>
      <WarningModal
        open={openWarning}
        setOpen={setOpenWarning}
        icon="cvv-icon"
        title="What is CVV/CVC?"
        textClass="order-[-1] mb-2 text-center"
        titleClass="order-[-1] mb-4"
        description="CVV/CVC is the three-digit number at the back of your credit card."
        className="pt-4 pr-6 pb-6"
      />
    </>
  );
};
