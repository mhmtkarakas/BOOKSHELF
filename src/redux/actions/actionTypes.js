const actionTypes = {  //olusacak durumlara gore actiontypelari olusturuyoruz. Ne kadar actiontypes varsa ayni sayida reducer olusturmamiz gerekir.
    bookActions:{
        // api ile islem oldugu icin uc asamali olan actionTypes'lari olusturuyoruz.
        GET_BOOKS_START:"GET_BOOKS_START",
        GET_BOOKS_SUCCESS:"GET_BOOKS_SUCCESS",
        GET_BOOKS_FAIL:"GET_BOOKS_FAIL",
        //Delete islemi icin uc asamali actionTypes larimizi olustururuz.
        //actionTypes'larimizi yazdiktan sonra ayni mantikla reducer da yazmamiz gerekir.
        DELETE_BOOKS_START:"DELETE_BOOKS_START",
        DELETE_BOOKS_SUCCESS:"DELETE_BOOKS_SUCCESS",
        DELETE_BOOKS_FAIL:"DELETE_BOOKS_FAIL",
        // Book eklemek icin tek asmali (uc asamali da olabilir ama bunu tek asamali yaptik) actionType olustururuz.
        // actionType imizi yazdiktan sonra reducer i yazariz
        ADD_BOOK:"ADD_BOOK",
        EDIT_BOOK:"EDIT_BOOK"
    },
    categoryActions:{
         GET_CATEGORIES_START:"GET_CATEGORIES_START",
         GET_CATEGORIES_SUCCESS:"GET_CATEGORIES_SUCCESS",
         GET_CATEGORIES_FAIL:"GET_CATEGORIES_FAIL",
         // Category eklemek cin yeni actiontype olusturmamiz gerekir
         ADD_CATEGORY:"ADD_CATEGORY"
    }
}

export default actionTypes;