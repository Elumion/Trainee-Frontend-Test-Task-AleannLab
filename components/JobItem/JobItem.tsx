/* eslint-disable @next/next/no-img-element */
import React from "react";
import { JobItemType } from "../../@types/responseTypes";
import { formatTime } from "../../shared/timeFormatter";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  data: JobItemType;
}

export default function JobItem({ data }: Props) {
  const { id, name, address, createdAt, location, pictures, title } = data;
  const relativeDate = new Date(createdAt);
  const date = formatTime(relativeDate);

  const renderRating = () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <FontAwesomeIcon
          className="cursor-pointer text-[#38415D] hover:text-[#474747]"
          key={"star-" + i}
          icon={faStar}
        />
      );
    }
    return arr;
  };

  return (
    <div className="flex gap-[32px] bg-[#FFFFFF] py-[24px] px-[16px] shadow-item rounded-[8px] w-full md:items-center md:gap-[19px] md:py-[16px]">
      <Link href={id}>
        <img
          className="rounded-full max-w-[85px] max-h-[85px]  md:max-h-[66px] md:max-w-[66px]"
          src={
            pictures[0] ||
            "https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/job-icon.png"
          }
          alt={title}
          width={85}
          height={85}
          title={title}
        />
      </Link>
      <div className="flex w-full gap-[32px] md:flex-col-reverse md:gap-[14px]">
        <div className="flex  gap-[26px] w-[80%] md:w-full">
          <div className="">
            <Link className="flex flex-col gap-[8px]" href={id}>
              <span className="font-bold text-[#3A4562] text-[20px] md:text-[18px] md:w-full md:font-normal md:tracking-[-0.5625px]">
                {title}
              </span>
              <span className="font-normal text-[16px] text-[#878D9D]">
                {name}
              </span>
              <span className="text-[#878D9D] text-[16px] flex gap-[8px] items-start">
                <FontAwesomeIcon icon={faLocationDot} width={12} />
                {address}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex gap-[32px] md:justify-between">
          <div className="flex items-center">{renderRating()}</div>
          <div className="flex flex-col justify-between items-end">
            <FontAwesomeIcon
              className="text-[#70778B] cursor-pointer hover:text-[#474747]"
              icon={faBookmark}
            />
            <span className="font-normal text-[#878D9D] text-[16px] md:font-light md:text-[14px] md:tracking-[0.206667px]">
              Posted {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
