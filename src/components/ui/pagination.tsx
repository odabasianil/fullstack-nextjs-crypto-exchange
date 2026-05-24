import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";

export const Pagination = (props: any) => {
  const { page, setPage, pageCount } = props;

  const handlePageChange = (page: number) => {
    setPage(page);
  }

  return (
    <div className="flex items-center w-full justify-end">
      <div className="flex items-center gap-1">
        <button
          onClick={() => handlePageChange(page - 1)}
          className={twMerge(
            "flex items-center justify-center h-[28px] w-[28px] rounded hover:bg-[rgb(242,243,245)] hover:dark:bg-secondary",
            page === 1 && 'text-gray hover:bg-transparent hover:dark:bg-transparent pointer-events-none'
          )}
        >
          <Icon
            name="chevron-left"
            size={24}
          />
        </button>
        {
          pageCount && new Array(pageCount).fill(null).map((item, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`flex items-center justify-center rounded h-[28px] w-[28px] hover:bg-[rgb(242,243,245)] hover:dark:bg-secondary ${page === index + 1 ? 'bg-[rgb(242,243,245)] dark:bg-secondary' : ''}`}
            >
              {index + 1}
            </button>
          ))
        }
        <button
          onClick={() => handlePageChange(page - 1)}
          className={twMerge(
            "flex items-center justify-center h-[28px] w-[28px] rounded hover:bg-[rgb(242,243,245)] hover:dark:bg-secondary",
            page === pageCount && 'text-gray hover:bg-transparent hover:dark:bg-transparent pointer-events-none'
          )}
        >
          <Icon
            name="chevron-left"
            size={24}
            className="rotate-180 "
          />
        </button>
      </div>
    </div>
  )
}