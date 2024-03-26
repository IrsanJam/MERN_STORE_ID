import React from "react";
import { NumberFormatterProps } from "../utils/interface";

const NumberFormatter: React.FC<NumberFormatterProps> = ({ value }) => {
  const formattedNumber = new Intl.NumberFormat().format(value);

  return (
    <span id="formattedNumber" className="font-extrabold text-slate-500 font-sans">
      Rp. {formattedNumber}
    </span>
  );
};

export default NumberFormatter;
