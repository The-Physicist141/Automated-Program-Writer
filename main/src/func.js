

function genFunc(type, name, fakeArgs, isPrivate, isStatic) {
	let out= "";

	if(isPrivate) out += "private ";
	else out += "public ";

	if(isStatic) out += "static ";

	out += getType("let", type) + " ";
	out += name;
	
	fakeArgs= fakeArgs.split(" ");
	
	if(fakeArgs.length%2 == 1) {
		error.innerHTML= "Uneven number of arguments and types: " + fakeArgs.length;
		return;
	}
	
	let argsString= "";
	for(let i= 0; i < fakeArgs.length; i += 2) {
		let type= getType(fakeArgs[i]);
		let name= fakeArgs[i+1];
		
		argsString += type + " " + name;
		
		if(i < fakeArgs.length-2) argsString += ", ";
	}

	out += "(" + argsString + ") {";
  
  	console.log("OUT: " + out);
	return out;
}




/* class genFunc {
  constructor(name) {
    this.name= name;
    this.args= [
    ];
  }
  
  run(parts) {
    switch(parts[0]) {
      case "endheader":
        let header= createTextIndents() + "public static void " + this.name + "(";
        
        for(let i in this.args) {
          let arg= this.args[i];
          header += getType(arg[0]) + " " + arg[1];
          
          if(i < this.args.length -1) header += ", ";
        }
        
        header += ") {<br/>";
        
        codeOutput += "\n" + header;
        break;
        
      case "args":
        let args= parts.splice(1);
        
        for(let i= 0; i < args.length; i += 2) {
          let arg= args[i];
          
          if(i % 2 == 0) this.args.push([args[i], args[i + 1]]);
        }
        
        console.log(args);
        break;
    }
  }
}*/
// EOF