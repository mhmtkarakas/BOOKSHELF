import React from 'react'
import { useSelector } from "react-redux";

const ListBooks = () => {
      // ListBook componentinde verilerimizi ekrana basmak icin stora subscribe olmak gerek bunun icin useSelector ile sybscribe islemini gerceklestiriyoruz.
    const {booksState} = useSelector(state=>state)
    console.log(booksState);
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
    {
        booksState.books.map((book,index)=>(
            <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>Butonlar Gelecek</td>
          </tr>
        ))
    }
    
 
  </tbody>
</table>
    </div>
  )
}

export default ListBooks
