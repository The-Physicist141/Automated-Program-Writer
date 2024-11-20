// I really don't want to write Java programs anymore.


String.prototype.removeChar= function(index) {
  let h= "";
  
  for(let i= 0; i < this.length; i ++) {
    if(i < index || i > index) h += this.charAt(i);
  }

  return h;
}

let docWindow= document.createElement("iframe");

docWindow.src= "docs/docs.html";
docWindow.style.width= innerWidth + "px";
docWindow.style.height= innerHeight + "px";

docWindow.style.width= "600px";

// document.body.appendChild(docWindow);


let codeInput= document.getElementById("code-input");
let codeOutputDisplay= document.getElementById("code-output-display");
let error= document.getElementById("code-error");
let useClassDeclaration= document.getElementById("use-class-declaration");



let classNameContainer= document.createElement("div");
classNameContainer.id= "class-name-container";

let className= document.createElement("input");
className.id= "class-name";
className.value= "Main";

classNameContainer.innerHTML= "Program file name: ";
classNameContainer.appendChild(className);

document.body.insertBefore(classNameContainer, codeOutputDisplay);
/* 
  This above code sets us to remove and add the element. If we don't do this and
  merely set the visibility, a space will remain. It took way too long to get the
  variables sorted out. I should've used jQuery.
*/


codeInput.style.width= "300px";
codeInput.style.height= "300px";

let codeOutput= "";

let currIncrementor= 105; // Char 'i'

let loops= [];
let method, list, errors, stopCompile, lineNum;

let compilingLoopMode= false;
let indents= 0;

class Variable {
  constructor(type, value) {
    this.type= type;
    this.value= value;
  }
}

let variables= {
  placeholder: new Variable("words", "Placeholder."),
};

function saveVar(type, name, value) {
  variables[name]= new Variable(type, value);
}


function variableGenerator(type, name, value) {
  
  let trueType= getType(type, value);
  
  if(trueType == "String") value= "\"" + value + "\"";
  else if(trueType == "char") value= "'" + value + "'";
  
  codeOutput += createTextIndents() + trueType + " " + name + '= ' + value + ';';
  saveVar(trueType, name, value);

  console.log("Variable name: " + name);
  console.log("Variable value: " + value);
}



/* ============ BELOW ARE GENERAL FUNCTIONS ============ */

function createTextIndents() {
  let textIndents= "";
  for(let i = 0; i < indents; i++) {
    textIndents += "&nbsp;&nbsp;";
  }

  return textIndents;
}

function collectTermsPast(num, parts) {
  let terms= "";

  for(let i in parts) {
    if(i > num) {
      if(parts[i] == "[space]") terms += "[space]";
      else terms += parts[i] + " ";
    }
  }

  return terms.trim(); // removes spaces from end
}

function ocd() { // On Class Declaration
  if(useClassDeclaration.checked) {
    // classNameContainer.style.visibility= "visible";
    document.body.insertBefore(classNameContainer, codeOutputDisplay);
  } else {
    // classNameContainer.style.visibility= "collapse";
    classNameContainer.remove();
  }
}

function declareError(d, n) {
  errors.push({
    info: d,
    num: n,
  })
}





// The grand function himself!

