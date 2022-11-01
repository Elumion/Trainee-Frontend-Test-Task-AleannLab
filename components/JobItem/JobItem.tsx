import Image from "next/image";
import React from "react";
import { JobItemType } from "../../@types/responseTypes";

interface Props {
  data: JobItemType;
}

export default function JobItem({ data }: Props) {
  const { id, name, address, createdAt, location, pictures, title } = data;
  return (
    <div className="job-item__container">
      <div className="item__content">
        <Image
          src={
            pictures[0] ||
            "https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/job-icon.png"
          }
          alt={title}
          width={300}
          height={300}
        />
        <h2>{title}</h2>
      </div>
      <div className="rating"></div>
      <div className="item__additional-info"></div>
    </div>
  );
}
