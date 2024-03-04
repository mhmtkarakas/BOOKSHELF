import React,{useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { toast } from "react-toastify";

import api from '../api/api';
import urls from '../api/urls';
import actionTypes from '../redux/actions/actionTypes';


const EditBook = () => {
    // useParams ile url deki id yi okuruz
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useSelector ile global state e abone oluruz.
    const {booksState,categoryState} = useSelector(state=>state);
    // find metodu ile edit yapacagimiz kitabi buluruz
    const myBook = booksState.books.find(item=>item.id === params.bookId);
    //console.log(myBook);
    const [form, setForm] = useState(myBook) // Baslangic degeri olarak myBook degerini atadik

    const handleSubmit = (e) => {
         e.preventDefault();
         // validation
         if (form.name === "" || form.author === "" || form.categoryId === "") {
            toast.warning("Lutfen Zorunlu Alanlari Giriniz");
          }
          // bu islem ile id sini belirledigimiz kitabi guncelliyoruz. Guncel kitap 
          // bilgilerinin oldugu formu direk yolluyoruz.
        api.put(`${urls.books}/${params.bookId}`, form)
        .then((res)=>{
            // API ile server imizda guncellememizden emin olduktan sonra statetimizi redux islemi ile guncelleriz
            dispatch({type:actionTypes.bookActions.EDIT_BOOK,payload:form}) // guncelledigimiz form oldugu icin formun kendisini yollariz
            toast.success("Kitap Guncelleme Basarili")
        // Ekleme isi basarili olduktan sonra useNavibate ile anasayfaya donmek istiyoruz
        navigate("/");
        })
        .catch((err)=>{
            toast.error("Kitap Guncellem Sirasinda Hata Olustu");
        })
    }
  return (
    <div className='container my-5 w-50'>
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
          //React ta selecti kontrol ederken bir baslangic degeri olarak default deger vermeliyiz
          defaultValue={categoryState.categories[0].id}
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
  )
}

export default EditBook
