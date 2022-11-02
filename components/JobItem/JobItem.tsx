/* eslint-disable @next/next/no-img-element */
import React from "react";
import { JobItemType } from "../../@types/responseTypes";
import locationIcon from "../../public/Location_icon.svg";

interface Props {
  data: JobItemType;
}

export default function JobItem({ data }: Props) {
  const { id, name, address, createdAt, location, pictures, title } = data;
  return (
    <div className="bg-[#FFFFFF] py-[24px] px-[16px] shadow-item rounded-[8px] w-full">
      <div className="flex  gap-[26px]">
        <img
          className="rounded-full max-w-[85px] max-h-[85px] min-w-[85px] min-h-[85px]"
          src={
            pictures[0] ||
            "https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/job-icon.png"
          }
          alt={title}
          width={85}
          height={85}
        />
        <div className="flex flex-col gap-[8px]">
          <span className="font-bold text-[#3A4562] text-[20px]">{title}</span>
          <span className="font-normal text-[16px] text-[#878D9D]">
            Department name • {name}
          </span>
          <span className="text-[#878D9D] text-[16px] flex gap-[8px] items-start">
            <img src={locationIcon.src} alt="address" width={13} height={18} />
            {address}
          </span>
        </div>
      </div>
      <div className="rating"></div>
      <div className="item__additional-info"></div>
    </div>
  );
}
