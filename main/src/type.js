
let altnames= {
  strings: [
    "word", "words", "w", "string", "characters", "str"
  ],
  
  chars: [
    "char", "letter", "character"
  ],
  
  integers: [
    "int", "whole-num", "num", "number", "numbers"
  ],
  
  decimals: [
    "decimal", "dec", "double", "dublin", "dub", "float"
  ],
  
  booleans: [
    "bool", "boolean", "b", "myBool"
  ],
  
  empty: [
    "none", "empty", "blank", "void"
  ]
};

let operators= {
  boolean: [
    ">", "<", "==", "&", "|",
  ],
  
  numerical: [
    "+", "-", "*", "/", "==", "%",
  ]
}

function isBooleanStatement(statement) {
  for(let op of operators.boolean) {
    if(statement.includes(op)) return true;
  }
  
  return false;
}

function getType(type, value) {
  if(type == "let" || type == "var") { // Automatic type deduction
    console.log("Automatic type deduction");
    
    if(Number.isNaN(parseFloat(value))) { // Value is not a number.
      console.log("Value is not a number.");
      if(value.length == 1) return "char"; 
      else return "String";
      /* 
        Java requires single-quotes to determine chars, so I'll have
        to implement that later.
      */
      
    } else {
      
      if(isBooleanStatement(value)) {
        return "boolean";
      } 
      
      if(value.includes(".")) return "double";
      else return "int";
      
    }
  }
  
  if(type == "float") { // Just in case.
    return "float";
  }
  
  if(altnames.strings.includes(type)) {
    if(type == "characters") declareError("You shouldn't use this alias. Try 'words'.", lineNum);
    
    return "String";
  }
  
  if(altnames.integers.includes(type)) {
    if(type == "character") declareError("You shouldn't use this alias. Try 'char'.", lineNum);
    
    return "int";
  }
  
  if(altnames.decimals.includes(type)) return "double";
  
  if(altnames.booleans.includes(type)) return "boolean";
  
  if(altnames.empty.includes(type)) return "void";
  
  
  return "NO_TYPE";
  
}






/*class Genfunc extends Generator {
  constructor(n, t, v) {
    super(n, t, v);
  }
  
  fullHeader() {
    this.headerStart() + "()"
  }
  
}*/











