import { ADD_TO_CART } from "./CartTypes"

export const addToCart = (itemName = 0) => {
    return {
        type: ADD_TO_CART,
        payload: itemName
    }
}