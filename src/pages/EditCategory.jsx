import React, {useState} from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditCategory = () => {
  const { categoryId } = useParams();
  const { categoryState } = useSelector((state) => state); // state subscribe oluyoruz
  // formumuzun kontrolu icin state bagliyoruz
  const [form, setForm] = useState({
    id:myCategory,
    name:myCategory.name
  })
  const myCategory = categoryState.categories.find(
    (item) => item.id === categoryId
  ); //editleyecegimiz kategoriyi bulmak icin find metodu kullaniyoruz

  return (
    <div>
      <div className="container my-5">
        <form>
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
              onChange={(e)=>setForm({...form, name:e.target.value})}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary w-25 my-3">Guncelle</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
