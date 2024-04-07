const BASE_ROUTE = "https://note-app-mr1c.onrender.com";

export enum ROUTES {
  GET_ALL = BASE_ROUTE + "/notes",
  CREATE = BASE_ROUTE + "/note/create",
  DELETE = BASE_ROUTE + "/note/",
  TOGGLE_PIN = BASE_ROUTE + "/note/togglePin/",
  UPDATE_NOTE = BASE_ROUTE + "/note/update",
}
