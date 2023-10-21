import  {combineReducers} from "redux";
import categoryReducer from "./Category/Reducer";
import restaurantReducer from "./Restaurant/Reducer";
import foodReducer from "./Food/Reducer";
import cartReducer from "./Cart/Reducer";
const rootReducer = combineReducers({
        category: categoryReducer,
        restaurant: restaurantReducer,
        food: foodReducer,
        cart: cartReducer
})

export default rootReducer