function readLines() {
  let startTime= new Date().getTime();

  console.log("Compiling...");

  codeOutputDisplay.innerHTML= "[Reset]";
  codeOutput= "";
  error.innerHTML= "";
  errors= [];
  
  
  codeOutput += "import java.lang.Math;<br>\n";
  
  if(useClassDeclaration.checked) {
    codeOutput +=
      "class " +
      className.value.replaceAll(" ", "") +
      "<br>\n{<br>\n" +
      "&nbsp;&nbsp;public static void main(String[] args)<br>\n&nbsp;&nbsp;{<br>\n";
    indents= 2;
  } else {
    
    codeOutput= "";
    indents= 0;
  }

  if(codeInput.value.includes("read")) {
    codeOutput +=
      createTextIndents() + "Scanner read= new Scanner(System.in);<br>\n";
  }
  
  if(codeInput.value.includes("!docs")) {
    if(document.body.contains(docWindow)) docWindow.remove();
    else document.body.appendChild(docWindow);
    
    console.log("!docs called.");
    return;
  }

  for(lineNum in codeInput.value.split("\n")) {
    let line= codeInput.value.split("\n")[lineNum];
    
    if(stopCompile) break;
    
    console.log("Line started.");

    
    line= line.trim();

    let parts= line.split(" ");

    for(let i in parts) {
      if(parts[i] == "or") parts[i] = "||";
      else if (parts[i] == "and") parts[i] = "&&";
    }

    console.log(line);
    console.log(parts);
    
    /*if(method) {
      method.run(parts);
      
      if(parts[0] == "endheader") {
        console.log(method);
        method= false;
        indents ++;
      }
      continue;
    }*/

    if(loops.length > 0) {
      loops[loops.length - 1].run(parts);

      if(parts[0] == "endheader") {
        console.log(loops[loops.length - 1]);
        loops.splice(loops.length - 1, 1);
        indents ++;
        codeOutput += "\n<br>";
      } // Remove loop from list after end statement.

      continue;
    }
    
    if(list) {
      list.run(parts);
      if(parts[0] == "endheader") {
        console.log(list);
        list= false;
      }
      
      continue;
    }

    switch(parts[0].trim()) {
      case "end":
        indents--;
        codeOutput += createTextIndents() + "}";
        break;
        

      case "let":
      case "var":
      case "float":
        console.log("Creating variables: ");
        let val = "";

        for (let i in parts) {
          if (i > 1) {
            val += parts[i] + " ";
          }
        }

        variableGenerator(parts[0], parts[1], val.trim());
        break;
      
      case "[]":
      case "list":
        list= new List(parts[1], parts[2]);
        break;
        
      case "print":
      case "prt":
      case "p":
        codeOutput +=
          createTextIndents() +
          'System.out.print("' +
          collectTermsPast(0, parts) +
          ' ");';
        break;

      case "prtln":
      case "println":
      case "pln":
        text = "";

        for (let i in parts) {
          if (i > 0) {
            text += parts[i] + " ";
          }
        }

        codeOutput +=
          createTextIndents() + 'System.out.println("' + text + '");';
        break;

      case "prtvar":
      case "pvar":
      case "pv":
        codeOutput +=
          createTextIndents() +
          "System.out.print(" +
          collectTermsPast(0, parts) +
          ");";
        break;
      
      case "for":
      case "while":
        loops.push(new Loop(parts[0]));
        break;

      case "if":
        codeOutput += createTextIndents() + "if(";

        if (parts[2] == "==" && variables[parts[1]].type == getType("words"))
          codeOutput +=
            parts[1] +
            '.equalsIgnoreCase("' +
            collectTermsPast(2, parts) +
            '"))<br>\n' +
            createTextIndents() +
            "{";
        else
          codeOutput +=
            collectTermsPast(0, parts) +
            ")" +
            createTextIndents() +
            "<br>\n" +
            createTextIndents() +
            "{";


        indents ++;
        break;

      case "else":
      case "el":
        indents --;
        if(parts[1])
          codeOutput +=
            createTextIndents() +
            "} else if(" +
            collectTermsPast(1, parts) +
            ")<br>\n" +
            createTextIndents() +
            "{";
        else codeOutput += createTextIndents() + "} else {";
        indents ++;

        break;

      case "j":
      case "java":
        codeOutput += createTextIndents() + collectTermsPast(0, parts);
        break;

      case "read":
        let type, value;
        
        /*if(!(parts[2] in variables)) {
          type= parts[1] + " ";
        } Mysterious code that I forgot the function of*/
        
        type= getType("let", parts[1]) + " ";
        
        console.log(type);
        
        switch(type) {
          case "double ":
            value= "= read.nextDouble();";
            break;
          
          case "int ":
            value= "= read.nextInt();";
            break;
            
          case "String ":
            value= "= read.next();"
            break;
            
          default:
            throw new Error("Unidentified type: " + type);
        }

        codeOutput += createTextIndents() + type + parts[2] + value;
        break;

      case "add":
      case "+":
        codeOutput += createTextIndents() + parts[1] + " += " + parts[2] + ";";
        break;
        

      case "ask":
        codeOutput += createTextIndents() +
        "System.out.print(\"" +
        collectTermsPast(0, parts) + "\\n> \");";
        break;

      case "call":
        codeOutput += createTextIndents() + parts[1] + "();";
        break;

      case "set":
        codeOutput += createTextIndents() + parts[1] + "= " + parts[2] + ";";
        break;

      case "rand":
        let name = parts[1];
        let low = parseInt(parts[2]);
        let high = parseInt(parts[3]);
        codeOutput +=
          createTextIndents() + "int " + name + "= " + 
          "(int) Math.floor(Math.random() * " +
          (high - low + 1) + " + " + low + ");";

        break;
        
      case "out":
        codeOutput += createTextIndents() + "return " + collectTermsPast(0, parts) + ";";
        break;
      
      case "table":
        codeOutput += createTextIndents() +
        "HashMap <String, int> " + parts[1] + "= new HashMap<String, int>();";
        break;
        
      case "func":
		console.log("TERMS: " + collectTermsPast(2, parts));
        let method= genFunc(getType(parts[1]), parts[2], collectTermsPast(2, parts), false, true);
        //error.innerHTML= "Methods are not properly implemented. You may not use this.";
        
        codeOutput += createTextIndents() + method;
		indents++;
        break;
        

      case "//":
      case " ":
      case "":
        break;

      default:
        error.innerHTML =
          parts[0] + " command isn't in the basic command library. Line " + lineNum;
        break;
    }
    codeOutput += "<br>\n";
  }

  if(useClassDeclaration.checked) {
    codeOutput += "&nbsp;&nbsp;}<br>\n";
    codeOutput += "}<br>\n";
  }
  
  codeOutput= codeOutput.replaceAll("+= 1", "++");
  codeOutput= codeOutput.replaceAll("+= -1", "--");
  codeOutput= codeOutput.replaceAll("[space]", " ")

  
  codeOutputDisplay.innerHTML= codeOutput;
  console.log("Compiled. Output:");
  console.log(codeOutput);

  console.log("Runtime: " + (new Date().getTime() - startTime) + "ms");
}

// window.addEventListener("keyup", readLines);
// Auto-compile doesn't work when it updates once every keypress. Maybe I can optimise it.
