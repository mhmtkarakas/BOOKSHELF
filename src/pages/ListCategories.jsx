import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListCategories = () => {
    // storumuza abone oluyoruz
  const { categoryState, booksState } = useSelector((state) => state);
  console.log(categoryState);
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-end my-5">
        <Link className="btn btn-primary " to={"/add-category"}>Kategory Ekle</Link>
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
            {
                categoryState.categories.length === 0 && (
                    <tr>
                        <td colSpan={4}>Kayitli Kategori Yoktur</td>
                    </tr>
                )
            }
          {
            categoryState.categories.length >0 && (
                <>
                {
                    categoryState.categories.map((category,index) => {
                        // bu fonksiyon ile kitabin kategori id si ile categorinin id si esit olanlari filitreleyip books dizisinin icine atiyoruz
                        // boylelikle books.length ile kategorinin sayisini bulmus oluruz. !!! onemli bir islem
                        const books = booksState.books.filter(item=>item.categoryId ===  category.id)
                        return (
                            <tr key={category.id}>
                              <th scope="row">{index+1}</th>
                              <td>{category.name}</td>
                              <td>{books.length}</td>
                              <td>@mdo</td>
                            </tr>
                          )
                    })
                }
                </>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default ListCategories;
