import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {dropCursor} from "prosemirror-dropcursor"
import {gapCursor} from "prosemirror-gapcursor"
import {Schema, DOMParser, Fragment} from "prosemirror-model"
import {nodes as basicNodes} from "prosemirror-schema-basic"
import FigureView from "./nodeview"

const nodes = {
  doc: basicNodes.doc,
  paragraph: basicNodes.paragraph,

  figure: {
    content: "inline*",
    marks: "",
    group: "block",
    draggable: true,
    selectable: true,
    attrs: {
      src: {default: null},
      caption: {default: ""},
    },
    parseDOM: [
      {
        tag: "figure",
        contentElement: "figcaption",
        getAttrs(dom) {
          let img = dom.querySelector("img");
          return {src: img && img.parentNode === dom ? img.src : null};
        },
      },
      {
        tag: "img[src]",
        getAttrs(dom) {
          return {src: dom.src, caption: dom.alt};
        },
        getContent(dom) {
          return Fragment.from(dom.querySelector("figcaption"));
        }
      }
    ],
    toDOM(node) {
      return ["figure", ["img", {src: node.attrs.src, alt: node.attrs.caption}], ["figcaption", 0]]
    }
  },

  text: basicNodes.text,
  br: basicNodes.hard_break,
};

const schema = new Schema({nodes, marks: {}});
const plugins = [
  keymap(baseKeymap),
  dropCursor(),
  gapCursor(),
];


const editorState = EditorState.create({
    doc: DOMParser.fromSchema(schema).parse(document.getElementById("content")),
    schema,
    plugins,
});

const editorView = new EditorView(document.getElementById("editor"), {
  state: editorState,
  nodeViews: {
    figure(node, view, getPos) {
      return new FigureView(node, view, getPos);
    }
  }
});
