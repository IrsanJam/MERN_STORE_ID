import React, { FC, useState } from "react";

type AccordionItemProps = {
  title: string;
  sub?: string;
  children: React.ReactNode;
  alwaysOpen?: boolean;
  required?: boolean;
};

const AccordionItem: FC<AccordionItemProps> = ({ title, children, alwaysOpen = false, sub, required = false }) => {
  const [isOpen, setIsOpen] = useState(alwaysOpen);

  return (
    <div className="border-b-2 py-4" id="accordionContainer">
      <div className="flex" id="accordionButtonContainer">
        <button className="py-2 px-4 w-full text-left font-poppins font-semibold text-base" onClick={() => !alwaysOpen && setIsOpen(!isOpen)} disabled={alwaysOpen} type="button" id="accordionButton">
          <h4 className="text-[#111827]">
            {title}
            {required && <span className="text-[#F43F5E]">*</span>}
          </h4>
          {sub && (
            <p className="text-sm font-normal text-[#6B7280]" id="accordionSub">
              {sub}
            </p>
          )}
        </button>
        {isOpen || alwaysOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="accordionOpenIcon">
            <path d="M5 12H19" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="accordionClosedIcon">
            <path d="M12 5V19M5 12H19" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {(isOpen || alwaysOpen) && (
        <div className="p-4" id="accordionContent">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
