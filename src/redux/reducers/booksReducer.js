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
      case actionTypes.bookActions.EDIT_BOOK:
        // let temp=[] // gecici bir dizi olustururuz
        // for(i=0;i<state.books.length;i++){ // for dongusu ile statin icindeki sepeti tek tek gezecegiz
        //      if(state.books[i].id !== action.payload.id){ //statin icindeki kitabin id si ile action payload ile gonderdigimiz kitabin id si ile esit degilse
        //        temp.push(state.books[i]) // olusturdugumuz gecici diziye oldugu gibi koyariz
        //      }else{
        //       temp.push(action.payload) //esit ise eski kitabi degilde yeni kitabi koyariz
        //      }
        // }
            const editBook = state.books.map((book)=>{ // for dongusu ile yaptigimiz islemleri map ile de yapabiliriz. Gecici dizi ile ugrasmak istemiyorsak map ile yapabiliriz.
              if(book.id !== action.payload.id){ // state in icindeki kitabin id si ile action payload ile gonderdigimiz kitabin id si ile esit degilse
                return book // kitabimizi oldugu gibi return ederiz
              }else{ //esit ise eski kitabi degilde yeni kitabi koyariz ve return ederiz
                return action.payload
              }
            })
        return{
              ...state,
            books:editBook //burada butun statimizi alir sonra da booksumuzu edit book ile degisiriz.
        }
        case actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY:
          var temp = state.books.filter(item => item.categoryId !== action.payload)
          return {
            ...state,
            books:temp
          }
    default:
      return state;
  }
};

export default booksReducer;
