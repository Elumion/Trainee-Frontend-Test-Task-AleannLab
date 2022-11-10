/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from "@googlemaps/react-wrapper";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { JobItemType } from "../@types/responseTypes";
import { AdditionalGroup } from "../components/AdditionalGroup";
import { AttachedImages } from "../components/AttachedImages";
import { CustomButton } from "../components/CustomButton";
import { GoogleMap, Marker } from "../components/GoogleMap";
import { formatTime } from "../shared/timeFormatter";
import locationIcon from "../public/Location_icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faShareNodes,
  faChevronLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;
let key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

interface Props {
  data: JobItemType | { error: string };
}

export default function DetailedJob({ data }: Props) {
  if (isError(data)) {
    return (
      <div className="max-w-[1400px] mx-auto mt-[56px] px-[8px] ">
        {data.error}
      </div>
    );
  }

  const jobDescription = useRef<HTMLElement>(null);
  const router = useRouter();

  const mapCenter = { lat: data.location.lat, lng: data.location.long };
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
    <div className="max-w-[1400px] mx-auto mt-[56px] px-[8px] bg-[#ffffff]">
      <div className="flex max-w-[1309px] mx-auto gap-[133px] lg:gap-[15px] lg:justify-between md:flex-wrap">
        <div className="max-w-[723px] w-full md:max-w-full">
          <header className=" pb-[9px] flex justify-between items-center border-b-[1px] border-[#3A4562] border-opacity-[0.13]  md:flex-col md:items-start md:border-none md:gap-[23px]">
            <h1 className="text-[#3A4562] text-[28px] font-bold tracking-[0.413333px] md:border-b-[1px] md:border-[#3A4562] md:border-opacity-[0.13] md:w-full md:pb-[12px]">
              Job Details
            </h1>
            <div className="flex gap-[31px] ">
              <Link
                href="#"
                className="flex items-center gap-[15px] text-[18px] text-[#70778B]"
              >
                <FontAwesomeIcon icon={faBookmark} />
                <span className="text-[18px] tracking-[-0.5625px] text-[#3A4562] font-roboto md:text-[16px]">
                  Save to my list
                </span>
              </Link>
              <Link href="#" className="flex items-center gap-[15px] ">
                <FontAwesomeIcon
                  className="text-[18px] text-[#70778B]"
                  icon={faShareNodes}
                />

                <span className="text-[18px] tracking-[-0.5625px] text-[#3A4562] font-roboto md:text-[16px]">
                  Share
                </span>
              </Link>
            </div>
          </header>
          <CustomButton
            className="mt-[39px] mb-[39px] md:hidden "
            onClick={() => {
              console.log("Applied");
            }}
            text={"Apply Now"}
          />
          <section className="flex justify-between l:gap-[20px] md:flex-col">
            <h2 className="text-[#3A4562] text-[24px] tracking-[-0.75px] font-bold max-w-[500px] md:max-w-full">
              {data.title}
            </h2>
            <div className="l:min-w-[115px] md:flex md:flex-col-reverse md:items-end">
              <p className="font-bold text-[#3A4562] text-[20px] tracking-[-0.625px] ">
                € {data.salary.replace("-", "—")}
              </p>
              <p className="tracking-[-0.5625px] text-[#3A4562] text-[18px] font-roboto md:font-proxima">
                Brutto, per year
              </p>
            </div>
          </section>
          <p className="font-roboto text-[18px] text-[#38415d5b] tracking-[-0.5625px] my-[7px] md:mt-[-50px]">
            Posted {formatTime(new Date(data.createdAt))}
          </p>
          <article
            ref={jobDescription}
            className="job-article flex flex-col font-roboto text-[#3A4562] [&>h3]:text-[20px] [&>h3]:font-bold [&>h3]:font-proxima  [&>h3]:tracking-[-0.625px] "
          ></article>
          <CustomButton
            className=" mb-[86px] md:mx-auto md:block md:mb-[135px]"
            onClick={() => {
              console.log("Applied");
            }}
            text={"Apply Now"}
          />
          <section className="md:flex md:flex-col-reverse md:gap-[55px]">
            <div>
              <h2 className="mb-[15px] pb-[9px] border-b-[1px] border-[#3A4562] border-opacity-[0.13] font-bold text-[28px] text-[#3A4562]">
                Additional info
              </h2>
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
                    className:
                      " border-[#FFCF00] bg-[#ffcf0026] text-[#988B49] ",
                  },
                }}
              />
            </div>
            <div>
              <h2 className="mb-[15px] pb-[9px] border-b-[1px] border-[#3A4562] border-opacity-[0.13] font-bold text-[28px] text-[#3A4562]">
                Attached images
              </h2>
              <AttachedImages data={data.pictures} />
            </div>
          </section>
        </div>
        <h2 className="hidden mb-[21px] pb-[9px] border-b-[1px] border-[#3A4562] border-opacity-[0.13] font-bold text-[28px] text-[#3A4562] w-full md:block">
          Contacts
        </h2>
        <footer className=" map max-w-[400px] h-fit text-[#fff]  bg-[#3a3f55] rounded-[8px] md:max-w-full md:w-full sm:mb-[40px]">
          <div className="pseudo-circle backdrop-blur-none relative overflow-hidden flex flex-col gap-[8px] rounded-[8px]  px-[62px] pt-[31px] pb-[20px]">
            <h3 className="text-[#E7EAF0] font-bold text-[20px] tracking-[-0.625px] md:text-[16px]">
              {data.name}
            </h3>
            <address className="not-italic text-[18px] font-roboto tracking-[-0.5625px] md:font-proxima md:text-[16px]">
              <FontAwesomeIcon
                className="text-[#D8D8D8]"
                icon={faLocationDot}
              />{" "}
              {data.address}
            </address>
            <Link
              className="font-roboto text-[18px] tracking-[-0.5625px] text-[#E8EBF3] md:font-proxima md:text-[16px]"
              href={`mailto:${data.email}`}
            >
              {" "}
              {data.email}
            </Link>
            <Link
              className="font-roboto text-[18px] tracking-[-0.5625px] text-[#E8EBF3] md:font-proxima md:text-[16px]"
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
      <button
        onClick={() => {
          router.back();
        }}
        className="flex text-[#3A4562] gap-[19px] w-fit mb-[170px] uppercase mt-[89px] px-[26px] py-[18px] bg-[#384564] bg-opacity-[0.14] rounded-[8px] font-semibold text-[12px] hover:bg-[#7c7c7c] hover:text-[#fff] sm:hidden"
      >
        <FontAwesomeIcon
          className="text-[18px] text-inherit "
          icon={faChevronLeft}
        />
        <span>RETURN TO JOB BOARD</span>
      </button>
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
  const data: JobItemType[] | { error: string } = await fetch(
    `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=${token}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });

  if ((data as { error: string }).error) {
    return { props: { data: { error: (data as { error: string }).error } } };
  }
  const item = (data as JobItemType[])?.filter(
    (el) => el.id === context.params?.jobId
  )[0];

  return { props: { data: item } };
};

const isError = (
  data: JobItemType | { error: string }
): data is { error: string } => {
  if (typeof (data as { error: string }).error === "string") return true;
  return false;
};
