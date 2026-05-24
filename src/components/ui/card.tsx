import { twMerge } from "tailwind-merge";

export const Card = ({children, className}: {children: any; className: string}) => {

  return (
    <>
      <div className={twMerge(
        [
          'md:dark:bg-black-100 md:bg-white-200',
          'text-black-100 dark:text-white',
          'rounded-[20px]',
          'md:pt-3',
          'md:pb-5',
          'md:px-6'
        ],
        className
      )}>
        {children}
      </div>
    </>
  )
}