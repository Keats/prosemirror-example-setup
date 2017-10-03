export default class FigureView {
  constructor(node, view, getPos) {
    this.src = node.attrs.src;
    this.caption = node.attrs.caption;
    this.dom = document.createElement("figure");
    this.dom.draggable = true;

    const img = document.createElement("img");
    img.src = this.src;
    this.dom.appendChild(img);

    const caption = document.createElement("figcaption");
    caption.innerText = this.caption;
    this.dom.appendChild(caption);
    this.contentDOM = caption;
  }

  stopEvent(e) {
    return !/drag/.test(e.type);
  }
}
