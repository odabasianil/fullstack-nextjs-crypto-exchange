import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal"
import { twMerge } from "tailwind-merge";

export const SuccessModal = (props: any) => {
  const { text, successModal, setSuccessModal } = props;

  return (
    <Modal
      open={successModal}
      setOpen={setSuccessModal}
      className="w-full md:w-[380px] flex flex-col items-center text-center rounded-b-none md:rounded-b-xl"
      isMobileOpen={true}
    >
      <div className="flex flex-col items-center dark:text-white-100 text-xl font-semibold">
        <div className={twMerge("order-2 mb-4 text-2xl text-center")}>
          {text}
        </div>
        <Icon name="success" size={96} className="mb-5 w-[160px] mt-1.5 order-0 !text-success" />
        <Button onClick={() => setSuccessModal(false)} className="order-last w-full text-sm h-10 mt-4">
          Close
        </Button>
      </div>
    </Modal>
  )
} 