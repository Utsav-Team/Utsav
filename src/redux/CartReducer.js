import {ADD_TO_CART} from './CartTypes';

const initialCart = {
  cart: [
    {
      itemId: 123,
      quantity: 3,
    },
    {
      itemId: 123,
      quantity: 3,
    },
    {
      itemId: 123,
      quantity: 3,
    },
  ],
};

const cartReducer = (state = initialCart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log('Added to cart');
      return {...state};

    default:
      return {...state};
  }
};

export default cartReducer;
