import { TooltipRenderProps } from "react-joyride"
import { Icon } from "./icon"

export const GuideTooltip = (props: TooltipRenderProps) => {

  return (
    <>
      <div className="bg-primary-100 text-black-100 w-[440px] rounded-lg p-6 z-[60]">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">{props.step.title}</div>
          <div className="cursor-pointer" onClick={props.closeProps.onClick}>
            <Icon
              name="close"
              size={16}
            />
          </div>
        </div>
        <div className="text-sm py-4">{props.step.content}</div>
        <div className="flex items-center justify-between">
          <div className="flex gap-0 items-end font-semibold">
            Step {props.index + 1}
            <span className="text-xs font-normal mb-[3px]">/{props.size}</span>
          </div>
          <div>
            <button
              onClick={props.primaryProps.onClick}
              className="bg-white text-black-100 py-[5px] px-6 font-semibold text-sm rounded-2xl">
                Next
              </button>
          </div>
        </div>
        <div className="flex gap-1 items-center justify-center w-full bg-[rgb(252,213,53)] rounded py-1.5 text-sm mt-4">
          I am familiar with this no guidance is needed.
          <div className="cursor-pointer underline font-semibold" onClick={props.skipProps.onClick}>
            Skip
          </div>
        </div>
      </div>
    </>
  )
}