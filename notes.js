// Require fileSystem
const fs = require("fs");
const { title } = require("process");

// Version 1

// const addNote = (title,body) =>{
//     const notes = loadNotes()  // []  // [{title:'sssa',body:'ds'}]
//     notes.push(  // [{title:'sssa',body:'ds'},{title:'test1',body:'body1'}]
//         {
//             title:title,
//             body:body
//         }
//     )
// saveNotes(notes)

// }

////////////////////////////////////////////////////////////////////////////////

// Version 2

const addNote = (title, body) => {
  const notes = loadNotes(); // []  // [{title:'sssa',body:'ds'}]

  // note {title:'sssa',body:'ds'}
  const duplicateTitles = notes.filter((note) => {
     
    // test1 === test f
    // test2 === test f
    // test3 === test3 f
    //       
    return note.title === title;
  });
  console.log(duplicateTitles);

  if (duplicateTitles.length === 0) {
    notes.push(
      // [{title:'sssa',body:'ds'},{title:'test1',body:'body1'}]
      {
        title: title,
        body: body,
      }
    );
    saveNotes(notes);
    console.log("Saved Successfully");
  } else {
    console.log("Error Duplicate Title");
  }
};

///////////////////////////////////////////////////////////////////////////////

// Read data from file
// Data --> json form ? notes.json
// To deal with data we need to onver it from json to object using JSON.parse
const loadNotes = () => {
  // Error bec. notes.json doesnot exist beginnig
  // const dataBuffer = fs.readFileSync('notes.json').toString()
  // return JSON.parse(dataBuffer)

  try {
    const dataBuffer = fs.readFileSync("notes.json").toString();
    //    console.log(dataBuffer)
    // json --> object  //{}
    return JSON.parse(dataBuffer);
  } catch (e) {
    return [];
  }
};

// SAVE note --> write
const saveNotes = (notes) => {
  // Convert to json    [{"title":'sssa',"body":'ds'},{"title":'test1',"body":'body1'}]
  const saveData = JSON.stringify(notes);
  fs.writeFileSync("notes.json", saveData);
};

///////////////////////////////////////////////////////////////////////////////////

// Delete

const removeNote = (title) =>{
    // first step
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=>{
       
        // note1 !== note80 T
        // note2 !== note80 T
        // note80 !== note80 F
        return note.title !== title
    })
    console.log(notesToKeep)
    saveNotes(notesToKeep)
   
}

//////////////////////////////////
// read 
const readNote = (title)=> { 
  const notes = loadNotes()
    const note = notes.find((note)=>{
      return note.title === title
    })
    if (note){
      console.log(note);
      console.log(note.title);
      console.log(note.body);
    }
   else{
     console.log('Erorr');
   }
}
// list array
const listNotes = function(){
  const notes = loadNotes()
  
  console.log(("List Notes"));

  notes.forEach((note) => {
      console.log("Title is :" +(note.title)+" Body is :"+(note.body))
  });
}
//////////////////////////////////////////////////////
module.exports = {
  // addNote
  // key : value (name of function)
  addNote: addNote,
  removeNote:removeNote,
  readNote:readNote,
  listNotes : listNotes

};
