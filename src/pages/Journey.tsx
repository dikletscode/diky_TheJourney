import React from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useLocation } from "react-router";
import { DataJourney } from "../types/response";

const Journey = (): JSX.Element => {
  const item: DataJourney = useLocation<DataJourney>().state;

  const cleanHTML = DOMPurify.sanitize(item?.content, {
    ALLOWED_ATTR: ["style", "src", "className", "type", "href", "rel"],
    ALLOWED_TAGS: ["img", "p", "section", "blockquote", "div", "strong", "em"],
  });
  return (
    <>
      <div className="p-32 pt-28">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold">{item?.title}</h1>
            <p className="text-blue-500 mt-5 mb-4">
              {new Date(item?.createdAt).toDateString()}
            </p>
          </div>
          <div>
            <p className="font-sans">{item.user?.fullname}</p>
          </div>
        </div>
        {parse(cleanHTML)}
      </div>
    </>
  );
};
export default Journey;
