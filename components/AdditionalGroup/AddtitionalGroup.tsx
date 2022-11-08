import React from "react";

interface Props {
  data?: {
    [key: string]: { elementsArr: string[]; className: string };
  };
  className?: string;
}

export default function AddtitionalGroup({ data, className }: Props) {
  const renderItems = (keyType: string) =>
    data &&
    data[keyType]?.elementsArr.map((el) => {
      return (
        <li
          key={el}
          className={
            data[keyType].className +
            "inline-block text-center font-bold rounded-[8px] text-[16px] tracking-[-0.457143px] w-[222px] border-[1px] py-[17px]"
          }
        >
          {el}
        </li>
      );
    });

  const renderGroup = () => {
    const rendererArr: JSX.Element[] = [];
    if (data)
      for (let key in data) {
        rendererArr.push(
          <div key={key}>
            <h4 className="font-roboto font-normal text-[18px] text-[#3A4562] tracking-[-0.5625px] pb-[10px]">
              {key}
            </h4>
            <ul className="flex gap-[8px] flex-wrap pb-[10px]">
              {renderItems(key)}
            </ul>
          </div>
        );
      }
    return rendererArr;
  };
  return <div className={!!className ? className : ""}>{renderGroup()}</div>;
}
