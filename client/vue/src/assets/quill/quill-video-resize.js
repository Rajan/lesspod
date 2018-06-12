const BlockEmbed = Quill.import('blots/block/embed');
const Parchment = Quill.import('parchment');
const ATTRIBUTES = [ 'height', 'width' ];

const nubStyles = {
  tLeft: {
    top: '-5px',
    left: '-5px',
  },
  tRight: {
    top: '-5px',
    right: '-5px',
  },
  bLeft: {
    bottom: '-5px',
    left: '-5px',
  },
  bRight: {
    bottom: '-5px',
    right: '-5px',
  },
}

const getClosest = (el, sel) => {
  while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, sel)));
  return el;
}

const createSpacer = () => {
  let spacer = document.createElement('div')
  spacer.appendChild(document.createElement('br'));
  return spacer
}

class VideoBuilder {
  
  buildIFrame(src, node) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', true);
    iframe.className = 'td-quill-video-editing'
    iframe.setAttribute('width', node.getAttribute('width') || 300);
    iframe.setAttribute('height', node.getAttribute('height') || 150);
    iframe.setAttribute('src', src);
    return iframe;
  }
  
  buildNode(node, wrapper) {
    node.appendChild(wrapper);
    setTimeout(() => {
      node.setAttribute('contenteditable', 'false');
      node.parentElement && node.parentElement.insertBefore(createSpacer(), node)
      node.parentElement && node.parentElement.appendChild(createSpacer());
      let iframe = node.getElementsByTagName('iframe')[0];
      iframe.setAttribute('width', node.getAttribute('width') || 300);
      iframe.setAttribute('height', node.getAttribute('height') || 150);
    }, 0);
    return node;
  }
  
  buildOverlay() {
    let overlay = document.createElement('div');
    overlay.setAttribute('class', "td-quill-video-overlay");
    overlay.setAttribute('contenteditable', 'false');
    overlay.addEventListener('click', (event) => {
      let rootElement = getClosest(overlay, ".ql-editor");
      if(rootElement && rootElement.quill){
        let node = Parchment.find(overlay.parentElement.parentElement);
        if (node instanceof Video) {
          node.domNode.builder.select(overlay, rootElement.quill, node);
        }
      }
    });
    
    return overlay;
  }

  select(overlay, quill, node) {
    this.selectedElement = overlay;
    if (this.selectedElement.className.indexOf('active') === -1){
      this.quill = quill;
      this.quill.setSelection(null);
      this.parentElement = this.selectedElement.parentElement;
      this.node = node;
      this.iframe = this.parentElement.getElementsByTagName('iframe')[0];
      this.selectedElement.setAttribute('class', 'td-quill-video-overlay active')
      let toolBar = this.buildToolBar();
      this.selectedElement.appendChild(toolBar);
      this.buildResize(); 
      this.handelDeselect = this.deselect.bind(this);
      this.quill.root.addEventListener('click', this.handelDeselect, false);
    }
  }

  deselect(event) {
    if (event.target !== this.selectedElement) {
      this.selectedElement.setAttribute('class', 'td-quill-video-overlay');
      this.clearNubEvents(true);
      while (this.selectedElement.firstChild) { this.selectedElement.removeChild(this.selectedElement.firstChild); }
      this.selectedElement = null;
      this.quill.root.removeEventListener('click', this.handelDeselect, false);
    }
  }

  buildToolBar() {
    let toolbarWrapper = document.createElement('div');
    toolbarWrapper.className = "td-quill-video-toolbar-wrapper"
    let toolbar = document.createElement('div');
    toolbar.className = "td-quill-video-toolbar"
    toolbar = this.addToolBarActions(toolbar);
    toolbarWrapper.appendChild(toolbar);
    return toolbarWrapper;
  }

  addToolBarActions(toolbar) {
    toolbar.appendChild(this.buildAction('left'));
    toolbar.appendChild(this.buildAction('center'));
    toolbar.appendChild(this.buildAction('right'));
    return toolbar;
  }

  buildAction(type) {
    const button = document.createElement('span');
    button.className = `td-quill-video-align-action td-quill-video-${type}`;
    button.innerHTML = `<i class="fa fa-align-${type} td-align-${type}" aria-hidden="true"></i>`;
    button.addEventListener('click', () => {
      this.quill.setSelection(this.node.offset(this.quill.scroll), 1, 'user');
      if (type === 'left') { return this.quill.format('align', null); }
      this.quill.format('align', type);
      this.quill.setSelection(null);
    });
    return button;
  }

  buildResize(){
    this.boxes = [];
    this.dragHandeler = this.handleDrag.bind(this);
    this.mouseUp = this.handelMouseUp.bind(this);
    this.mouseDown = this.handleMousedown.bind(this);
    for(let key in nubStyles){
      let nub = this.buildNub(key);
      this.boxes.push(nub);
      this.selectedElement.appendChild(nub);
    }
    return this.selectedElement;
  }
  
  buildNub(pos) {
    let nub = document.createElement('span');
    nub.className = 'td-quill-resize-nub';
    Object.assign(nub.style, nubStyles[pos])
    nub.addEventListener('mousedown', this.mouseDown, false);
    return nub;
  }

  handleMousedown(event){
    this.dragBox = event.target;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.preDragWidth = parseInt(this.iframe.width, 10) || 300;
    this.preDragHeight = parseInt(this.iframe.height, 10) || 150;
    document.addEventListener('mousemove', this.dragHandeler, false);
    document.addEventListener('mouseup', this.mouseUp, false);
  };

  handleDrag(event){
    if (!this.iframe) { return; }
    const deltaX = event.clientX - this.dragStartX;
    const deltaY = event.clientY - this.dragStartY;
    if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[2]) {
      this.iframe.width = Math.round(this.preDragWidth - deltaX);
      this.iframe.height = Math.round(this.preDragHeight + deltaY);
    }
    else {
      this.iframe.width = Math.round(this.preDragWidth + deltaX);
      this.iframe.height = Math.round(this.preDragHeight + deltaY);
    }
  }

  handelMouseUp(event){
    this.clearNubEvents();
  }

  clearNubEvents(include_nub){
    for(let nub in this.boxes){
      document.removeEventListener('mousemove', this.dragHandeler, false);
      document.removeEventListener('mouseup', this.mouseUp, false);
      if (include_nub){
        this.boxes[nub].removeEventListener('mousedown', this.handleMousedown, false);
      }
    }
  }

}

class Video extends BlockEmbed {

  static create(src) {
    let node = super.create();
    node.builder = new VideoBuilder();
    let wrapper = document.createElement('div');
    wrapper.className = 'td-quill-video-wrapper';
    let iframe = node.builder.buildIFrame(src, node);
    let overlay = node.builder.buildOverlay();
    wrapper.appendChild(iframe);
    wrapper.appendChild(overlay);
    return node.builder.buildNode(node, wrapper);
  }

  static formats(domNode) {
    let iframe = domNode.getElementsByTagName('iframe')[0];
    return ATTRIBUTES.reduce(function (formats, attribute) {
      if (iframe.hasAttribute(attribute)) {
        formats[attribute] = iframe.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static value(domNode) {
    return domNode.getElementsByTagName('iframe')[0].getAttribute('src');
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) { this.domNode.setAttribute(name, value); } 
      else { this.domNode.removeAttribute(name); }
    } 
    else { super.format(name, value); }
  }

}
Video.blotName = 'video';
Video.className = 'td-video';
Video.tagName = 'div';

export { Video }
