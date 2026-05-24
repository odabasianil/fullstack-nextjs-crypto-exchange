import { Icon } from "@/components/ui/icon";

const RecurringHeader = () => {
  return (
    <div className="flex md:py-6 py-4 md:px-6 px-4 lg:px-0 justify-between md:text-2xl text-xl dark:text-white-100 font-semibold container max-w-[1200px]">
      <h2>Recurring Buy</h2>
      <div className="flex items-center dark:bg-gray-300 bg-gray-800 p-1.5 dark:text-white-100 text-black-100 cursor-pointer text-sm">
        My Plans
        <Icon
          name="arrow-plans"
          size={17}
          className="text-gray-300 dark:text-white ml-1"
        />
      </div>
    </div>
  );
};

export default RecurringHeader;
