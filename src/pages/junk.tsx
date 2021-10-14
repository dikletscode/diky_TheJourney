// import React, { MouseEvent, useEffect, useRef, useState } from "react";
// import FormInput from "../components/formInput";
// import parse from "html-react-parser";
// import "draft-js/dist/Draft.css";
// import {
//   AtomicBlockUtils,
//   convertFromRaw,
//   convertToRaw,
//   Editor,
//   EditorState,
//   getDefaultKeyBinding,
//   KeyBindingUtil,
//   RichUtils,
// } from "draft-js";

// import draftToHtml from "draftjs-to-html";
// import IconList, { IconPng } from "../constant/Icon";
// import keyBindingFunction from "../components/textEditor/keyBinding";

// function getBlockStyle(block: any) {
//   switch (block.getType()) {
//     case "blockquote":
//       return "mx-16";
//     default:
//       return "";
//   }
// }
// const BlockStyleControls = (props: any) => {
//   const { editorState } = props;
//   const selection = editorState.getSelection();
//   const blockType = editorState
//     .getCurrentContent()
//     .getBlockForKey(selection.getStartKey())
//     .getType();
//   return (
//     <div className="flex items-center">
//       {IconPng.map((type, index) => (
//         <div
//           key={index}
//           data-block={type.action}
//           onClick={props.toogle}
//           className="p-4 cursor-pointer"
//         >
//           <img src={type.icon} alt="" className="h-6 w-6 object-contain " />
//         </div>
//       ))}
//     </div>
//   );
// };
// const InlineStyleControls = (props: any) => {
//   const { editorState } = props;
//   const current = editorState.getCurrentInlineStyle();
//   return (
//     <div className="flex items-center">
//       {IconList.map((item, index) => (
//         <div
//           key={index}
//           className={item.action.toLowerCase() + " p-4"}
//           data-style={item.action}
//           onMouseDown={props.toogle}
//         >
//           <p
//             className={`text-2xl ${
//               current.has(item.action) ? "text-blue-500" : "text-black"
//             }`}
//           >
//             {" "}
//             {item.icon}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// const Junk = () => {
//   const [state, setState] = React.useState({
//     editorState: EditorState.createEmpty(),
//     showURLInput: false,
//     url: "",
//     urlType: "",
//   });
//   const handleChange = (editorState: any) => {
//     setState((prev) => ({ ...prev, editorState }));
//   };
//   const toggleInlineStyle = (event: MouseEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     let style = event.currentTarget.getAttribute("data-style") || "";
//     console.log(style);
//     setState((prev) => ({
//       ...prev,
//       editorState: RichUtils.toggleInlineStyle(state.editorState, style),
//     }));
//   };
//   const toggleBlockType = (event: MouseEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     let block = event.currentTarget.getAttribute("data-block") || "";

//     setState((prev) => ({
//       ...prev,
//       editorState: RichUtils.toggleBlockType(state.editorState, block),
//     }));
//   };
//   const handleKeyCommand = (command: string) => {
//     let editorState: EditorState | null = RichUtils.handleKeyCommand(
//       state.editorState,
//       command
//     );
//     if (!editorState && command === "strikethrough") {
//       editorState = RichUtils.toggleInlineStyle(
//         state.editorState,
//         "STRIKETHROUGH"
//       );
//     }
//     if (!editorState && command === "blockquote") {
//       editorState = RichUtils.toggleInlineStyle(
//         state.editorState,
//         "blockquote"
//       );
//     }

//     if (!editorState && command === "ordered-list") {
//       editorState = RichUtils.toggleBlockType(
//         state.editorState,
//         "ordered-list-item"
//       );
//     }

//     if (!editorState && command === "unordered-list") {
//       editorState = RichUtils.toggleBlockType(
//         state.editorState,
//         "unordered-list-item"
//       );
//     }

//     if (editorState) {
//       setState((prev) => ({ ...prev, ...editorState }));
//       return "handled";
//     }

//     return "not-handled";
//   };
//   const confirmMedia = (e: any) => {
//     e.preventDefault();
//     const { editorState, url, urlType } = state;
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//       urlType,
//       "IMMUTABLE",
//       { src: url }
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newEditorState = EditorState.set(editorState, {
//       currentContent: contentStateWithEntity,
//     });
//     setState((prev) => ({
//       ...prev,
//       editorState: AtomicBlockUtils.insertAtomicBlock(
//         newEditorState,
//         entityKey,
//         " "
//       ),
//       showURLInput: false,
//       url: "",
//     }));
//   };
//   const onURLInputKeyDown = (e: any) => {
//     if (e.which === 13) {
//       confirmMedia(e);
//     }
//   };
//   const promptForMedia = (type: any) => {
//     setState((prev) => ({
//       ...prev,
//       showURLInput: true,
//       url: "",
//       urlType: type,
//     }));
//   };
//   const addImage = () => {
//     promptForMedia("image");
//   };
//   const refEditor = useRef<any>();

//   useEffect(() => {
//     refEditor.current.focus();
//   }, []);

//   const onURLChange = (e: any) => {
//     let preview = e.target.files[0];

//     setState((prev) => ({ ...prev, url: URL.createObjectURL(preview) }));
//   };

//   const UrlInput = () => {
//     return (
//       <div className="bg-red-500">
//         <input
//           onChange={onURLChange}
//           type="file"
//           onKeyDown={onURLInputKeyDown}
//         />
//         <button onMouseDown={confirmMedia}>Confirm</button>
//       </div>
//     );
//   };
//   return (
//     <div className=" w-full bg-base h-screen  ">
//       <section className="flex items-center  container mx-auto mb-10">
//         <div className="flex mt-36 items-center w-full flex-col mx-auto ">
//           <p>New Journey</p>
//           <div className="w-11/12 h-full items-center">
//             <form action="">
//               <FormInput type="text" field="Title" />
//               <div className="w-full p-10 relative mx-auto  my-auto">
//                 <div className="  bg-white  h-full   ">
//                   <div className="flex items-center">
//                     <InlineStyleControls
//                       toogle={toggleInlineStyle}
//                       editorState={state.editorState}
//                     />

//                     <BlockStyleControls
//                       toogle={toggleBlockType}
//                       editorState={state.editorState}
//                     />
//                     <button onMouseDown={addImage} style={{ marginRight: 10 }}>
//                       Add Image
//                     </button>
//                   </div>

//                   <div className="h-64 block">
//                     <Editor
//                       blockStyleFn={getBlockStyle}
//                       editorState={state.editorState}
//                       blockRendererFn={mediaBlockRenderer}
//                       onChange={handleChange}
//                       handleKeyCommand={handleKeyCommand}
//                       keyBindingFn={keyBindingFunction}
//                       ref={refEditor}
//                     />
//                   </div>
//                   <UrlInput />

//                   {draftToHtml(
//                     convertToRaw(state.editorState.getCurrentContent())
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };
// function mediaBlockRenderer(block: any) {
//   if (block.getType() === "atomic") {
//     return {
//       component: Media,
//       editable: false,
//     };
//   }
//   return null;
// }
// const Media = (props: any) => {
//   const entity = props.contentState.getEntity(props.block.getEntityAt(0));
//   const { src } = entity.getData();
//   console.log(src);
//   return <img src={src} alt="" />;
// };

// export default Junk;
export const Junk = {};
