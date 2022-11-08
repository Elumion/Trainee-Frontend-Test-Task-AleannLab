/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from "@googlemaps/react-wrapper";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";
import { JobItemType } from "../@types/responseTypes";
import { AdditionalGroup } from "../components/AdditionalGroup";
import { AttachedImages } from "../components/AttachedImages";
import { CustomButton } from "../components/CustomButton";
import { GoogleMap, Marker } from "../components/GoogleMap";
import { formatTime } from "../shared/timeFormatter";
import locationIcon from "../public/Location_icon.svg";
const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;
let key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

interface Props {
  data: JobItemType;
}

export default function DetailedJob({ data }: Props) {
  const jobDescription = useRef<HTMLElement>(null);

  const mapCenter = { lat: data.location.lat, lng: data.location.long };

  //Change <> to fa

  useEffect(() => {
    const { description } = data;
    if (typeof description === "string") {
      let changedString = description
        .replaceAll(/\n/g, "<br/>")
        .replace(/(Responsopilities:)/, "<h3>$1</h3>")
        .replace(/(Compensation & Benefits:)/, "<h3 >$1</h3>")
        .split(/\t/g)[0];
      const listOfBenefits = description
        .split(/\t/g)[1]
        .split(".")
        .map((el) =>
          el.match(/\n/)
            ? `<br/>`
            : `<span className="benefits__item">${el.trim()}</span>`
        )
        .join("");
      changedString += listOfBenefits;
      if (jobDescription.current)
        jobDescription.current.innerHTML = changedString;
    }
  }, [data.description]);

  return (
    <div className="max-w-[1400px] mx-auto mt-[56px] px-[8px] ">
      <Script src=""></Script>
      <div className="flex max-w-[1309px] mx-auto gap-[133px] flex-wrap">
        <div className="max-w-[723px] w-full">
          <header className=" pb-[9px] flex justify-between items-center border-b-[1px] border-[#3A4562] border-opacity-[0.13] ">
            <h1 className="text-[#3A4562] text-[28px] font-bold tracking-[0.413333px]">
              Job Details
            </h1>
            <div className="flex gap-[31px] ">
              <Link href="#" className="flex gap-[15px]">
                <svg
                  className="hover:fill-[#70778B]"
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
                <span className="text-[18px] tracking-[-0.5625px] text-[#3A4562] font-roboto">
                  Save to my list
                </span>
              </Link>
              <Link href="#" className="flex gap-[15px] ">
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_3496_1463)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.54 14.9096L6.41 10.743C6.46 10.512 6.5 10.2811 6.5 10.0402C6.5 9.7992 6.46 9.56827 6.41 9.33735L13.46 5.21084C14 5.71285 14.71 6.0241 15.5 6.0241C17.16 6.0241 18.5 4.67871 18.5 3.01205C18.5 1.34538 17.16 0 15.5 0C13.84 0 12.5 1.34538 12.5 3.01205C12.5 3.25301 12.54 3.48394 12.59 3.71486L5.54 7.84137C5 7.33936 4.29 7.02811 3.5 7.02811C1.84 7.02811 0.5 8.37349 0.5 10.0402C0.5 11.7068 1.84 13.0522 3.5 13.0522C4.29 13.0522 5 12.741 5.54 12.239L12.66 16.4157C12.61 16.6265 12.58 16.8474 12.58 17.0683C12.58 18.6847 13.89 20 15.5 20C17.11 20 18.42 18.6847 18.42 17.0683C18.42 15.4518 17.11 14.1365 15.5 14.1365C14.74 14.1365 14.06 14.4378 13.54 14.9096Z"
                      fill="#70778B"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3496_1463">
                      <rect
                        width="18"
                        height="20"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-[18px] tracking-[-0.5625px] text-[#3A4562] font-roboto">
                  Share
                </span>
              </Link>
            </div>
          </header>
          <CustomButton
            className="mt-[39px] mb-[39px]"
            onClick={() => {
              console.log("Applied");
            }}
            text={"Apply Now"}
          />
          <div className="flex justify-between">
            <h2 className="text-[#3A4562] text-[24px] tracking-[-0.75px] font-bold max-w-[500px]">
              {data.title}
            </h2>
            <div>
              <p className="font-bold text-[#3A4562] text-[20px] tracking-[-0.625px] ">
                € {data.salary.replace("-", "—")}
              </p>
              <p className="tracking-[-0.5625px] text-[#3A4562] text-[18px] font-roboto">
                Brutto, per year
              </p>
            </div>
          </div>
          <p className="font-roboto text-[18px] text-[#38415d5b] tracking-[-0.5625px] my-[7px]">
            Posted {formatTime(new Date(data.createdAt))}
          </p>
          <article
            ref={jobDescription}
            className="job-article flex flex-col font-roboto text-[#3A4562] [&>h3]:text-[20px] [&>h3]:font-bold [&>h3]:font-proxima  [&>h3]:tracking-[-0.625px] "
          ></article>
          <CustomButton
            className=" mb-[86px]"
            onClick={() => {
              console.log("Applied");
            }}
            text={"Apply Now"}
          />
          <h2 className="mb-[15px] pb-[9px] border-b-[1px] border-[#3A4562] border-opacity-[0.13] font-bold text-[28px] text-[#3A4562]">
            Additional info
          </h2>
          <div className="reverse_when_mini">
            <AdditionalGroup
              className="mb-[86px]"
              data={{
                [`Employment type`]: {
                  elementsArr: data.employment_type,
                  className:
                    " border-[#55699e4c] bg-[#a1b1db51] text-[#55699E] ",
                },
                [`Benefits`]: {
                  elementsArr: data.benefits,
                  className: " border-[#FFCF00] bg-[#ffcf0026] text-[#988B49] ",
                },
              }}
            />
            <div>
              <h2 className="mb-[15px] pb-[9px] border-b-[1px] border-[#3A4562] border-opacity-[0.13] font-bold text-[28px] text-[#3A4562]">
                Attached images
              </h2>
              <AttachedImages data={data.pictures} />
            </div>
          </div>
        </div>
        <footer className=" map max-w-[400px] h-fit text-[#fff]  bg-[#3a3f55] rounded-[8px]">
          <div className="pseudo-circle backdrop-blur-none relative overflow-hidden flex flex-col gap-[8px] rounded-[8px]  px-[62px] pt-[31px] pb-[20px]">
            <h3 className="text-[#E7EAF0] font-bold text-[20px] tracking-[-0.625px] ">
              {data.name}
            </h3>
            <address className="not-italic text-[18px] font-roboto tracking-[-0.5625px]">
              FA HERE NEED {data.address}
            </address>
            <Link
              className="font-roboto text-[18px] tracking-[-0.5625px] text-[#E8EBF3]"
              href={`mailto:${data.email}`}
            >
              {" "}
              {data.email}
            </Link>
            <Link
              className="font-roboto text-[18px] tracking-[-0.5625px] text-[#E8EBF3]"
              href={`tel:${data.phone}`}
            >
              {data.phone.replace(
                /(\+\d{2})(\d{2})(\d{3})(\d{2})(\d{2})/g,
                "$1 ($2) $3-$4-$5 "
              )}
            </Link>
          </div>
          <div className="h-[218px] ">
            <Wrapper apiKey={typeof key === "undefined" ? "" : key}>
              <GoogleMap center={mapCenter} zoom={10}>
                <Marker position={mapCenter} icon={locationIcon.src} />
              </GoogleMap>
            </Wrapper>
          </div>
        </footer>
      </div>
      <Link
        href={"/"}
        className="flex w-fit mb-[170px] uppercase mt-[89px] px-[26px] py-[18px] bg-[#384564] bg-opacity-[0.14] rounded-[8px] font-semibold text-[12px] hover:bg-[#7c7c7c] hover:text-[#fff]"
      >
        {"<"} RETURN TO JOB BOARD
      </Link>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: JobItemType[] | { error: string } = await fetch(
    `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=${token}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });

  if (Array.isArray(data))
    return {
      fallback: false,
      paths: data.map((el) => {
        return { params: { jobId: el.id } };
      }),
    };

  return {
    fallback: false,
    paths: [{ params: { jobId: data.error } }],
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
