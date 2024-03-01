import React from "react";
import { useSelector } from "react-redux";

const AddBook = () => {
  const { categoryState } = useSelector((state) => state);
  console.log(categoryState);
  return (
    <div className="container my-5 w-50">
      <form>
        <div class="mb-3">
          <label htmlFor="name" className="form-label">
            Kitap Adi
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Tutunamayanlar"
          />
        </div>
        <div class="mb-3">
          <label htmlFor="name" className="form-label">
            Yazar
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Oguz Atay"
          />
        </div>
        <div class="mb-3">
          <label htmlFor="yayinevi" className="form-label">
            Yayinevi
          </label>
          <input
            type="text"
            className="form-control"
            id="yayinevi"
            placeholder="Tutunamayanlar"
          />
        </div>
        <div class="mb-3">
          <label htmlFor="price" className="form-label">
            Fiyati
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="150.00"
          />
        </div>
        <div class="mb-3">
          <label htmlFor="isbn" className="form-label">
            ISBN
          </label>
          <input
            type="text"
            className="form-control"
            id="isbn"
            placeholder="989877767878"
          />
        </div>

        <select className="form-select">
         {
            categoryState.categories.map(item =>(
                <option value={item.id}>{item.name}</option>
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
