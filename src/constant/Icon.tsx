import left from "../assets/align-left.png";
import center from "../assets/align-center.png";
import numberList from "../assets/number-list.png";
import parap from "../assets/parap.png";
const toolbarConfig = {
  options: [
    "inline",
    "textAlign",
    "list",
    "fontSize",
    "fontFamily",
    "link",
    "image",
    "history",
  ], // This is where you can specify what options you need in
  //the toolbar and appears in the same order as specified

  inline: {
    options: ["bold", "italic", "underline"], // this can be specified as well, toolbar wont have
    //strikethrough, 'monospace', 'superscript', 'subscript'
  },

  fontSize: {
    defaultSize: 18, //This does not work.
    options: [10, 12, 14, 16, 18, 24, 30, 36, 48, 60],
  },
  list: {
    inDropdown: false,

    component: undefined,
    dropdownClassName: undefined,
    options: ["ordered"],
  },
  textAlign: {
    inDropdown: false,

    options: ["left", "center", "right"],
    className: "ml-24",
  },
  fontFamily: {
    className: "ml-24",
  },
  image: {
    className: "mr-60",

    // alignmentEnabled: true,
    // alt: { present: true, mandatory: false },
    // previewImage: true,
  },
  link: {},
  history: {
    inDropdown: false,

    component: undefined,
    dropdownClassName: undefined,
    className: "ml-24",
    options: ["undo", "redo"],
  },
};

export default toolbarConfig;
