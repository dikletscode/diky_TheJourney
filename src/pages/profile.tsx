import React, {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router";
import Card from "../components/card";
import { API } from "../config/axios";
import { EventContext, UserContext } from "../context/provider";
import profile from "../assets/remove.png";
import { DataJourney } from "../types/response";
import prof from "../assets/profile.png";

const Profile = () => {
  const loginUser = localStorage.getItem("_user");
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState<DataJourney[]>([]);
  const { eventDispatch } = useContext(EventContext);
  const history = useHistory();
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const getJourney = async () => {
    try {
      let data = await API.get("journey");
      setData(data.data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  const removeJourney = (id: number, e: MouseEvent<HTMLButtonElement>) => {
    const remove = async () => {
      try {
        await API.delete("journey/" + id.toString());
        setOpen(false);
        setUpdate(true);
      } catch (error) {
        console.log(error);
      }
    };
    remove();
    e.stopPropagation();
  };

  const openModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(true);
  };
  const closeModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  useEffect(() => {
    getJourney();

    return () => setUpdate(false);
  }, [update]);

  const klikDetail = (id: number, data: DataJourney) => {
    if (state.isLogin) {
      history.push({
        pathname: "/user/edit/journey/" + id.toString(),
        state: data,
      });
    } else {
      eventDispatch({ type: "MODAL_LOGIN" });
    }
  };
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    let formData = new FormData();
    if (e.target.files) {
      const img = e.target.files[0];
      formData.set("image", img);
      const upload = async () => {
        try {
          setUpdate(true);
          let res = await API.put("/profile", formData);
          if (loginUser) {
            const json = JSON.parse(loginUser);
            json["user"]["avatar"] = res.data.avatar;
            localStorage.setItem("_user", JSON.stringify(json));
            dispatch({ type: "VALID_USER", payload: json.user });
          }
          console.log(res);
          setUpdate(false);
        } catch (error: any) {
          console.log(error);
        }
      };

      upload();
    }
  };

  return (
    <div className="container mx-auto mb-10 ">
      <section className="flex items-center mx-auto mb-10">
        <div className="flex items-center mx-auto mt-24 flex-col">
          <div className="py-3 center mx-auto">
            <div className="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-48">
              <div className="mb-4">
                <img
                  className="w-auto mx-auto rounded-full object-cover h-28 object-center"
                  src={state.data?.avatar ? state.data?.avatar : prof}
                  alt="Avatar Upload"
                />
              </div>
              <label className="cursor-pointer mt-6">
                <span className="mt-2 leading-normal px-4 py-2 bg-blue-500 text-white text-sm rounded-full">
                  Select Avatar
                </span>
                <input type="file" className="hidden" onChange={handleImage} />
              </label>
            </div>
          </div>

          <p className="mt-8">{state.data?.fullname}</p>
          <p className="font-light">{state.data?.email}</p>
        </div>
      </section>
      <Card
        data={data}
        clickDetail={klikDetail}
        icond={profile}
        remove={removeJourney}
        openModal={openModal}
        isOpen={open}
        close={closeModal}
      />
    </div>
  );
};
export default Profile;
