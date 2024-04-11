
import actionTypes from "../actions/actionTypes"


const  initialState = {
    pending:false,
    success:false,
    categories:[],
    fail:false,
    error:""
}

const categoryReducer = (state=initialState,action) =>{
           switch (action.type) {
            case actionTypes.categoryActions.GET_CATEGORIES_START:
                return{
                    ...state,
                    pending:true,
                }
              case actionTypes.categoryActions.GET_CATEGORIES_SUCCESS:
                return{
                    ...state,
                    pending:false,
                    success:true,
                    categories:action.payload,
                    fail:false
                }
                 case actionTypes.categoryActions.GET_CATEGORIES_FAIL:
                    return{
                        ...state,
                        pending:false,
                        success:false,
                        fail:true,
                        error:action.payload
                    }
                    // addcategory icin yeni case olustururuz. addbook islemine benzer bir case olacak
                    // bundan sonra yapacagimiz sadece bu islemi tetiklemek olacak
                    case actionTypes.categoryActions.ADD_CATEGORY:
                        return{
                            ...state,
                            categories:[...state.categories, action.payload]
                        }
                        case actionTypes.categoryActions.DELETE_CATEGORY:
                            var filteredCategories = state.categories.filter(item=>item.id !== action.payload)
                            return{
                                ...state,
                                categories:filteredCategories
                            }
                            case actionTypes.categoryActions.EDIT_CATEGORY:
                                const editCategory = state.categories.map((category)=>{ // for dongusu ile yaptigimiz islemleri map ile de yapabiliriz. Gecici dizi ile ugrasmak istemiyorsak map ile yapabiliriz.
                                    if(category.id !== action.payload.id){ // state in icindeki kategory id si ile action payload ile gonderdigimiz kategorinin id si ile esit degilse
                                      return category // kategorimizi oldugu gibi return ederiz
                                    }else{ //esit ise eski kategoriyi degilde yeni kategoriyi koyariz ve return ederiz
                                      return action.payload
                                    }
                                  })
                              return{
                                    ...state,
                                  categories:editCategory //burada butun statimizi alir sonra da booksumuzu edit book ile degisiriz.
                              }

            default:
                return state
           }
}

export default categoryReducer