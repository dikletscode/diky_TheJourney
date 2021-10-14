import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import FormInput from "../components/formInput";
import { Editor } from "react-draft-wysiwyg";
import text from "../assets/text.png";

import draftToHtml from "draftjs-to-html";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { API } from "../config/axios";
import { useHistory } from "react-router";
import Modal from "../components/modal";
import Loading from "../components/loading";
import toolbarConfig from "../constant/Icon";

const AddJourney = () => {
  const storeRaw = localStorage.getItem("draftRaw");
  const [openModal, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const [state, setState] = React.useState<{
    editorState: EditorState;
    uploadImages: any[];
  }>({
    editorState: storeRaw
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(storeRaw)))
      : EditorState.createEmpty(),
    uploadImages: [],
  });
  const [opt, setOpt] = useState({
    title: "",
    synopsis: "",
    content: "",
    image: null || new Blob(),
  });

  const saveRaw = () => {
    var contentRaw = convertToRaw(state.editorState.getCurrentContent());
    localStorage.setItem("draftRaw", JSON.stringify(contentRaw));
  };
  useEffect(() => {
    saveRaw();
  }, [state.editorState]);

  const handleChange = (editorState: EditorState) => {
    setState((prev) => ({ ...prev, editorState: editorState }));
  };

  const uploadImageCallBack = (file: Blob): Promise<object> => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("image", file);
      API.post("content", data).then((responseImage) => {
        resolve({ data: { link: responseImage.data.url } });
      });
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const send = async () => {
      try {
        const forms = new FormData();
        forms.append("title", opt.title);
        forms.append("description", opt.synopsis);
        forms.append(
          "content",
          draftToHtml(convertToRaw(state.editorState.getCurrentContent()))
        );
        forms.append("image", opt.image);
        setLoading(true);
        await API.post("journey", forms);
        localStorage.removeItem("draftRaw");
        setState((prev) => ({
          ...prev,
          editorState: EditorState.createEmpty(),
        }));
        setLoading(false);
        history.push("/profile");
      } catch (error) {
        console.log(error);
      }
    };
    send();
  };
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    let img: Blob;
    if (e.target.files) {
      img = e.target.files[0];
    }
    setOpt((prev) => ({
      ...prev,
      [e.target.name]: e.target.name == "image" ? img : e.target.value,
    }));
  };
  const openModalPost = () => {
    setOpen(true);
    setLoading(false);
  };
  return (
    <div className=" w-full bg-base h-screen ml ">
      <section className="flex items-center  container mx-auto ">
        <div className="flex mt-24 items-center  w-full flex-col mx-auto ">
          <p>New Journey</p>
          <div className="w-11/12 h-full items-center  ">
            <form action="" onSubmit={onSubmit}>
              <FormInput type="text" field="title" onChange={change} />
              <FormInput type="text" field="synopsis" onChange={change} />
              <div className="  bg-white  h-98   ">
                <div className="overflow-y-auto h-98">
                  <Editor
                    toolbarClassName=" bg-red-600 z-10 sticky top-0 w-full"
                    editorState={state.editorState}
                    onEditorStateChange={handleChange}
                    uploadCallback={uploadImageCallBack}
                    toolbar={toolbarConfig}
                  />
                </div>
              </div>
              <div
                className="text-right flex absolute right-24 items-center self-end"
                onClick={openModalPost}
              >
                <div className="bg-blue-400 mb-7 mt-7 mx-auto text-white text-center rounded-md py-3  w-24 ">
                  <p> send</p>
                </div>
              </div>

              {openModal ? (
                <Modal>
                  <label className=" flex flex-col  items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <>
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">
                          Select a Cover
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={change}
                          name="image"
                        />
                      </>
                    )}
                  </label>
                  <div className="text-center">
                    <input
                      type="submit"
                      className="bg-blue-400 text-white py-2 px-5 self-end"
                    />
                  </div>
                </Modal>
              ) : (
                <></>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
function mediaBlockRenderer(block: any) {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
}
const Media = (props: any) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  console.log(src);
  return <img src={src} alt="" />;
};

export default AddJourney;
