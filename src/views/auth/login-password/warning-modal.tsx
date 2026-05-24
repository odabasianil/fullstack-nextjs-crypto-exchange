import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import { twMerge } from "tailwind-merge";

export const WarningModal = (props: any) => {
  const {
    open,
    setOpen,
    title,
    description,
    icon,
    textClass,
    titleClass,
    buttonText="Ok",
    className,
    iconClass,
    children,
    isCancelButton=false,
    buttonWrapperClass
  } = props;

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        className={twMerge("w-[360px] flex flex-col items-center text-center," , className)}
        isBackdropClickable={false}
      >
        <div
          className={twMerge(
            "flex flex-col items-center dark:text-white-100 text-xl font-semibold"
          )}
        >
          {title && <div className={twMerge(titleClass)}>{title}</div>}
          <Icon name={icon} size={96} className={twMerge(
            "mb-5 w-[160px] mt-1.5 order-0",
            iconClass
          )} />
          <div
            className={twMerge(
              "max-h-[140px] overflow-y-auto max-h-auto mb-6 text-sm px-1.5 leading-[22px] order-2",
              textClass
            )}
          >
            {description}
          </div>
        </div>
        {children}
        <div className={twMerge(buttonWrapperClass,"w-full")}>
          <Button
            appearance="primary"
            className="w-full h-12 flex items-center justify-center rounded-xl font-semibold !border-0"
            onClick={() => setOpen(false)}
          >
            {buttonText}
          </Button>
          {
            isCancelButton && (
              <Button
                appearance="secondary"
                className={twMerge("w-full h-12 flex items-center justify-center rounded-xl font-semibold mt-3", buttonWrapperClass && 'mt-0')}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            )
          }
        </div>
      </Modal>
    </>
  );
};
