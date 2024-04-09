import React, { useState } from "react";

import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditCategory = () => {
  const { categoryId } = useParams();
  const { categoryState } = useSelector((state) => state); // state subscribe oluyoruz
  // formumuzun kontrolu icin state bagliyoruz

  const myCategory = categoryState.categories.find(
    (item) => item.id === categoryId
  ); //editleyecegimiz kategoriyi bulmak icin find metodu kullaniyoruz
  const [form, setForm] = useState(myCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    if (form.name === "") {
      toast.warning("Kategori alani bos birakilamaz ");
      return;
    }
    // Burada ana statetimizde mevcut olan kategori ile inputumuza girdigimiz kategori ismini esitliyoruz
    const hasCategory = categoryState.categories.find(
      (item) => item.name.toLowerCase() === form.name.toLowerCase()
    );
    if (hasCategory !== undefined) {
      toast.warning("Boyle bir kategori zaten mevcut");
      return;
    }
  };
  return (
    <div>
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="container mb-3">
            <label htmlFor="name" className="form-label">
              KATEGORI ADI
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Roman"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              disabled={
                form.name.toLocalLowerCase("tr-TR") ===
                myCategory.name.toLocalLowerCase("tr-TR")
                  ? true
                  : false
              }
              className="btn btn-primary w-25 my-3"
            >
              Guncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
