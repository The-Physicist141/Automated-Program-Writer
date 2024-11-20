
class Item {
  constructor() {
    this.things= {
      // "placeholder", ["type", "value"],
    };
  }
  
  add(type, name, value) {
    this.things[name]= [getType(type), value];
    
  }
}