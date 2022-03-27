"use strict";

const input = document.getElementsByTagName("input");
const items = document.getElementsByClassName("items");
const todo_items = document.getElementsByClassName("item");
const check = document.getElementsByClassName("check");
const checkbox = document.getElementsByClassName("checkbox");
const total_todos = document.getElementsByClassName('total_todos')
const mode = document.getElementsByClassName('mode')
const todo_links = document.getElementsByClassName('todo_links')


// Getting input value and setting value in localStorage......................................................................................................................

input[0].addEventListener("change", (e) => {
  const value = input[0].value;

  const items = JSON.parse(localStorage.getItem("todo"));

    for (let i = 0; i < items.length; i++) {
      if (items[i].item == value) {
          alert('Todo Already available')
          return
      }
      
    }
  

  if (items) {
    set(value);
  } else {
    localStorage.setItem(
      "todo",
      JSON.stringify([{ item: value, completed: false }])
    );
  }

  setToLIst();
  input[0].value = "";
  drag()
});


//Updating localStaorage..................................................................................................................


function set(value) {
  const item = JSON.parse(localStorage.getItem("todo"));


  item.push({ item: value, completed: false });

  localStorage.setItem("todo", JSON.stringify(item));
  drag();
}


// Setting values to Dom ......................................................................................................................


function setToLIst() {

  items[0].innerHTML = "";
  const item = JSON.parse(localStorage.getItem("todo"));
    total_todos[0].innerHTML =  `${item.length} items left`


  if (item) {
    for (let i = 0; i < item.length; i++) {
      items[0].innerHTML += ` <div draggable="true" class="item">
        <div class="check">
        </div>
        <p class="todo ">${item[i].item}</p>
      <img src="./images/icon-cross.svg" alt="" class="delete">

        </div>`;
        // <button  class="delete">Delete</button>............................................................................................................

        
      if (item[i].completed == true) {
        todo_items[i].classList.add("complete");
        todo_items[i].getElementsByTagName("p")[0].classList.add("cross");
        check[i].classList.add("checkbox");
      }
    }
    for (let i = 0; i < item.length; i++) {
      if (item[i].completed == true) {
        check[i].innerHTML =
          '<img class="img" src="./images/icon-check.svg" alt=""></img>';
      }
    }
  }
  removeActiveLinks()
  todo_links[0].classList.add('active_link')
  todo_links[3].classList.add('active_link')
  // drag()
}

setToLIst();

// Deleting and checking todo.................................................................................................................


items[0].addEventListener("click", (e) => {
  const item = JSON.parse(localStorage.getItem("todo"));

  if (e.target.classList.contains('delete') ) {
    const fullDiv = e.target.parentNode.getElementsByTagName("p")[0].innerHTML;
    const NewTodoList = item.filter((e) => {
      return e.item != fullDiv;
    });
    localStorage.setItem("todo", JSON.stringify(NewTodoList));

    setToLIst();
    drag();
  }
  if (e.target.classList.contains("check") || e.target.classList.contains('img')) {
    let fullDiv;
    if (e.target.parentNode.classList.contains("item")) {
      fullDiv = e.target.parentNode.getElementsByTagName("p")[0].innerHTML;
    } else if (e.target.classList.contains("img")) {
      fullDiv =
        e.target.parentNode.parentNode.getElementsByTagName("p")[0].innerHTML;
    }

    item.forEach((e, i) => {
      if (e.item == fullDiv) {
        if (e.completed == false) {
          e.completed = true;
        } else {
          e.completed = false;
        }
      }
    });
    localStorage.setItem("todo", JSON.stringify(item));
    setToLIst();
    drag();
  }
});

// Drag and drop frunctionality..................................................................................................................


let current = null;

function drag() {
  for (let i of todo_items) {
    i.addEventListener("dragstart", (e) => {
      current = i;
      for (let item of todo_items) {
        if (item != current) {
          item.classList.add("hint");
        }
      }
    });

    i.addEventListener("dragend", (e) => {
      for (let item of todo_items) {
        item.classList.remove("hint");
        item.classList.remove("active");
      }
    });

    i.addEventListener("dragenter", (e) => {
      e.target.classList.add("active");
    });

    i.addEventListener("dragleave", (e) => {
      e.target.classList.remove("active");
    });

    i.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    i.addEventListener("drop", (e) => {
      e.preventDefault();
      if (i != current) {
        let dragposition = 0,
          drapposition = 0;
        for (let it = 0; it < todo_items.length; it++) {
          if (current == todo_items[it]) {
            dragposition = it;
          }
          if (i == todo_items[it]) {
            drapposition = it;
          }
        }
        if (dragposition < drapposition) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }

        // Uopdating value in localstorage............................................................................................................


      let items = [];
      for (let item of todo_items) {
        let todos = item.getElementsByTagName("p")[0].innerHTML;
        let completed;
        if (item.classList.contains("complete")) {
          completed = true;
        } else {
          completed = false;
        }

        items.push({ item: todos, completed: completed });

        localStorage.setItem("todo", JSON.stringify(items));
      }
    });
  }
}
drag();


// Modifying todos............................................................................................................




function removeActiveLinks() {
  for (let i = 0; i < todo_links.length; i++) {
    todo_links[i].classList.remove('active_link')
  }
}

function addActiveLInk(link) {
  try {
    const e = document.getElementsByClassName(link)
    for (let i = 0; i < e.length; i++) {
      e[i].classList.add('active_link')
    }

  } catch (error) {
    console.log(error);
  }
}


const modify_todos = (work) => {
  let todos = JSON.parse(localStorage.getItem("todo"));


   removeActiveLinks()   
   addActiveLInk(work)

 
      

  switch (work) {

    case "all_todos":

      setToLIst();
      break;

    case "active_todos":

      const active = todos.filter((e) => {
        return e.completed == false;
      });
      set_Edited_Todos(active);

      break;

    case "completed_todos":

      const completed_todos = todos.filter((e) => {
        return e.completed == true;
      });
      set_Edited_Todos(completed_todos);
      break;

    case "clear_completed_todos":

      console.log("clear al");
      const clear_completed_todos = todos.filter((e) => {
        return e.completed == false;
      });
      todos = [];
      todos = [...clear_completed_todos];
      localStorage.setItem("todo", JSON.stringify(todos));

      setToLIst();
      break;

    case "Active":
      break;

    default:
      break;
  }
};


function set_Edited_Todos(item) {
  items[0].innerHTML = "";

  for (let i = 0; i < item.length; i++) {

    items[0].innerHTML += ` <div draggable="true " class="item ${
      item[i].completed == true ? "completed" : ""
    }">
        <div class="check ${item[i].completed == true ? "checkbox" : ""}">
        ${
          item[i].completed == true
            ? '<img class="img" src="./images/icon-check.svg" alt=""></img>'
            : ""
        }
        
        </div>
        <p class="todo ${item[i].completed == true ? "cross" : ""}">${
      item[i].item
    }</p>
    <img src="./images/icon-cross.svg" alt="" class="delete">

        </div>`;
  }
  total_todos[0].innerHTML =  `${item.length} items left`

}


// for Dark mode............................................................................................................



const change_mode = () => {
    const  location = window.location.href

    document.body.classList.toggle('dark')
  if(mode[0].src == location+'images/icon-moon.svg'){
    mode[0].src = './images/icon-sun.svg'
  }else{
    mode[0].src = './images/icon-moon.svg'

  }

}



