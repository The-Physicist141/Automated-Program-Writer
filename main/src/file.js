
let fileSelectEl= document.getElementById("file-select");
let newFileIndex= 2;

let files= {
  "Main": "[Nothing]",
};

fileSelectEl.addEventListener("click", function() {
  /*
    If the current file exists, put the name in the name box and the contents
    in the tet editor. Or Else, something has gone horribly wrong.
  */
  
  let thisFile= fileSelectEl.value;
  
  if(files.hasOwnProperty(thisFile)) {
    
    codeInput.value= files[thisFile];
    className.value= thisFile;
    
  } else throw new Error(thisFile + " is not a file in the 'files' object.");
});

codeInput.addEventListener("keydown", function() {
  
  let thisFile= fileSelectEl.value;
  
  if(files.hasOwnProperty(fileSelectEl.value)) {
    files[thisFile]= codeInput.value;
  }
});

className.addEventListener("keydown", function(event) {
  /*
    This function extracts the contents, deletes the old file, and creates
    a new function of a different name.
  */
  
  if(event.keyCode != 13) return;
  
  let thisFile= fileSelectEl.value;
  let newFile= className.value;
  let contents= files[thisFile];
  
  files[newFile]= contents;
  delete files[thisFile]; // I'm a C++ programmer now.
  
  reloadFiles();
  
})


function createFile() {
  files["newFile" + newFileIndex]= "Property of File Generation Industries";
  newFileIndex ++;
  
  reloadFiles();
}

function reloadFiles() {
  
  fileSelectEl.innerHTML= "";
  
  for(let key of Object.keys(files)) {
    let newEl= document.createElement("option");
    newEl.value= key;
    newEl.innerHTML= key;
    
    fileSelectEl.appendChild(newEl);
  }
}

window.addEventListener("load", reloadFiles);

