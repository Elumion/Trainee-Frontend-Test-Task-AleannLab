import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { JobItemType } from "../@types/responseTypes";
import { JobItem } from "../components/JobItem";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

interface Props {
  data: JobItemType[] | { error: string };
}

const itemsPerPage = 7;

export default function JobListPage({ data }: Props) {
  const router = useRouter();
  let currentPage = router.query["page"];
  if (!currentPage || +currentPage < 1) currentPage = "1";

  const renderData = (data: JobItemType[]) => {
    const renderArr = [];
    for (let i = 0; i < itemsPerPage; i++) {
      if (currentPage) {
        const indexElement = (+currentPage - 1) * itemsPerPage + i;
        const el = data[indexElement];
        if (indexElement > data.length - 1) break;
        renderArr.push(
          <li key={el.id} className="w-full">
            <JobItem data={el} />
          </li>
        );
      }
    }
    return renderArr;
  };

  const renderPagination = () => {
    const renderArr = [];

    if (Array.isArray(data) && !!currentPage) {
      let pagesToShow = Math.ceil(data.length / itemsPerPage);
      for (let i = 1; i <= pagesToShow; i++) {
        renderArr.push(
          <li key={i}>
            <Link
              className={
                "block font-bold text-[#70778B] text-[20px] py-[12px] px-[8px] hover:text-[#5876C5] " +
                (i === +currentPage
                  ? " border-b-[#5876C5] border-b-[2.5px] text-[#5876C5]"
                  : "")
              }
              href={`${router.basePath}?page=${i}`}
            >
              {i}{" "}
            </Link>
          </li>
        );
      }
      return renderArr;
    }
  };

  return (
    <main className=" flex flex-col gap-[49px] min-w-full min-h-full bg-[#E6E9F2] pt-[29px] pb-[64px] md:pt-[9px]">
      <div className="max-w-[1400px] w-[100%] mx-auto ">
        <h1 style={{ display: "none" }}>Jobs available</h1>
        <ul className="flex flex-col px-[8px] gap-y-[8px]   min-w-full">
          {Array.isArray(data) ? renderData(data) : data.error}
        </ul>
      </div>
      <div className="flex justify-between items-center w-fit mx-auto   bg-[#ffffff] shadow-pagination gap-[55px] rounded-[10px] sm:w-[95%]">
        <Link
          className="pr-[30px] border-r-[1px] border-r-[#DEE3EF] pl-[23px] text-[#7D859C] hover:text-[#5876C5]"
          href={`${router.basePath}?page=${
            +currentPage > 1 ? +currentPage - 1 : 1
          }`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <ul key={42523} className="flex ">
          {renderPagination()}
        </ul>
        <Link
          className="pl-[30px] border-l-[1px] border-l-[#DEE3EF] pr-[23px] text-[#7D859C] hover:text-[#5876C5]"
          href={`${router.basePath}?page=${+currentPage + 1}`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetch(
    `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=${token}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
  return { props: { data }, revalidate: 15 };
};
