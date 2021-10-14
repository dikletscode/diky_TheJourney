import React, { MouseEvent, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Card from "../components/card";
import { API } from "../config/axios";
import { EventContext, UserContext } from "../context/provider";
import filterPng from "../assets/filter.png";
import { DataJourney } from "../types/response";

const HomePage = () => {
  const { state } = useContext(UserContext);
  const [data, setData] = useState<DataJourney[]>([]);
  const [dataFilter, setDataFilter] = useState<DataJourney[]>([]);
  const { eventDispatch } = useContext(EventContext);
  const [isKlik, setKlik] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [idBookmark, setBookmark] = useState<number[]>([]);
  const getJourney = async () => {
    try {
      var day = 60 * 60 * 24 * 1000;
      date?.setHours(0, 0, 0, 0);
      let end = date;
      if (date) {
        end = new Date(date.getTime() + day);
      }
      let data = await API.get("journeys", {
        params: {
          createdAt: date?.toISOString(),
          end: end?.toISOString(),
        },
      });
      setData(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const history = useHistory();
  useEffect(() => {
    getJourney();
    if (date == null) {
      setDate(new Date());
    }
  }, [date]);
  const klikDetail = (id: number, data: DataJourney) => {
    if (state.isLogin) {
      history.push({ pathname: "/post/" + id.toString(), state: data });
    } else {
      eventDispatch({ type: "MODAL_LOGIN" });
    }
  };

  const [update, setUpdate] = useState(false);
  const klik = (id: number, e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const addBookmark = async () => {
      try {
        let data = await API.post("bookmark", { journeyId: id });
        setUpdate(true);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    const removeBookmark = async () => {
      try {
        let data = await API.delete("bookmark/" + id.toString());
        setUpdate(true);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (idBookmark.includes(id)) {
      removeBookmark();
    } else {
      addBookmark();
    }
  };
  let today = new Date();
  const getBookmark = async () => {
    try {
      let res = await API.get("bookmark");
      let data = res.data.data;
      let arr: number[] = [];
      data.map((item: any) => {
        arr.push(item.id);
      });
      setBookmark(arr);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBookmark();
    return () => setUpdate(false);
  }, [update, state]);

  const [textSearch, setTextSearch] = useState("");
  
  const filterJourney = async () => {
    try {
      let res = await API.get("filter", {
        params: {
          textSearch: textSearch,
        },
      });
      setDataFilter(res.data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (textSearch.length || textSearch != " ") {
      filterJourney();
    }
  }, [textSearch]);

  return (
    <>
      {state.isLogin ? (
        <></>
      ) : (
        <div className="bg-main w-full ">
          <div className="h-xl  bg-black bg-opacity-40 p-28 ">
            <div className="w-7/12 leading-loose">
              <p className="text-6xl text-white font-bold">
                The Journey
                <br />
                you ever dreamed of.
              </p>
              <p className="text-white text-2xl pt-5">
                We made a tool so you can easily keep & share your travel
                memories but there is a lot more
              </p>
            </div>
          </div>
        </div>
      )}
      <div
        className={` flex flex-col w-full justify-center items-center  ${
          state.isLogin ? "py-16" : ""
        }`}
      >
        <div className="container mx-auto  rounded-xl ">
          <h1 className="text-4xl uppercase font-bold mt-12 from-current mb-8 text-left ">
            Journey
          </h1>
          <div className="mb-10 sticky bg-white z-20 top-21 shadow-md ">
            <div className=" shadow p-4 flex   ">
              <span className="w-auto flex justify-end items-center text-gray-500 p-2">
                <i className="material-icons text-3xl"></i>
              </span>
              <input
                className="w-full  border-transparent focus:outline-none focus:ring-2  focus:border-transparent "
                type="text"
                name="search"
                maxLength={200}
                placeholder="search journey"
                onChange={(e) => setTextSearch(e.target.value)}
                value={textSearch}
                onFocus={
                  !state.isLogin
                    ? () => eventDispatch({ type: "MODAL_LOGIN" })
                    : undefined
                }
              />

              <button className="bg-blue-500 hover:bg-blue-600 rounded text-white p-2 pl-4 pr-4  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                <p className="font-semibold text-xs">Search</p>
              </button>
              <div>
                <img
                  src={filterPng}
                  alt=""
                  className="h-10"
                  onClick={() => setKlik(true)}
                />
              </div>
              <>
                {isKlik ? (
                  <div
                    className="absolute bg-white z-30 right-4 top-14 shadow-md p-5 shadow-main w-48 "
                    onMouseLeave={() => setKlik(false)}
                  >
                    <input
                      type="date"
                      onChange={(e) => setDate(e.target.valueAsDate || today)}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </>
            </div>
          </div>

          <Card
            data={textSearch.length ? dataFilter : data}
            clickDetail={klikDetail}
            addBookmark={klik}
            bookMarkId={idBookmark}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
