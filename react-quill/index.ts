import hljs from "highlight.js";
hljs.configure({
  languages: ["javascript", "ruby", "python", "rust"],
});
export const modules = {
  toolbar: [
    [{ header: [false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
    ["code-block"],
  ],
  syntax: {
    highlight: (text: any) => hljs.highlightAuto(text).value,
  },
};

export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code-block",
];
