import { FC } from "react";
import { typeLaptopDetail } from "../../utils/products/type";
import NumberFormatter from "../NumberFormatter";

const ProfileProduct: FC<typeLaptopDetail> = (props: typeLaptopDetail) => {
  const { storage, price, ram, processor, description, stock, brand, type, image, ubah, hapus } = props;
  return (
    <div id="profileInfo" className="flex gap-5 bg-[#E5F3FF] md:p-8 p-6 rounded-md">
      <div className=" flex-col h-auto ">
        <div className="flex gap-5 mb-3 md:mb-5">
          <img id="profileImage" src={image} alt="person" className="rounded-md h-full w-1/2 md:h-1/2 md:w-1/4" />
          <div className="flex flex-col gap-2 w-full">
            <span id="profileName" className="font-semibold md:text-xl text-base">
              {brand} {type}
            </span>
            <span id="profileUsername" className="text-[#999999] text-xs">
              {processor} {ram} {storage}
            </span>
            <span id="profilePhone" className="text-[#999999] text-xs md:text-base">
              Stock : {stock}
            </span>
            <span id="profileEmail" className="text-[#999999] text-base">
              <NumberFormatter value={price} />
            </span>
          </div>
        </div>

        <span id="profileUsername" className="text-[#999999] md:py-4 text-xs md:text-sm text-justify ">
          {description}
        </span>
        <div className="flex items-center gap-3 md:mt-5 mt-3 ">
          <button onClick={hapus} className="md:px-5 md:py-2 px-3 py-3 text-sm md:text-base bg-red-400 rounded-md  text-white">
            Hapus
          </button>
          <button onClick={ubah} className="md:px-8 md:py-2 px-6  py-3 text-sm md:text-base bg-white rounded-md">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileProduct;
