/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

interface Props {
  data: string[];
}

export default function AttachedImages({ data }: Props) {
  interface OpenImg {
    src: string;
    id: number;
  }

  const [openImg, setOpenImg] = useState<OpenImg>({ src: "", id: 0 });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //   useEffect(() => {}, []);

  const toggleOpen = () => {
    setIsOpen((prevBool) => !prevBool);
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const src = target.getAttribute("src");
    const id = target.dataset.id;
    let srcOfOpenedImg: OpenImg;
    if (src && id) {
      srcOfOpenedImg = {
        src,
        id: +id,
      };
      toggleOpen();
      setOpenImg(srcOfOpenedImg);
    }
  };

  const handleSwipe = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const action = target.dataset.action;
    let id = 0;
    if (action === "+") id = openImg.id + 1;
    else if (action === "-") id = openImg.id - 1;
    if (id < 0) id = data.length - 1;
    else if (id > data.length - 1) id = 0;
    setOpenImg({
      id,
      src: data[id],
    });
  };

  const renderImgs = () =>
    data.map((el, index) => (
      <li
        key={`${el}${index}`}
        onClick={handleClick}
        className="max-h-[115px] "
      >
        <img
          className="cursor-pointer h-[115px] rounded-[8px]"
          data-id={index}
          src={el}
          alt="job relative"
        />
      </li>
    ));

  return (
    <div>
      <ul className="flex gap-[10px] flex-wrap">{renderImgs()}</ul>
      {isOpen ? (
        <div
          onClick={(e) => {
            const target = e.target as HTMLDivElement;
            if (!target.dataset.action) toggleOpen();
          }}
          className=" flex justify-center items-center w-full h-full bg-[#ffffff79] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <button
            onClick={handleSwipe}
            data-action="-"
            className="absolute left-[0] hover:bg-[#ececec96] px-[40px] p h-full transition-colors duration-500"
          >
            {"<"}
          </button>
          <img className="max-w-[500px]" src={openImg.src} alt="job relative" />
          <button
            onClick={handleSwipe}
            data-action="+"
            className="absolute right-[0] hover:bg-[#ececec96] px-[40px] p h-full transition-colors duration-500"
          >
            {">"}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
