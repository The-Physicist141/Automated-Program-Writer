
class List {
  constructor(type, name) {
    this.data= [];
    this.name= name;
    this.type= getType(type);
  }
  
  run(parts) {
    for(let nugget of parts) {
      if(nugget == "endheader") {
        let summarize= "";
        
        for(let data of this.data) {
          summarize += data + ",";
          
          console.log(data);
        }
        
        summarize= summarize.removeChar(summarize.lastIndexOf(","));
  
        codeOutput += createTextIndents() + this.type + "[] " + this.name + "= {" + summarize + "};";
        return;
      }
      
      if(getType("let", nugget) != this.type) {
        console.log("Uh oh! Looks like typeof " + nugget + " isn't " + this.type + "!");
        stopCompile= true;
        list= false;
        return;
      }
      
      this.data.push(nugget);
    }
  }
  
  generate() {
    
  }
}