import { FC } from "react";
import { orders } from "../../utils/interface";
import NumberFormatter from "../NumberFormatter";

const ProfileHistory: FC<orders> = (props: orders) => {
  const { storage, orderId, jumlah, totalAmount, ram, brand } = props;
  return (
    <div id="profileInfo" className="flex gap-5 bg-[#E5F3FF] md:p-8 p-2 rounded-md w-[60vw]">
      <div className="flex flex-col w-full gap-1">
        <span id="profileName" className="font-semibold">
          Order: {orderId}
        </span>
        <hr />
        <span id="profileName" className="font-semibold">
          Brand: {brand}
        </span>
        <hr />
        <span id="profileUsername" className="text-[#999999] text-xs md:text-base">
          Ram:{ram}
        </span>
        <hr />
        <span id="profileUsername" className="text-[#999999] text-xs md:text-base">
          Storage: {storage}
        </span>
        <hr />
        <span id="profilePhone" className="text-[#999999] text-xs md:text-base">
          Jumlah : {jumlah}
        </span>
        <hr />
        <span id="profileEmail" className="text-[#999999] text-xs md:text-base">
          Total: <NumberFormatter value={totalAmount} />
        </span>
        <div className="flex items-center gap-5 mt-2"></div>
      </div>
    </div>
  );
};
export default ProfileHistory;
