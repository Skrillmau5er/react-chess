import { createStore } from "redux";

const showMenu = () => {
  return {
    name: "SHOW_MENU",
  };
};

const hideMenu = () => {
  return {
    name: "HIDE_MENU",
  };
};

const menuStatus = (state = "hide", action) => {
  switch (action.type) {
    case "SHOW_MENU":
      return "show";
    case "HIDE_MENU":
      return "hide";
    default: 
      return "show";
  }
};

let store = createStore(menuStatus);

store.subscribe(() => console.log(store.getState()));

store.dispatch(showMenu());