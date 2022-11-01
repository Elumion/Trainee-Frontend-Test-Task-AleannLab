import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { JobItemType } from "../@types/responseTypes";
const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;
interface Props {
  data: JobItemType;
}

export default function DetailedJob(props: Props) {
  return <h1>{props.data?.address}</h1>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: JobItemType[] = await fetch(
    `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=${token}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
  return {
    fallback: false,
    paths: data?.map((el) => {
      return { params: { jobId: el.id } };
    }),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data: JobItemType[] = await fetch(
    `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=${token}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
  const item = data?.filter((el) => el.id === context.params?.jobId)[0];

  return { props: { data: item } };
};
