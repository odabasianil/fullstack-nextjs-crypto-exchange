'use client';

import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Icon } from '../ui/icon';

type AccordionProps = {
  index?: number;
  isCollapse?: boolean;
  title?: string;
  isFaq?: boolean;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  titleWrapperClassName?: string;
  dataTestId?: string;
  contentClassName?: string;
  titleId?: string;
  halfVisible?: boolean;
};

export const Accordion = ({
  index,
  isCollapse = false,
  title,
  children,
  isFaq = true,
  className,
  titleClassName,
  titleWrapperClassName,
  contentClassName,
  dataTestId,
  titleId,
}: AccordionProps) => {
  const [collapse, setCollapse] = useState(isCollapse);
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={twMerge(
        'w-full flex flex-col justify-center md:px-6 py-2 md:py-4 rounded-[10px]',
        isFaq && 'hover:bg-white-200 dark:hover:bg-black-100 mb-4',
        className,
        (collapse && isFaq) && 'bg-white-200 dark:bg-black-100'
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={twMerge(
          'flex items-center justify-between cursor-pointer',
          titleWrapperClassName
        )}
        id={titleId}
        onClick={() => setCollapse(!collapse)}
        data-testid={dataTestId}
      >
        <div className="flex flex-col">
          {title && (
            <div className={twMerge('md:text-xl md:font-medium flex items-center', titleClassName)}>
              {index && <div className='border border-white-100 min-w-6 w-6 md:w-8 h-6 md:h-8 rounded-lg md:p-1 flex items-center justify-center md:font-medium mr-2 md:mr-[10px]'>
                {index}
              </div>}
              {title}
            </div>
          )}
        </div>
        <div className={twMerge(
          'w-8 h-8 rounded-full p-2 hover:bg-primary flex items-center justify-center text-2xl',
          ((collapse || isHover) && isFaq ) && ('bg-primary dark:text-black-100'),
          !isFaq && 'bg-transparent hover:bg-transparent'
          )}>
          {collapse ?
            <Icon
              name="minus"
              size={16}
            />
            : 
            <Icon
              name="plus"
              size={16}
            />
            }
        </div>
      </div>
      {(collapse) && (
        <div
          className={twMerge(
            clsx(
              'mt-4 md:px-12 text-xs md:text-base text-black-300 dark:text-gray',
              !isFaq && 'px-6 text-black-100 dark:text-white-100',
              contentClassName
            )
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
