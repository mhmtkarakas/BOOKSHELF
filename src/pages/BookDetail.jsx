import React, { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";

const BookDetail = () => {
  // useParams ile id sini okuttugumuz kitabin detayini ekrana basariz
  const params = useParams();
  // verilerimizi tutmak icin bir local state olusturuyoruz
  const [myBook, setMyBook] = useState(null);
  // category bilgisini tutmak icin bir state e ihtiyacimiz var.
  const [bookCategory, setBookCategory] = useState(null);

  useEffect(() => {
    // serverdan verilerimizi cekiyoruz
    api
      .get(`${urls.books}/${params.bookId}`)
      .then((resBook) => {
        //console.log(resBook.data);
        setMyBook(resBook.data);
        // kitap bilgilerini cekme isi basarili olduktan hemen sonra burada kategori bilgisi cekebiliriz.
        api.get(`${urls.categories}/${resBook.data.categoryId}`)
        .then((resCategory)=>{
            console.log(resCategory.data);
             setBookCategory(resCategory.data)
        })
        .catch((err)=>{})
      })
      .catch((err) => {});
  }, []);
  // Burada bir validation islemi yapiyoruz.
  if (myBook === null || bookCategory === null) {
    return null;
  }
  return (
    <div className="container my-5">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sira</th>
            <th scope="col">Kitap Adi</th>
            <th scope="col">Yazari</th>
            <th scope="col">Fiyati</th>
            <th scope="col">Yayin Evi</th>
            <th scope="col">ISBN</th>
            <th scope="col">Kategori</th>
          </tr>
        </thead>
        <tbody>
          
          <tr>
            <th scope="row">1</th>
            <td>{myBook.name}</td>
            <td>{myBook.author}</td>
            <td>{myBook.price} 	&#8378;</td>
            <td>{myBook.publisher}</td>
            <td>{myBook.isbn}</td>
            <td>{bookCategory.name}</td>
          </tr>
          <Link to={"/"}>Geri</Link>
        </tbody>
      </table>
    </div>
  );
};

export default BookDetail;

// useParams ile id sini okudugumuz kitabi serverimizdan axios ile cekip ekrana basariz
// Yazilim dunyasinda da islem bu sekilde yurur. Store dan ilgili id ye sahip kitabi cekmek mantikli degildir.
// 1. Once gittik useParams ile url yi okuduk. Url den kitabin id sini aldik
// 2. kitabin id sini aldiktan sonra kitabi cektik
// 3. daha sonra kitabin kategorisinin id sini de api ile cektik sonra da ekrana bastik.