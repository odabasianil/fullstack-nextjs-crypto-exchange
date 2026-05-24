"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useState } from "react";
import { CoinSummaryView } from "./coin-summary-view";

const paymentFormSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Enter a valid 16-digit card number"),
  holderName: yup.string().required("Cardholder name is required"),
  expiry: yup
    .string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter a valid expiry date (MM/YY)"),
  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^\d{3,4}$/, "Enter a 3 or 4 digit CVC"),
  applyCoupon: yup.string().max(5, "Coupon code can be max 5 characters").notRequired(),
});

type PaymentFormValues = {
  cardNumber: string;
  expiry: string;
  cvc: string;
  holderName: string;
  applyCoupon?: string;
};

export const CoinPaymentView = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: yupResolver(paymentFormSchema),
  });

  const onSubmit = (data: PaymentFormValues) => {
    console.log("Ödeme bilgileri:", data);
  };

  const [isApplied, setIsApplied] = useState(false);
  const couponCode = watch("applyCoupon") ?? "";

  const handleApply = () => {
    if (couponCode.trim().length === 0) return;
    setIsApplied(true);
    console.log("Coupon applied:", couponCode);
  };

  const handleRemove = () => {
    setIsApplied(false);
    setValue("applyCoupon", "");
  };

  const handleInputChange = (
    field: keyof PaymentFormValues,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;

    if (field === "cardNumber" || field === "cvc") {
      value = value.replace(/\D/g, "");
    }

    if (field === "expiry") {
      if (value.length === 2 && !value.includes("/")) {
        value += "/";
      }
    }

    if (field === "holderName") {
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setValue(field, value, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="pt-4 flex flex-col lg:flex-row gap-4 justify-between w-full lg:p-[30px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded-2xl w-full lg:w-full"
      >
        <h2 className="text-2xl font-semibold">Crypto made easy</h2>
        <p className="text-primary text-2xl font-semibold">
          Buy or gift crypto with credit card
        </p>

        {/* Cardholder Name */}
        <div className="text-left mt-3">
          <label className="text-sm text-gray-700 dark:text-gray-100 mb-2 block">
            Cardholder Name
          </label>
          <Input
            type="text"
            placeholder="Enter cardholder name"
            className="h-[46px] rounded-[4px] text-sm"
            {...register("holderName")}
            value={watch("holderName") || ""}
            onChange={(e:any) => handleInputChange("holderName", e)}
          />
          {errors.holderName && (
            <p className="text-red-600 text-sm mt-1">{errors.holderName.message}</p>
          )}
        </div>

        {/* Card Number */}
        <div className="text-left mt-3">
          <label className="text-sm text-gray-700 dark:text-gray-100 mb-2 block">
            Credit or Debit Card
          </label>
          <Input
            type="text"
            placeholder="Enter card number"
            className="h-[46px] rounded-[4px] text-sm"
            maxLength={16}
            {...register("cardNumber")}
            value={watch("cardNumber") || ""}
            onChange={(e:any) => handleInputChange("cardNumber", e)}
          />
          {errors.cardNumber && (
            <p className="text-red-600 text-sm mt-1">{errors.cardNumber.message}</p>
          )}
        </div>

        <div className="flex justify-between">
          {/* Expiry */}
          <div className="text-left mt-3 w-[48%]">
            <label className="text-sm text-gray-700 dark:text-gray-100 mb-2 block">
              Expiry Date
            </label>
            <Input
              type="text"
              placeholder="MM/YY"
              className="h-[46px] rounded-[4px] text-sm"
              maxLength={5}
              {...register("expiry")}
              value={watch("expiry") || ""}
              onChange={(e:any) => handleInputChange("expiry", e)}
            />
            {errors.expiry && (
              <p className="text-red-600 text-sm mt-1">{errors.expiry.message}</p>
            )}
          </div>

          {/* CVC */}
          <div className="text-left mt-3 w-[48%]">
            <label className="text-sm text-gray-700 dark:text-gray-100 mb-2 block">
              CVV/CVC
            </label>
            <Input
              type="password"
              placeholder="Enter CVC"
              maxLength={3}
              {...register("cvc")}
              value={watch("cvc") || ""}
              onChange={(e:any) => handleInputChange("cvc", e)}
              className="h-[46px] rounded-[4px] text-sm"
            />
            {errors.cvc && (
              <p className="text-red-600 text-sm mt-1">{errors.cvc.message}</p>
            )}
          </div>
        </div>

        {/* Coupon */}
        <div className="flex items-center space-x-2 mt-3 pt-4 w-full">
          <Input
            wrapperClassName="w-2/3"
            type="text"
            placeholder="Enter coupon code"
            maxLength={5}
            disabled={isApplied}
            className="flex-grow h-[46px] rounded-[4px] text-sm"
            {...register("applyCoupon")}
            value={couponCode}
            onChange={(e:any) => handleInputChange("applyCoupon", e)}
          />
          {!isApplied ? (
            <Button
              appearance="primary"
              className="h-[46px] w-1/3"
              onClick={handleApply}
              type="button"
            >
              Apply
            </Button>
          ) : (
            <Button
              appearance="secondary"
              className="h-[46px] w-1/3 flex items-center justify-center"
              onClick={handleRemove}
              type="button"
            >
              Cancel
            </Button>
          )}
        </div>

        <Button
          appearance="primary"
          className="w-full h-12 flex items-center justify-center mt-4"
          type="submit"
        >
          Order now
        </Button>
      </form>

      <div className="px-6 lg:p-0 w-full lg:w-[614px]">
        <CoinSummaryView
          promoCode={isApplied ? couponCode : undefined}
          orderDate={new Date().toLocaleDateString()}
          tax="$0.00"
          promoDiscount={isApplied ? "$10.00" : "$0.00"}
          totalPrice="$90.00"
        />
      </div>
    </div>
  );
};
