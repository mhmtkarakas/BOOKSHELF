import React, { useState,useEffect } from "react";
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
  const [willDeleteBook, setWillDeleteBook] = useState("");
  const dispatch = useDispatch();
  // ListBook componentinde verilerimizi ekrana basmak icin stora subscribe olmak gerek bunun icin useSelector ile sybscribe islemini gerceklestiriyoruz.
  const { booksState, categoryState } = useSelector((state) => state);
  // Inputumuzu kontrol etmek icin bir state olustururuz
  const [searchText, setSearchText] = useState("");
  // input icinde bir diziyi filitremeli ve filitreledigimiz diziyi ekrana basmaliyiz. Bunun tutmak icin de bir state olusturmaliyiz.
  const [filteredBooks, setFilteredBooks] = useState(booksState.books) // state imizin baslangic degeri butun kitaplari search yapacagimiz icin kitaplarimizin hepsidir
  //!!! searchText her degistiginde useEffect islemi yapmaliyiz. Bu da componentDidUpdate olur
  // Bu tur islemlerde yasam dongusu kullanmayi unutmamaliyiz
   useEffect(()=>{
    // Filtreleme islemini filter fonksiyonu icinde  includes isimli fonksiyon ile yapiyoruz. Bu fonksiyon case sensitive yani buyuk veya kucuk harf
    // duyarliligi vardir. Bu nedenle yapacagimiz islemde tolowercase yada touppercase yapmayi unutmamaliyiz
    // 1. temp isimli gecici bir dizi olusturduk
    // 2. stateimizdeki butun kitaplari aldik ve filter fonksiyonu ile filitreden gecirdik
    // 3. includes fonksiyonu ile searcText inputumuzu arattirdik 
    // 4. son olarak temp dizimizi setFilteredBooks statetimizin icine aldik.
    // Not. yazara gore arattirma yaparsak book.name yerine book.author yazmamiz yeterli
    const temp = booksState.books.filter(book => book.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredBooks(temp)
   },[searchText])

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
      <div className="container d-flex justify-content-center">
        {/* Kitap arama islemleri icin bir input yelestiririz */}
        <input
          className="form-control w-75 me-5 "
          type="text"
          placeholder="Kitap Ismi Giriniz..."
          value={searchText} // inputu kontrol ediyoruz
          onChange={(e)=>setSearchText(e.target.value)}
        />
        {// Kategori silince o kategoriye ait kitaplarin da silinmesini istiyoruz 
         // bu nedenle kitap eklemeden once kategory eklenmesi icin bu islem yapildi
          categoryState.categories.length === 0 ? (
            <Link to={"/add-category"}>Oncelikle Kategori Eklenmeli</Link>
          ) : (
            <Link to={"/add-book"} className="btn btn-primary ">
          Kitap Ekle
        </Link>
          )
        }
      </div>
      <div className="container my-5">
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
            {/* state imizi olusturdugumuz icin store un icindeki kitaplari degil de filteredBooks dizisini ekrana basariz*/}
            {filteredBooks.map((book, index) => {
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
                  {/* find metodu belirtilen kosulu saglayan bir oge bulamamasi durumunda "undefined" dondurebilir
                  Bu durumda myCategory.name ifadesi çalışmayacaktır çünkü undefined üzerinde name özelliği bulunmamaktadır.
                  Bu nedenle asagidaki gibi bir validation yapmaliyiz.*/}
                  <td>
                    {myCategory ? myCategory.name : "Bilinmeyen Kategori"}
                  </td>
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
                      {/* farkli bir sayfaya gittigimizde hangi kitabin detayini goreceksek onun id sini de gormeyi bekleriz,
                      yani hangi kitabin detayini gormek istiyorsak onun id sini yazacagiz */}
                      <Link
                        to={`/edit-book/${book.id}`}
                        type="button"
                        class="btn btn-primary"
                      >
                        Duzenle
                      </Link>
                      {/* farkli bir sayfaya gittigimizde hangi kitabin detayini goreceksek onun id sini de gormeyi bekleriz,
                      yani hangi kitabin detayini gormek istiyorsak onun id sini yazacagiz */}
                      <Link
                        to={`/book-detail/${book.id}`}
                        type="button"
                        class="btn btn-success"
                      >
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
            onCancel={() => setShowModal(false)}
            // deleteBook fonksiyonuna parametre olarak willDeleteBook state imizi ekleriz
            // bu sekilde prop olarak gonderdigimiz onConfirm fonksiyonu CustomModal componentinde onClick oldugunda silinecek.
            onConfirm={() => {
              deleteBook(willDeleteBook);
              setShowModal(false);
            }}
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
