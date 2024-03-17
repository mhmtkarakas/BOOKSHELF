import React, {useState} from "react";
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from "react-redux";

import actionTypes from "../redux/actions/actionTypes";

import api from "../api/api"
import urls from "../api/urls"

import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {categoryState} = useSelector((state)=>state);

    // formu kontrol etmek icin useState kullandik
    const [form,setForm] = useState({
        id:String(new Date().getTime()),
        name:""
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        // validation
        if(form.name=== ""){
            toast.warning("Kategori alani bos birakilamaz ")
            return
        }
        // Burada ana statetimizde mevcut olan kategori ile inputumuza girdigimiz kategori ismini esitliyoruz
        const hasCategory = categoryState.categories.find(
          (item) => item.name.toLowerCase() === form.name.toLowerCase()
        );
        if(hasCategory !== undefined){
          toast.warning("Boyle bir kategori zaten mevcut")
          return;
        }
        // kullanicinin girdigi yeni kategoriyi server a kaydetmemiz gerekir
        api.post(urls.categories,form)
        // Tetikleme islemi then kisminda dispatch ile olacak olacak
        .then((res)=>{
          dispatch({type:actionTypes.categoryActions.ADD_CATEGORY, payload:form})
          navigate("/list-categories")
        })
        .catch((err)=>{
          toast.warning("Kategory eklerken bir hata olustu")
        })
    }
  return (
    <div className=" my-5">
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
            // formu kontrol ediyoruz
            value={form.name}
            onChange={(event)=>setForm({...form,name:event.target.value})}
          />
        </div>
        <div className="d-flex justify-content-center">
            <button className="btn btn-primary w-25 my-3">Kaydet</button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
