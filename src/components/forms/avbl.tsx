import { useState } from "react";
import { Icon } from "../ui/icon";
import { FundAccountModal } from "../ui/fund-account-modal";

interface AviableInterface {
  coin1?: string;
  coin2?: string;
  isBuy?: boolean;
}

export const Aviable = (props: AviableInterface) => {
  const { coin1, coin2, isBuy } = props;
  const [openModal, setOpenModal] = useState(false);


  return (
    <>
      <div className="mt-2 mb-1 text-sm flex items-center justify-between flex-1">
        <div className="text-black-300 dark:text-gray-400 dark:md:text-gray text-xs h-4">Avbl</div>
        <div className="text-xs flex items-center gap-1">
          <div>- {isBuy ? coin2 : coin1}</div>
          <div className="hidden md:block" onClick={() => setOpenModal(true)}>
            <Icon
              name="circle-plus"
              size={16}
              className="text-primary-100 dark:text-primary-100 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <FundAccountModal coin1={coin1} coin2={coin2} open={openModal} setOpen={setOpenModal} />
    </>
  )
}