import React from "react";
import { useSelector } from "react-redux";

const ListBooks = () => {
  // ListBook componentinde verilerimizi ekrana basmak icin stora subscribe olmak gerek bunun icin useSelector ile sybscribe islemini gerceklestiriyoruz.
  const { booksState, categoryState } = useSelector((state) => state);
  console.log(categoryState);
  //console.log(booksState);
  return (
    <div className="container">
      <table className="table table-strip">
        <thead>
          <tr>
            <th scope="col">Sira No</th>
            <th scope="col">Adi</th>
            <th scope="col">Yazar</th>
            <th scope="col">Kategori</th>
            <th scope="col">Islemler</th>
          </tr>
        </thead>
        <tbody>
          {booksState.books.map((book, index) => {
            let myCategory = null;
            // for dongusu kullanarak categories id ile books dizisinde bulunan categoryId esit olanlari buluyoruz
            for (let i = 0; i < booksState.books.length; i++) {
              if (categoryState.categories[i].id === book.categoryId) {
                myCategory = categoryState.categories[i];
              }
            }
            // const myCategory = categoryState.categories.find(item=>item.id===book.categoryId)

            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{myCategory.name}</td>
                <td>
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button type="button" class="btn btn-danger">
                      Sil
                    </button>
                    <button type="button" class="btn btn-primary">
                      Guncelle
                    </button>
                    <button type="button" class="btn btn-success">
                      Detay
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListBooks;
