/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import { JobItemType } from "../../@types/responseTypes";
import locationIcon from "../../public/Location_icon.svg";
import ratingIcon from "../../public/Star_icon.svg";
import bookmarkIcon from "../../public/bookmark_icon.svg";
import { formatTime } from "../../shared/timeFormatter";
import Link from "next/link";

interface Props {
  data: JobItemType;
}

export default function JobItem({ data }: Props) {
  const { id, name, address, createdAt, location, pictures, title } = data;
  const relativeDate = new Date(createdAt);
  const date = formatTime(relativeDate);

  // const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
  //   const target = e.target as SVGSVGElement;
  //   const nodeId = target.dataset?.id;
  //   if (nodeId) {
  //     for (let i = 0; i <= +nodeId; i++) {
  //       target.parentElement?.children[i].children[0].classList.add(
  //         "fill-[#f5e90f]"
  //       );
  //     }
  //   }
  // };
  // const handleMouseLeave = (e: React.MouseEvent<SVGSVGElement>) => {
  //   const target = e.target as SVGSVGElement;
  //   const nodeId = target.dataset?.id;
  //   if (nodeId) {
  //     for (let i = 0; i <= +nodeId; i++) {
  //       target.parentElement?.children[i].children[0].classList.remove(
  //         "fill-[#f5e90f]"
  //       );
  //     }
  //   }
  // };

  const renderRating = () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <svg
          className="cursor-pointer"
          // onMouseMove={handleMouseMove}
          // onMouseLeave={handleMouseLeave}
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-id={i}
          key={i}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.69871 4.58966C7.42979 2.93116 8.82013 0.000488281 9.51634 0.000488281C10.5274 -0.000511719 12.7421 5.68649 12.7421 5.68649C12.7421 5.68649 14.7923 5.86549 16.4493 6.04849C17.3289 6.14549 18.8997 6.29349 18.998 6.77849C19.019 6.88349 18.8927 7.31249 18.663 7.61149C17.69 8.88149 15.1654 11.6025 15.1654 11.6025C15.1654 11.6025 15.3038 12.9025 15.4272 14.3245C15.5064 15.2445 15.7201 17.1085 15.6428 17.4415C15.5586 17.8085 15.4071 17.9085 15.2497 17.9665C14.8384 18.1165 13.8835 17.5335 12.7682 16.9995C11.2486 16.2705 9.54141 15.4915 9.54141 15.4915C9.54141 15.4915 8.41501 16.0805 7.07998 16.6555C5.65367 17.2695 4.20931 18.2815 3.60649 17.9255C3.23035 17.7025 3.50919 15.9645 3.65363 14.4175C3.78904 12.9585 3.90639 11.6255 3.90639 11.6255C3.90639 11.6255 3.06987 10.6435 2.09592 9.59349C1.04375 8.45849 -0.239128 7.23349 0.0387113 6.78349C0.248344 6.44349 1.20523 6.26149 2.81209 6.06249C4.51924 5.85049 6.22439 5.70049 6.22439 5.70049C6.22439 5.70049 6.41022 5.24412 6.69871 4.58966Z"
            fill="#38415D"
          />
        </svg>
      );
    }
    return arr;
  };

  return (
    <div className="flex gap-[32px] bg-[#FFFFFF] py-[24px] px-[16px] shadow-item rounded-[8px] w-full">
      <div className="flex  gap-[26px] w-[80%]">
        <Link href={id}>
          <img
            className="rounded-full max-w-[85px] max-h-[85px] min-w-[85px] min-h-[85px]"
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
        <div className="">
          <Link className="flex flex-col gap-[8px]" href={id}>
            <span className="font-bold text-[#3A4562] text-[20px]">
              {title}
            </span>
            <span className="font-normal text-[16px] text-[#878D9D]">
              Department name • {name}
            </span>
            <span className="text-[#878D9D] text-[16px] flex gap-[8px] items-start">
              <img
                src={locationIcon.src}
                alt="address"
                width={13}
                height={18}
              />
              {address}
            </span>
          </Link>
        </div>
      </div>
      <div className="flex items-center">{renderRating()}</div>
      <div className="flex flex-col justify-between items-end">
        <svg
          className="hover:fill-[#70778B] cursor-pointer"
          width="18"
          height="23"
          viewBox="0 0 18 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 3.99992C1 2.52716 2.19391 1.33325 3.66667 1.33325H14.3333C15.8061 1.33325 17 2.52716 17 3.99992V19.9933C17 21.1593 15.609 21.7636 14.7567 20.9679L9.90994 16.4426C9.39761 15.9642 8.60239 15.9642 8.09007 16.4426L3.24327 20.9679C2.39104 21.7636 1 21.1593 1 19.9933V3.99992Z"
            stroke="#70778B"
            strokeWidth="2"
          />
        </svg>
        <span className="font-normal text-[#878D9D] text-[16px] ">
          Posted {date}
        </span>
      </div>
    </div>
  );
}
