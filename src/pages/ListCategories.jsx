import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CustomModal from "./../components/CustomModal";

import api from "../api/api";
import urls from "../api/urls";

const ListCategories = () => {
  // Modal icin state tutuyoruz
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
 // Belirledigimiz kategoriyi silmek icin state tutariz
  const [willDeleteCategory,setWillDeleteCategory] = useState("");
  // storumuza abone oluyoruz
  const { categoryState, booksState } = useSelector((state) => state);

  const deleteCategory = (id) =>{
    // silmek istedigimiz kategoriye ait kitaplari bulmamiz gerekir.
    const book = booksState.books.filter(item=>item.categoryId === id)
    console.table(book);
    api.delete(`${urls.categories}/${id}`) //veri tabanindan sileriz
    .then((resCat)=>{
        // Kategory silme islemini dispatch ederiz
        booksState.map(item =>{
          api.delete(`${urls.books}/${item.id}`)
          .then((resBook)=>{
            // dispatch delete book
          })
          .catch((err)=>{})
        })
    })
    .catch((err)=>{})
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-end my-5">
        <Link className="btn btn-primary " to={"/add-category"}>
          Kategory Ekle
        </Link>
      </div>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Sira No</th>
            <th scope="col">Kategori Adi</th>
            <th scope="col">Kayitli Kitap Sayisi</th>
            <th scope="col">Islemler</th>
          </tr>
        </thead>
        <tbody>
          {categoryState.categories.length === 0 && (
            <tr>
              <td colSpan={4}>Kayitli Kategori Yoktur</td>
            </tr>
          )}
          {categoryState.categories.length > 0 && (
            <>
              {categoryState.categories.map((category, index) => {
                // bu fonksiyon ile kitabin kategori id si ile categorinin id si esit olanlari filitreleyip books dizisinin icine atiyoruz
                // boylelikle books.length ile kategorinin sayisini bulmus oluruz. !!! onemli bir islem
                const books = booksState.books.filter(
                  (item) => item.categoryId === category.id
                );
                return (
                  <tr key={category.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{category.name}</td>
                    <td>{books.length}</td>
                    <td>
                      {/* Kategory sildigimiz zaman o kategoriye ait butun kitaplari da silmemiz gerekir.
                      Bu islemi hem merkezi storumuzda hem de veri tabaninda gerceklestirmemiz gerekir */}
                      <button
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setWillDeleteCategory(category.id) // silmek istedigimiz kategory
                        }}
                        className="btn btn-sm btn-danger"
                      >
                        Sil
                      </button>
                      <Link
                        className="btn btn-sm btn-secondary"
                        to={`/edit-category/${category.id}`}
                      >
                        Guncelle
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
      {
        // Modelimizda olmasini istedigimiz mesajlari prop olarak aliyoruz.
        openDeleteModal === true && (
          <CustomModal
            title="Kategory Silme"
            mesaj="Kategori ile beraber ilgili butun kitaplar da silinecektir. Bu islemi yapmak istediginize emin misiniz?"
            // Kullanici silme islemini iptal edebilir. Bunun icin fonksiyon propunu import ederiz.
            onCancel = {()=>{setOpenDeleteModal(false)}}

            onConfirm = {()=>deleteCategory(willDeleteCategory)} // Bu islemle kategory silinecek. Yukarda fonksiyonumuzu calistiracagiz.
          />
        )
      }
    </div>
  );
};

export default ListCategories;
