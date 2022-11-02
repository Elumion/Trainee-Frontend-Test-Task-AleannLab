import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { JobItemType } from "../@types/responseTypes";
import { JobItem } from "../components/JobItem";

const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

interface Props {
  data: JobItemType[] | { error: string };
}

export default function JobListPage(props: Props) {
  const [arr, setArr] = useState([]);
  return (
    <main className=" flex flex-col gap-[49px] min-w-full min-h-full bg-[#E6E9F2] pt-[29px] pb-[64px]">
      <div className="max-w-[1400px] mx-auto">
        <h1 style={{ display: "none" }}>Jobs available</h1>
        <ul className="flex flex-col px-[8px] gap-y-[8px]   min-w-full">
          {Array.isArray(props.data)
            ? props.data.map((el) => (
                <li key={el.id} className="w-full">
                  <JobItem data={el} />
                </li>
              ))
            : props.data.error}
        </ul>
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
