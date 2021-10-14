import React, { MouseEvent, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Card from "../components/card";
import { API } from "../config/axios";
import { EventContext, UserContext } from "../context/provider";
import removeIcon from "../assets/remove.png";
import { DataJourney } from "../types/response";
import mark from "../assets/mark.png";

const Bookmark = () => {
  const { state } = useContext(UserContext);
  const [data, setData] = useState<DataJourney[]>([]);
  const { eventDispatch } = useContext(EventContext);
  const [update, setUpdate] = useState(false);
  const history = useHistory();
  const getJourney = async () => {
    try {
      let data = await API.get("bookmark");
      setData(data.data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJourney();
  }, [update]);

  const klikDetail = (id: number, data: DataJourney) => {
    if (state.isLogin) {
      history.push({ pathname: "/post/" + id.toString(), state: data });
    } else {
      eventDispatch({ type: "MODAL_LOGIN" });
    }
  };
  const removeBookmark = (id: number, e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const removeBookmark = async () => {
      try {
        let data = await API.delete("bookmark/" + id.toString());
        setUpdate(true);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    removeBookmark();
  };
  return (
    <div className="container mx-auto ">
      <div className="pt-28">
        <p className="text-3xl mb-8 font-bold">My Bookmark</p>
        {data.length ? (
          <Card
            data={data}
            clickDetail={klikDetail}
            icond={removeIcon}
            addBookmark={removeBookmark}
          />
        ) : (
          <>
            <div className="text-center">
              <img src={mark} alt="" className="h-96 w-full object-contain" />
              <p className="mx-auto font-semibold text-4xl">
                Your Bookmarks Are Empty...
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Bookmark;
