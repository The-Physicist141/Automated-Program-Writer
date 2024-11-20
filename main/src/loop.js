

class Loop {
  constructor(loopType) {
    this.countBy= String.fromCharCode(currIncrementor) + " ++";
    this.loopType= loopType;
  }
  
  run(parts) {
    let i= String.fromCharCode(currIncrementor);
    
    if(parts[0] == "from") {
      let left= "<";
      let right= ">";
      
      this.declaration= "int " + i + "= " + parts[1] + "; ";
      
      if(parts[4] == "inclusive" || parts[4] == "inc") {
        left += "=";
        right += "=";
      }
      
      if(parts[2] == "forever") this.conditional= "true";
      else if(parts[2] == "to") this.conditional= i + ` ${left} ` + parts[3];
      
      if(parseFloat(parts[1]) > parseFloat(parts[3])) {
        // Adjusts if we're counting down
        
        this.conditional= i + ` ${right} ` + parts[3];
        this.countBy= i + " --";
      }
      
    
    }
    else if(parts[0] == "by" || parts[0] == "countby") this.countBy= i + " += " + parts[1];
    else if(parts[0] == "forever") {
      this.conditional= "true";
      
    }
    else if(parts[0] == "endheader") {
      let header;
      if(this.loopType == "for") {
        header= "for(" + this.declaration + this.conditional + "; " + this.countBy + ") {";
      } else if(this.loopType == "while") {
        header= "while(" + this.conditional + ") {";
        
        if(this.declaration) {
          header= this.declaration + "\n" + header;
        }
      } else throw new Error("No loop type declared: " + this.loopType);
      
      indents ++;
      
      codeOutput += createTextIndents() + header;
      
      console.log("Loop header: " + header);
    }
  }
}


// Below is my old loop code. It must never be used by any living being.











/*class Loop {
  constructor(type) {
    this.loopHeader= "";

    this.counter= "";
    this.counterName= "";
    this.condition= "";
    this.increase= "";

    this.type= type;
  }

  declareCounter(parts) {
    this.counter=
      "double " + String.fromCharCode(currIncrementor) + "= " + parts[1];
    this.counterName = String.fromCharCode(currIncrementor);
  }

  run(parts) {
    switch (parts[0]) {
      case "count":
      case "counter":
        
        if(this.counterName != "") {
          this.counter=
            "int " + this.counterName + "= " + parts[1];
        } else {
          this.counter=
            "int " + String.fromCharCode(currIncrementor) + "= " + parts[1];
          this.counterName= String.fromCharCode(currIncrementor);
        }
        break;

      case "cond":
      case "condition":
        this.condition= collectTermsPast(0, parts);
        break;

      case "inc":
      case "increment":
      case "increase":
        this.increase= this.counterName + " += " + parts[1];
        break;

      case "name":
        this.counterName= parts[1];
        break;

      case "from":
        this.declareCounter(parts);
        break;

      case "to":
        if(parts[2] == "up") this.condition= this.counterName + " < " + parts[1];
        else if(parts[2] == "down") this.condition= this.counterName + " > " + parts[1];
        break;

      case "endheader":
        if(!this.increase)
          this.increase= String.fromCharCode(currIncrementor) + " ++";

        if(this.type == "for" || this.type == "from") {
          if(this.type == "from") this.declareCounter(parts);
          
          codeOutput +=
            createTextIndents() +
            "for(" +
            this.counter +
            "; " +
            this.condition +
            "; " +
            this.increase +
            ")<br>\n" +
            createTextIndents() +
            "{<br>\n";
        } else if(this.type == "while") {
          if(this.counter) {
            codeOutput += createTextIndents() + this.counter + ";<br>\n";
          }

          codeOutput +=
            createTextIndents() +
            "while(" +
            this.condition +
            ")<br>\n" +
            createTextIndents() +
            "{<br>\n";
        } else {
          error.innerHTML = "This isn't a loop.";
          quit = true;
        }

        console.log("Putting loop header together.");
        break;

      default:
        error.innerHTML = parts[0] + " command isn't in the loop dictionary.";
        break;
    }
  }
}*/


