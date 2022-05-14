import { canvas } from '../store.js';

export default {
  createChild: (name, type, parent, box) => {
    canvas.update(c => {
      c[parent].children.push(name);
      c[name] = {children:[], 'scriptId': type, 'box': box}
      return c;
    });
  },
  removeChild: (name, parent) => {
    canvas.update(c => {
      const index = c[parent].children.indexOf(name);
      c[parent].children.splice(index, 1);
      return c;
    });
  },
  addChild: (name, parent) => {
    canvas.update(c => {
    c[parent].children.push(name);
    return c;
    });
  },
  deleteChild: (name, parent) => {
    canvas.update(c => {
      const index = c[parent].children.indexOf(name);
      c[parent].children.splice(index, 1);
      delete c[name];
      return c;
    });
  },
  parse: (component, exporting = false) => {
    let canvasStore;
    const unsubscribe = canvas.subscribe((val) => canvasStore = val);
    unsubscribe();
  
    // const boxMap = new Map();
    const boxes = [];
    const queue = [component];
    
    while(queue.length) {
      const storeKey = queue.shift();
      const current = canvasStore[storeKey];

      // const importMap = new Map();
      // const components = [];
  
      current.children.forEach(child => {
    
        if (exporting) queue.push(child);
        // if (canvasStore[child].children.length) {
        //   newComponent = child;
        // } 
        boxes.push(canvasStore[child].box)
      });
  
      // const imports = [];
      // importMap.forEach((value) => {
      //   imports.push(value);
      // });

    }
    console.log(boxes)
    return boxes;
    
  }
}