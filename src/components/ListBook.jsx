import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

// List Book componentinde kitaplarimizi listeleyecegiz.
const ListBook = () => {
  // custommodal icin state olusturuyoruz
  const [showModal, setShowModal] = useState(false);
  // silmek istedigimiz book id sini tutmasi icin state olusturduk.
  const [willDeleteBook,setWillDeleteBook] = useState("");
  const dispatch = useDispatch();
  // ListBook componentinde verilerimizi ekrana basmak icin stora subscribe olmak gerek bunun icin useSelector ile sybscribe islemini gerceklestiriyoruz.
  const { booksState, categoryState } = useSelector((state) => state);
  console.log(categoryState);
  // Delete islemi icin burada fonksiyonumuzu olustururuz.
  const deleteBook = (id) => {
    // veri tabaninda bir silme islemi yaptiysak ayni silme islemini kendi statetimizde de yapmaliyiz. Bunu da reducerda yapiyoruz
    // reducer tarafindan store da silindikten sonra subscribe oldugumuz icin guncel hali componentimize gelecek ve guncel hali ekrana basilacak.
    dispatch({ type: actionTypes.bookActions.DELETE_BOOKS_START });

    api
      .delete(`${urls.books}/${id}`)
      .then((res) => {
        // silme isleminin baslamasi icin dispatch ile tetiklememiz gerekiyor
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOKS_SUCCESS,
          payload: id,
        });
        toast.success("Kitap başarıyla silindi");
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOKS_FAIL,
          payload: "Silme Islemi Esnasinda Hata Olustu",
        });
        toast.error("Kitap silinirken bir hata oluştu");
      });
  };
  return (
    <div className="my-5">
      <div className="d-flex justify-content-end me-5">
       <Link to={"/add-book"} className="btn btn-primary">Kitap Ekle</Link>
      </div>
      <div className="container ">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Sira No</th>
              <th scope="col">Adi</th>
              <th scope="col">Yazar</th>
              <th scope="col">Kategori</th>
              <th scope="col">Islemler</th>
            </tr>
          </thead>
          <tbody>
            {booksState.books.map((book, index) => {
              // return ile map arasina js kodu yazmak icin burada suslu parantez kullandik ve iki tabloyu birlestirdik
              //   let myCategory=null;
              // for dongusu kullanarak categories id ile books dizisinde bulunan categoryId esit olanlari buluyoruz
              //   for(let i=0; i<categoryState.categories.length;i++){
              //     if(categoryState.categories[i].id === book.categoryId){
              //         myCategory = categoryState.categories[i];
              //     }
              //   }

              // for dongusu ile yaptigimiz islemin kisaltilmis hali find metodudur. es6 ile gelen bir metottur
              const myCategory = categoryState.categories.find(
                (item) => item.id === book.categoryId
              );
              return (
                <tr key={book.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{myCategory.name}</td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        onClick={() => {
                          setShowModal(true);
                          // olusturdugumuz state ile book id sini deleteBook fonksiyonuna gonderdik.
                          setWillDeleteBook(book.id);
                        }}
                        type="button"
                        class="btn btn-danger"
                      >
                        Sil
                      </button>
                      <button type="button" class="btn btn-primary">
                        Duzenle
                      </button>
                      {/* farkli bir sayfaya gittigimizde hangi kitabin detayini goreceksek onun id sini de gormeyi bekleriz,
                      yani hangi kitabin detayini gormek istiyorsak onun id sini yazacagiz */}
                      <Link to={`/book-detail/${book.id}`} type="button" class="btn btn-success">
                        Detay
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {
        // customModal in acilmasini olusturdugumuz state ile sarta bagladik
        showModal === true && (
          <CustomModal
            title="Silme !!!"
            mesaj="Silmek Istediginize Emin misiniz?"
          // onCancel fonksiyonunu prop olarak CustomModal componentine gondeririz
          // bu sekilde setShowModal ile false cektigimiz modal onClick oldugunda kapanacak
            onCancel={()=>setShowModal(false)}
            // deleteBook fonksiyonuna parametre olarak willDeleteBook state imizi ekleriz
            // bu sekilde prop olarak gonderdigimiz onConfirm fonksiyonu CustomModal componentinde onClick oldugunda silinecek.
            onConfirm={()=>{
              deleteBook(willDeleteBook)
              setShowModal(true)}}
          />
        )
      }
    </div>
  );
};

export default ListBook;

// DELETE ISLEMI
//1. Oncelikle axios ile serverimiza bir delete istegi gonderecegiz
//2. Eger istegimiz basarili olursa yani silinirse bu defa storumuza dispatch ile bildirim yapiyoruz
//3. Veri tabanimizda bu silindi sende kendi store undan bunu sil diyerek bir action gonderdik
//4. Bu istegimiz booksReducer da ilgili case imize dusecek
//5. Reducer da ona dispatch ile gonderdigimiz ilgili id yi o da store icinde silecek ve kendi state ini guncelleyecek
//6. Kendi state ini guncelledikten sonra kendisine subscribe olan butun componentlere bildirim gider
//7. Yeni hali de ekrana basilir
