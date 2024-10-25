// global variables 
let notesArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []


// remove loading screen
$(document).ready(function(){
       $('.loading').fadeOut(1000, ()=> $('.loading').remove());
       $('.invalid').hide();
});



// check vacation input
vacation: function checkInvalidation(selector){
       const invalidation = /^[A-Za-z]{3,}/
       const selectorInvalidation = `#${selector.id} + .invalid`

       if(!invalidation.test($(selector).val())){
              $(selectorInvalidation).fadeIn(1000);
       
       } else {
              $(selectorInvalidation).fadeOut(1000);
       }
}



// display items notes 
displayNotes: function displayItemsNotes(){
       let notesElement = ``

       displayItems: if (notesArray.length === 0) {
              $('.notes h1').show()
       
       } else {
              $('.notes h1').hide()

              for (i=0; i < notesArray.length; i++){
                     notesElement += `
                     <note class="item-note | rounded">
                            <div class="header | d-flex justify-content-between mb-1">
                                   <h3>${notesArray[i].title}</h3>
                                   <div class="buttons | d-flex gap-2">
                                          <button class="check | btn rounded-5"><i class="fa-solid fa-check"></i></button>
                                          <button onclick="deleteItemNote(${i})" class="delete | btn btn-danger rounded-5">
                                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 7" class="bin-top"><line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line><line stroke-width="3" stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1="12"></line></svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 39" class="bin-bottom" ><mask fill="white" id="path-1-inside-1_8_19"><path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path></mask><path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path><path stroke-width="4" stroke="white" d="M12 6L12 29"></path><path stroke-width="4" stroke="white" d="M21 6V29"></path></svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 89 80" class="garbage" ><path fill="white" d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"></path></svg>
                                          </button> 

                                   </div>
                            </div>
                            <span class="d-block mb-3">${notesArray[i].section}</span>
                            <p>${notesArray[i].content}.</p> 
                     </note>
                     `
              } 
       }

       document.querySelector('.items').innerHTML = notesElement
}displayItemsNotes()


// add items notes 
addItemsNotes: function addItemNotes() {
       let note = {
              title: $('.form .title input').val(),
              section: $('.form .section input').val(),
              content: $('.form .textarea textarea').val(),
       }

       notesArray.push(note)
       displayItemsNotes()
       
       localStorage.setItem('notes', JSON.stringify(notesArray))
       deleteInputs()
}

addNotes: $('button.add').click(function(){
       addItemNotes()
})

// or click enter
$(document).keypress(function(event){
       const inputTitle = $('.form .title input')
       const inputSection = $('.form .section input')
       const inputTextarea = $('.form .textarea textarea')

       conation_click_enter: if (event.key === 'Enter') {

              // check input value equal null or no
              conation_input: if (inputTitle.val() && inputSection.val() && inputTextarea.val()){
                     addItemNotes()    
              } else {
                     return;
              }
                 
       }
})


// delete items inputs value  
deleteInputs: function deleteInputs(){
       const note = {
              title: $('.form .title input').val(''),
              section: $('.form .section input').val(''),
              content: $('.form .textarea textarea').val(''),
       }
}


// delete item notes 
deleteNote: function deleteItemNote(selector){
       if (confirm('are you sure')) {
              notesArray.splice(selector,1)
              console.log(localStorage.notes = JSON.stringify(notesArray))
              displayItemsNotes()
       }
       
       return;
} 

// delete all items notes 
deleteAllNotes: $('.delete-all').click(function(){
       $('.item-note').fadeOut(1000, function(){
              notesArray = []
              localStorage.removeItem('notes')              
              displayItemsNotes()
       })
})
