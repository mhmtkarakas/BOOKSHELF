const actionTypes = {  //olusacak durumlara gore actiontypelari olusturuyoruz. Ne kadar actiontypes varsa ayni sayida reducer olusturmamiz gerekir.
    bookActions:{
        GET_BOOKS_START:"GET_BOOK_START",
        GET_BOOKS_SUCCESS:"GET_BOOKS_SUCCESS",
        GET_BOOKS_FAIL:"GET_BOOKS_FAIL",
    },
    categoryActions:{
         GET_CATEGORIES_START:"GET_CATEGORIES_START",
         GET_CATEGORIES_SUCCESS:"GET_CATEGORIES_SUCCESS",
         GET_CATEGORIES_FAIL:"GET_CATEGORIES_FAIL",
    }
}

export default actionTypes;