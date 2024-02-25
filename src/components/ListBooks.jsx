// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import api from "../api/api";
// import urls from "../api/urls";
// import actionTypes from "../redux/actions/actionTypes";



// const ListBooks = () => {
//   const dispatch = useDispatch();
//   // ListBook componentinde verilerimizi ekrana basmak icin stora subscribe olmak gerek bunun icin useSelector ile sybscribe islemini gerceklestiriyoruz.
//   const booksState = useSelector((state) => state);
//   console.log(booksState);
//   const categoryState  = useSelector((state) => state);
//   console.log(categoryState);
//  // deleteBook fonksiyonunu burada olustururuz
//  const deleteBook = (id) =>{
//   //Burada silme islemi baslasin diyoruz
//   dispatch({type:actionTypes.bookActions.DELETE_BOOKS_START}) 
//   // api ile urls icinden kitaplara git ve id si su oaln kitabi sil deyip istek atiyoruz
//     api.delete(`${urls.books}/${id}`)
//     // basarili olursa then kismina duser
//     .then((res)=>{
//       dispatch({type:actionTypes.bookActions.DELETE_BOOKS_SUCCESS,payload:id})
//     })
//     // Basarisiz olursa catch kismina duser
//     .catch((err)=>{
//       dispatch({type:actionTypes.bookActions.DELETE_BOOKS_FAIL,payload:"Delete islemi sirasinda hata olustu"})
//     })
//  }
//   return (
//     <div className="container my-5">
//       <table className="table table-strip">
//         <thead>
//           <tr>
//             <th scope="col">Sira No</th>
//             <th scope="col">Adi</th>
//             <th scope="col">Yazar</th>
//             <th scope="col">Kategori</th>
//             <th scope="col">Islemler</th>
//           </tr>
//         </thead>
//         <tbody>
//           {booksState.books.map((book, index) => {
//             // let myCategory = null;
//             // for dongusu kullanarak categories id ile books dizisinde bulunan categoryId esit olanlari buluyoruz
//             // for (let i = 0; i < categoryState.categories.length; i++) {
//             //   if (categoryState.categories[i].id === book.categoryId) {
//             //     myCategory = categoryState.categories[i];
               
//             //   }
              
//             // }
           
//             //  const myCategory = categoryState.categories.find(item=>item.id===book.categoryId)
//             //   console.log(myCategory);
//             return (
//               <tr key={index}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{book.name}</td>
//                 <td>{book.author}</td>
//                 {/* <td>{ myCategory.name}</td> */}
//                 <td>
//                   <div
//                     class="btn-group"
//                     role="group"
//                     aria-label="Basic example"
//                   >
//                     <button onClick ={()=>deleteBook(book.id)} type="button" class="btn btn-danger">
//                       Sil
//                     </button>
//                     <button type="button" class="btn btn-primary">
//                       Guncelle
//                     </button>
//                     <button type="button" class="btn btn-success">
//                       Detay
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListBooks;
