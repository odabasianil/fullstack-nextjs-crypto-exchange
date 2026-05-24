import RecurringPlan from "./recurring-plan";
import data from "@/data/recurring/recurring-main/select-asset.json";

const RecurringMainView = () => {
  return (
    <div className="lg:w-[894px] px-4 mx-auto">
      <div className="flex justify-center flex-1">
        <RecurringPlan data={data} />
      </div>
    </div>
  );
};

export default RecurringMainView;
