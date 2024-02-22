import { createStore,combineReducers } from "redux";

import booksReducer from "./reducers/booksReducer";
import categoryReducer from "./reducers/categoryReducer";

const rootReducer = combineReducers({
    booksState:booksReducer,
    categoryState: categoryReducer
})

const store = createStore(rootReducer)

export default store;