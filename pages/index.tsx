import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { JobItem } from "../components/JobItem";

const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export default function JobListPage(props: any) {
  const [arr, setArr] = useState([]);
  return (
    <main>
      <h1 style={{ display: "none" }}>Jobs available</h1>
      <ul>
        {Array.isArray(props.data)
          ? props.data.map((el: any) => (
              <li key={el.id}>
                <JobItem data={el} />
              </li>
            ))
          : props.data.error}
      </ul>
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
