import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import api from "../api/api";
import urls from "../api/urls";

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // kategorileri almak icin store subscribe oluyoruz.
  const { categoryState } = useSelector((state) => state);
  // Tek bir State icinde formu tutabiliriz. Baslangic halinde formun butun degerlerini bir obje halinde tutacagiz.
  const [form, setForm] = useState({
    // Formun butun bilgileri burada var
    name: "",
    author: "",
    publisher: "",
    isbn: "",
    price: "",
    categoryId: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    if (form.name === "" || form.author === "" || form.categoryId === "") {
      toast.warning("Lutfen Zorunlu Alanlari Giriniz");
    }
    // Ekledigimiz kitap bilgilerini server tarafina kaydini yapiyoruz
    const newBook = {
      ...form,
      id: String(new Date().getTime())
    }
    api
      .post(urls.books, newBook)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.ADD_BOOK, //ADD_BOOK isimli action tetikletmek istiyoruz.
          payload: newBook,// payload olarak da bir kitap gonderiyoruz ve kitap icin id olusturuyoruz.
        });
        toast.success("Kitap Ekleme Basarili")
        // Ekleme isi basarili olduktan sonra useNavibate ile anasayfaya donmek istiyoruz
        navigate("/");
      })
      .catch((error) => {
        toast.error("Kitap Ekleme Sirasinda Hata Olustu");
      });
  };
  return (
    <div className="container my-5 w-50">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlFor="name" className="form-label">
            Kitap Adi:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Tutunamayanlar"
            // inputlarimizi kontrol ediyoruz.
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="author" className="form-label">
            Yazar:
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="Oguz Atay"
            value={form.author}
            onChange={(event) =>
              setForm({ ...form, author: event.target.value })
            }
          />
        </div>
        <div class="mb-3">
          <label htmlFor="yayinevi" className="form-label">
            Yayinevi:
          </label>
          <input
            type="text"
            className="form-control"
            id="yayinevi"
            placeholder="Iletisim"
            value={form.publisher}
            onChange={(event) =>
              setForm({ ...form, publisher: event.target.value })
            }
          />
        </div>
        <div class="mb-3">
          <label htmlFor="price" className="form-label">
            Fiyati:
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="150.00"
            value={form.price}
            onChange={(event) =>
              setForm({ ...form, price: Number(event.target.value) })
            }
          />
        </div>
        <div class="mb-3">
          <label htmlFor="isbn" className="form-label">
            ISBN:
          </label>
          <input
            type="text"
            className="form-control"
            id="isbn"
            placeholder="989877767878"
            value={form.isbn}
            onChange={(event) => setForm({ ...form, isbn: event.target.value })}
          />
        </div>

        <select
          className="form-select"
          value={form.categoryId}
          onChange={(event) =>
            setForm({ ...form, categoryId: event.target.value })
          }
        >
          {
            // subscribe olduktan sonra burada select icinde kategorileri map ile ekrana basiyoruz.
            categoryState.categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))
          }
        </select>

        <div className="d-flex justify-content-center my-5">
          <button className="btn btn-primary w-50" type="submit">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
