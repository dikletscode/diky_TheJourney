import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import FormInput from "../components/formInput";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { API } from "../config/axios";
import { useHistory, useLocation } from "react-router";
import { DataJourney } from "../types/response";
import toolbarConfig from "../constant/Icon";

const EditJourney = () => {
  const item: DataJourney = useLocation<DataJourney>().state;
  const blocksFromHtml = htmlToDraft(item.content);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const history = useHistory();
  const [state, setState] = React.useState<{
    editorState: EditorState;
  }>({
    editorState: EditorState.createWithContent(contentState),
  });
  const [opt, setOpt] = useState({
    title: item.title,
    description: "",
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
  const handleChange = (editorState: any) => {
    setState((prev) => ({ ...prev, editorState: editorState }));
  };

  const uploadImageCallBack = (file: any): Promise<object> => {
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
        await API.put("journey", {
          title: item.title,
          description: state.editorState
            .getCurrentContent()
            .getPlainText("\u0001")
            .substring(0, 180),
          content: draftToHtml(
            convertToRaw(state.editorState.getCurrentContent())
          ),
          id: item.id,
          urlImg: item.img_cover,
          urlCloud: item.img_cloudId,
        });
        localStorage.removeItem("draftRaw");
        setState((prev) => ({
          ...prev,
          editorState: EditorState.createEmpty(),
        }));
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

  return (
    <div className=" w-full bg-base h-screen ml ">
      <section className="flex items-center  container mx-auto ">
        <div className="flex mt-24 items-center  w-full flex-col mx-auto ">
          <p>New Journey</p>
          <div className="w-11/12 h-full items-center  ">
            <form action="" onSubmit={onSubmit}>
              <FormInput
                type="text"
                field="title"
                onChange={change}
                value={item.title}
              />

              <div className="  bg-white  h-98   ">
                <div className="overflow-y-auto h-98">
                  <Editor
                    toolbarClassName=" bg-red-600 z-10  w-full"
                    editorState={state.editorState}
                    onEditorStateChange={handleChange}
                    uploadCallback={uploadImageCallBack}
                    toolbar={toolbarConfig}
                  />
                </div>
              </div>
              <div className="text-right">
                <input
                  type="submit"
                  className="bg-blue-400 text-white py-2 px-5 self-end"
                />
              </div>
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

export default EditJourney;
