import actionTypes from "../actions/actionTypes";

// REDUCERDAKI ISLEMLER, VERI TABANINDA YAPTIGIMIZ ISLEMLERIN AYNISINI STORE ICIN DE YAPMAMIZ GEREKIR !!!
// REDUCER DAKI ISLEMLER ISTE STORE ICINDE YAPTIGIMIZ DEGISIKLIKLERI IFADE EDIYOR.
//  Kendi store umuzun icinde yapmamiz gereken degisikliklere tekabul ediyor!!!
const initialState = {
  pending: false,
  success: false,
  books: [],
  fail: false,
  error: "",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.bookActions.GET_BOOKS_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.bookActions.GET_BOOKS_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        books: action.payload,
      };
    case actionTypes.bookActions.GET_BOOKS_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };
    case actionTypes.bookActions.DELETE_BOOKS_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.bookActions.DELETE_BOOKS_SUCCESS:
      // Silme islemini reducer icinde yapiyoruz.
      const filteredBooks = state.books.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        books: filteredBooks,
      };
    case actionTypes.bookActions.DELETE_BOOKS_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };
    case actionTypes.bookActions.ADD_BOOK:
      return {
        ...state, // Butun state i geciririz
        books: [...state.books, action.payload], //books dizisinde ise state icindeki butun kitaplari getiririz. Ilaveten action icinde payload ile gelecek olan kitabi da diziye ekleriz
      };
    default:
      return state;
  }
};

export default booksReducer;
