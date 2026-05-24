import React, { memo, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InfoTooltipProps {
  text: string;
  targetRef: React.RefObject<HTMLElement>;
  visible?: boolean;
  className?: string;
  arrowClass?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = memo(
  ({ text, targetRef, visible = false, className, arrowClass }) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [arrowPosition, setArrowPosition] = useState<string | null>(null);
    const [arrowLeft, setArrowLeft] = useState(0);

    useEffect(() => {
      if (tooltipRef.current && targetRef.current && visible) {
        const targetRect = targetRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        let top = targetRect.top - tooltipRect.height - 10;
        let left =
          targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;

        if (top < 0) {
          top = targetRect.bottom + 10;
          setArrowPosition("bottom");
        } else {
          setArrowPosition("top");
        }
        if (left < 0) {
          left = 0;
        }
        if (left + tooltipRect.width > window.innerWidth) {
          left = window.innerWidth - tooltipRect.width;
        }

        const arrowLeftPosition =
          targetRect.left + targetRect.width / 2 - left; 
        setArrowLeft(arrowLeftPosition);

        setPosition({ top, left });
      }
    }, [visible, targetRef]);

    if (!visible) return null;

    return (
      <div
        ref={tooltipRef}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          position: "fixed",
        }}
        className={twMerge(
          "z-[1400] bg-background-700 text-white p-[8px_12px] rounded-[4px] shadow-lg transition-opacity duration-200 max-w-[296px]",
          visible ? "opacity-100" : "opacity-0",
          className
        )}
      >
        <div
          role="tooltip"
          className="text-xs"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
        <div
          className="absolute"
          style={{
            left: `${arrowLeft}px`,
            top: arrowPosition === "bottom" ? "-3px" : "auto",
            bottom: arrowPosition === "top" ? "-3px" : "auto",
          }}
        >
          <div
            className={twMerge(
              "w-[6px] h-[6px] rotate-45 bg-background-700",
              arrowClass
            )}
          ></div>
        </div>
      </div>
    );
  }
);

InfoTooltip.displayName = "InfoTooltip";

export default InfoTooltip;
