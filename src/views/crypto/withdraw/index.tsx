import SideBarContent from "../deposit/sidebar-content";
import WithdrawFiat from "./withdraw-fiat";


const WithdrawMainView = () => {
  return (
    <div className="flex-1 pb-20">
      <WithdrawFiat />
    </div>
  );
};

export default WithdrawMainView;
