import React, { useState } from "react";

import { toast } from "react-toastify";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import actionTypes from "../redux/actions/actionTypes";

import api from '../api/api';
import urls from '../api/urls';

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      (item) => item.name.toLocaleLowerCase() === form.name.toLocaleLowerCase()
    );
    if (hasCategory !== undefined) {
      toast.warning("Boyle bir kategori zaten mevcut");
      return;
    }
    api.put(`${urls.categories}/${categoryId}`,form)
    .then(res=>{
       dispatch({type:actionTypes.categoryActions.EDIT_CATEGORY,payload:form})
       navigate("/list-categories")
       toast.success("Edit islemi basarili")
       return;
    })
    .catch(err =>{})
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
            <button  disabled={
                form.name.toLocaleLowerCase("tr-TR") ===
                myCategory.name.toLocaleLowerCase("tr-TR")
                  ? true
                  : false
              } className="btn btn-primary w-25 my-3" type="submit">Guncelle</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
