import { FC } from "react";
import { typeListUsers } from "../../utils/interface";

const ProfileUsers: FC<typeListUsers> = (props: typeListUsers) => {
  const { username, no_hp, email, nama, gambar } = props;
  return (
    <div id="profileInfo" className="flex gap-5 bg-[#E5F3FF] md:p-5 p-2 rounded-md">
      <img id="profileImage" src={gambar ? gambar : `https://via.placeholder.com/250`} alt="person" className="rounded-md w-20" />
      <div className="flex flex-col w-full">
        <span id="profileName" className="font-semibold">
          {nama}
        </span>
        <span id="profileUsername" className="text-[#999999] text-xs md:text-base">
          username:  {username}
        </span>
        <span id="profilePhone" className="text-[#999999] text-xs md:text-base">
          No Handphone : {no_hp}
        </span>
        <span id="profileEmail" className="text-[#999999] text-xs md:text-base">
          Email : {email}
        </span>
      </div>
    </div>
  );
};
export default ProfileUsers;
