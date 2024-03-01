import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import Error from "./pages/Error";

import api from "./api/api";
import urls from "./api/urls";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";


function App() {
      const dispatch = useDispatch();
      const {booksState,categoryState} = useSelector(state=>state)
      // console.log(booksState);
      // console.log(categoryState);
      useEffect(()=>{
        // Dispatch yapacagiz ve bizden bir action bekliyor. Action dedigimiz sey bir objeden ibarettir ve bir type i olmali !!!
        // Bunun bir payload i yok cunku yaptigi tek sey pending i true yapmak
         dispatch({type:actionTypes.bookActions.GET_BOOKS_START}) 
         api.get(urls.books)
         // Basarili olursa then kismina duser
         .then((res)=>{
           dispatch({type:actionTypes.bookActions.GET_BOOKS_SUCCESS,payload:res.data}) //Planimizi payload ile birlikte bir dizi gelecek sekilde yaptik. data ile birlikte zaten dizi gelmektedir.
         })
         // Basarisiz olursa catch kismina duser
          .catch((err)=>{
          dispatch({type:actionTypes.bookActions.GET_BOOKS_FAIL,payload:"server tarafinda hata olustu"})
          })
          /* fetch categories */
          dispatch({type:actionTypes.categoryActions.GET_CATEGORIES_START}) 
          api.get(urls.categories)
          .then((res)=>{
            dispatch({type:actionTypes.categoryActions.GET_CATEGORIES_SUCCESS,payload:res.data})
          })
          .catch((err)=>{
            dispatch({type:actionTypes.categoryActions.GET_CATEGORIES_FAIL,payload:"server tarafinda hata olustu"})
          })
      },[])
         // validation
      if (booksState.success === false || categoryState.success === false)
      return null;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
         {/* book-dateil pathimizden sonra : isareti bir degisken gelecegi anlamina gelir. Yazacagimiz degisken ismi 
         ListBook komponentinde yazdigimiz book.id yi isaret eder. Bu sekilde yapmamizin nedeni useParams ile url den
         okudugumuz id ye ait olan kitap bilgilerini bookDetail sayfasina cekmektir. !!! */}
        <Route path="/book-detail/:bookId" element={<BookDetail />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
