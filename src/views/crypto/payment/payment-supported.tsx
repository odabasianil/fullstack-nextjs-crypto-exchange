"use-client";
import Image from "next/image";

 interface SupportedPayment {
  src: string;
  alt: string;
}

 interface PaymentSupportedProps {
  description: string;
  payments: SupportedPayment[];
}

export default function PaymentSupported({ description, payments }: PaymentSupportedProps) {
  return (
    <div className="md:flex items-start gap-4 mt-4">
      <p className="md:text-base dark:text-gray-100 md:leading-6">
        {description}
      </p>
      <div className="flex items-center justify-center gap-6">
        {payments.map((payment, index) => (
          <Image
            key={index}
            src={payment.src}
            alt={payment.alt}
            width={28}
            height={28}
          />
        ))}
      </div>
    </div>
  );
}
