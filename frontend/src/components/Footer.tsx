import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Footer: FC = () => {
  const navigate = useNavigate();
  const username = Cookies.get("username");
  return (
    <div id="mainContainer" className="w-full min-h-[552px] px-3 md:px-10 py-8 bottom-0 bg-sky-50 flex justify-center items-center font-Poppins">
      <div id="mainFlexContainer" className="flex flex-col items-start gap-8">
        <div id="infoFlexContainer" className="justify-start items-start gap-[50px] 2xl:gap-[280px] md:inline-flex flex-wrap">
          <div id="gridContainer" className="md:flex grid grid-cols-2 md:flex-wrap justify-start items-start gap-2  md:gap-8">
            <div id="storeInfoContainer" className="flex flex-col justify-start items-start gap-4">
              <div id="storeInfoHeading" className="text-gray-800 text-sm font-semibold uppercase tracking-wide">
                INFORMASI STOREID
              </div>
              <div id="storeInfoLinks" className="flex-col justify-start items-start gap-2 flex">
                <div id="storeInfoLink1" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Tentang StoreID
                </div>
                <div id="storeInfoLink2" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Kebijakan StoreID
                </div>
                <div id="storeInfoLink3" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Kebijakan Privasi
                </div>
                <div id="storeInfoLink4" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Blog Fashion
                </div>
              </div>
            </div>
            <div id="helpSupportContainer" className="flex-col justify-start items-start gap-4 inline-flex">
              <div id="helpSupportHeading" className="text-gray-800 text-sm font-semibold font-poppins uppercase tracking-wide">
                Dukungan
              </div>
              <div id="helpSupportLinks" className="flex-col justify-start items-start gap-2 flex">
                <div id="helpSupportLink1" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Informasi Belanja
                </div>
                <div id="helpSupportLink2" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Pengembalian Dana
                </div>
                <div id="helpSupportLink3" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Cara Memesan
                </div>
                <div id="helpSupportLink4" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Cara Melacak
                </div>
                <div id="helpSupportLink5" className="text-gray-500 text-sm font-medium font-poppins tracking-wide">
                  Metode Pembayaran
                </div>
              </div>
            </div>
            <div id="customerServiceContainer" className="flex-col justify-start items-start gap-4 inline-flex">
              <div id="customerServiceHeading" className="text-gray-800 text-sm font-semibold font-poppins uppercase tracking-wide">
                LAYANAN PELANGGAN
              </div>
              <div id="customerServiceLinks" className="flex-col justify-start items-start gap-2 flex">
                <div id="customerServiceLink1" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Hubungi Kami
                </div>
                <div id="customerServiceLink2" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Pembayaran
                </div>
                <div id="customerServiceLink3" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Bonus Point
                </div>
                <div id="customerServiceLink4" className="text-gray-500 md:text-sm text-xs font-medium font-poppins tracking-wide">
                  Pemberitahuan
                </div>
              </div>
            </div>
          </div>
          <div id="kontakMediaContainer" className="flex flex-wrap justify-start items-start gap-8 md:block">
            <div id="kontakMediaFlexContainer" className="justify-start items-start gap-[242px] inline-flex">
              <div id="kontakMediaInfoContainer" className="flex flex-col justify-start items-start gap-4 mt-5 xl:mt-0">
                <div id="kontakMediaHeading" className="text-gray-800 text-sm font-semibold uppercase tracking-wide">
                  Kontak Media
                </div>
                <div id="kontakMediaLinks" className="justify-start items-start gap-4 inline-flex mb-5">
                  <svg id="kontakMediaIcon1" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2_2391)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.4489 0.484863C19.3335 0.51778 21.9394 1.22672 24.2667 2.61169C26.5662 3.96902 28.4791 5.89358 29.8224 8.20136C31.1989 10.5427 31.9036 13.1644 31.9364 16.0665C31.8547 20.0374 30.6022 23.4288 28.1791 26.241C25.756 29.0531 22.6526 30.7928 19.4399 31.4598V20.3268H22.4772L23.1641 15.9518H18.5649V13.0863C18.5394 12.4923 18.7272 11.9087 19.0945 11.4411C19.4623 10.9722 20.11 10.7258 21.0376 10.7018H23.8149V6.86941C23.7751 6.85659 23.3969 6.80589 22.6805 6.71731C21.8681 6.62224 21.051 6.57147 20.233 6.56521C18.3817 6.57375 16.9175 7.09598 15.8405 8.13192C14.7634 9.16756 14.2133 10.6659 14.1899 12.627V15.9518H10.6899V20.3268H14.1899V31.4598C10.2453 30.7928 7.14181 29.0531 4.71869 26.241C2.29556 23.4288 1.04319 20.0374 0.961426 16.0665C0.994138 13.1643 1.6988 10.5425 3.0754 8.20136C4.4187 5.89359 6.33158 3.96902 8.63113 2.61169C10.9584 1.22699 13.5643 0.518047 16.4489 0.484863Z"
                        fill="#0396C7"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2_2391">
                        <rect width="32" height="32" fill="white" transform="translate(0.5)" />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg id="kontakMediaIcon2" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2_2393)">
                      <path
                        d="M16.5 0C7.66479 0 0.5 7.16479 0.5 16C0.5 24.8352 7.66479 32 16.5 32C25.3352 32 32.5 24.8352 32.5 16C32.5 7.16479 25.3352 0 16.5 0ZM23.8054 12.4751C23.8125 12.6326 23.8159 12.7908 23.8159 12.9497C23.8159 17.8025 20.1221 23.3984 13.3669 23.3987H13.3672H13.3669C11.293 23.3987 9.36304 22.7908 7.73779 21.749C8.02515 21.783 8.31763 21.7998 8.61377 21.7998C10.3345 21.7998 11.918 21.2129 13.175 20.2278C11.5674 20.198 10.2119 19.1362 9.74414 17.677C9.96802 17.72 10.1982 17.7434 10.4343 17.7434C10.7695 17.7434 11.0942 17.6982 11.4028 17.614C9.72241 17.2776 8.45654 15.7925 8.45654 14.0142C8.45654 13.9976 8.45654 13.9827 8.45703 13.9673C8.9519 14.2424 9.51782 14.408 10.1204 14.4265C9.13428 13.7686 8.48608 12.6438 8.48608 11.3696C8.48608 10.6968 8.66797 10.0664 8.9834 9.52368C10.7944 11.7458 13.501 13.2073 16.5532 13.3608C16.4902 13.0918 16.4578 12.8115 16.4578 12.5234C16.4578 10.4961 18.1025 8.85132 20.1306 8.85132C21.187 8.85132 22.1411 9.29785 22.8113 10.0117C23.6479 9.84668 24.4336 9.54102 25.1433 9.12036C24.8687 9.97754 24.2866 10.6968 23.5283 11.1516C24.2712 11.0627 24.9792 10.8657 25.6372 10.5732C25.1458 11.3098 24.5225 11.9568 23.8054 12.4751Z"
                        fill="#0396C7"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2_2393">
                        <rect width="32" height="32" fill="white" transform="translate(0.5)" />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg id="kontakMediaIcon3" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5002 12.501C18.6639 12.501 20.418 14.2279 20.418 16.3582C20.418 18.488 18.6639 20.2149 16.5002 20.2149C14.3365 20.2149 12.5824 18.488 12.5824 16.3582C12.5824 14.2279 14.3365 12.501 16.5002 12.501ZM16.5002 10.9586C13.471 10.9586 11.0153 13.376 11.0153 16.3582C11.0153 19.3399 13.471 21.7577 16.5002 21.7577C19.5294 21.7577 21.9851 19.3399 21.9851 16.3582C21.9851 13.376 19.5294 10.9586 16.5002 10.9586ZM22.1544 9.66064C21.8503 9.66541 21.5544 9.75994 21.3039 9.93236C21.0533 10.1048 20.8593 10.3474 20.7462 10.6297C20.6332 10.9121 20.606 11.2215 20.6683 11.5192C20.7305 11.8169 20.8794 12.0896 21.0961 12.303C21.3129 12.5164 21.5878 12.6609 21.8865 12.7185C22.1851 12.7761 22.4941 12.7441 22.7747 12.6266C23.0552 12.5091 23.2947 12.3114 23.4632 12.0582C23.6317 11.8049 23.7216 11.5076 23.7216 11.2034C23.7183 10.791 23.5514 10.3968 23.2575 10.1075C22.9636 9.8182 22.5668 9.65746 22.1544 9.66064ZM12.6716 7.98157H20.3288C22.8198 7.98157 24.8392 9.96954 24.8392 12.4215V20.2944C24.8392 22.7468 22.8198 24.7343 20.3288 24.7343H12.6716C10.1806 24.7343 8.16116 22.7468 8.16116 20.2944V12.4215C8.16116 9.96954 10.1805 7.98157 12.6716 7.98157ZM11.9494 6.44604C8.9885 6.44604 6.58817 8.80917 6.58817 11.7238V20.9921C6.58817 23.9072 8.98847 26.2698 11.9494 26.2698H21.051C24.0119 26.2698 26.4122 23.9072 26.4122 20.9921V11.7238C26.4122 8.80914 24.0119 6.44604 21.051 6.44604H11.9494ZM16.5002 0.870483C25.0537 0.870483 31.9877 7.80424 31.9877 16.3582C31.9877 24.9116 25.0537 31.8454 16.5002 31.8454C7.94666 31.8454 1.0127 24.9116 1.0127 16.3582C1.0127 7.80426 7.94666 0.870483 16.5002 0.870483Z"
                      fill="#0396C7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {username ? (
              ""
            ) : (
              <div id="subscriptionContainer" className="flex-col justify-start items-start gap-[18px] flex">
                <div id="subscriptionTextContainer" className="flex-col justify-start items-start gap-[5px] flex">
                  <div id="subscriptionText" className="text-gray-800 text-sm font-medium font-poppins tracking-wide">
                    Bergabung bersama kami untuk mengikuti perkembangan aplikasi
                  </div>
                  <div id="subscriptionInputButtons" className="justify-start items-start gap-2 inline-flex">
                    <div id="subscriptionInput" className="h-[47px] px-4 py-[13px] bg-white rounded-lg border border-gray-400 justify-start items-start gap-2.5 flex">
                      <div onClick={() => navigate("/register")} id="subscriptionInputLabel" className="text-gray-500 text-sm font-medium font-poppins tracking-wide">
                        Masukkan emailmu...
                      </div>
                    </div>
                    <div id="subscriptionButton" className="px-[30px] py-[13px] bg-sky-600 rounded-lg justify-start items-start gap-2.5 flex">
                      <div onClick={() => navigate("/register")} id="subscriptionButtonText" className="text-white text-sm font-semibold font-poppins uppercase tracking-wide">
                        Bergabung
                      </div>
                    </div>
                  </div>
                </div>

                <div id="subscriptionPolicyText">
                  <span id="subscriptionPolicyText1" className="text-gray-500 text-xs font-medium font-poppins tracking-wide">
                    Dengan mengklik tombol BERLANGGANAN, Anda menyetujui{" "}
                  </span>
                  <span id="subscriptionPolicyText2" className="text-sky-900 text-xs font-medium font-poppins tracking-wide">
                    Kebijakan Privasi & Cookie kami
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="footerLinks" className="flex flex-col md:flex-row justify-start items-start md:items-center gap-[62px] md:gap-[305px]">
          <div id="footerText" className="flex flex-col justify-start items-start gap-6">
            <div id="footerCopyright" className="text-gray-500 text-sm font-medium tracking-wide">
              ©2010-2023 StoreID All Rights Reserved
            </div>
            <div id="footerPolicyLinks" className="flex-col justify-start items-start gap-4 flex">
              <div id="privacyLinks" className="grid justify-start items-center gap-[7px] md:inline-flex">
                <div id="privacyCenter" className="text-gray-500 text-xs md:text-sm font-medium font-poppins underline tracking-wide">
                  Privacy Center
                </div>
                <div id="privacyPolicy" className="text-gray-500 text-xs md:text-sm font-medium font-poppins underline tracking-wide">
                  Privacy & Cookie Policy
                </div>
                <div id="manageCookies" className="text-gray-500 text-xs md:text-sm font-medium font-poppins underline tracking-wide">
                  Manage Cookies
                </div>
              </div>
              <div id="termsLinks" className="justify-start items-center gap-[7px] inline-flex">
                <div id="termsConditions" className="text-gray-500 text-xs md:text-sm font-medium font-poppins underline tracking-wide">
                  Terms & Conditions
                </div>
                <div id="copyrightNotice" className="text-gray-500 text-xs md:text-sm font-medium font-poppins underline tracking-wide">
                  Copyright Notice
                </div>
                <div id="imprint" className="text-gray-500 text-xs md:text-sm font-medium font-poppins underline tracking-wide">
                  Imprint
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
