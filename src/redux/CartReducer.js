import {ADD_TO_CART} from './CartTypes';

const initialCart = {
  products: [
    {
      id: 1,
      name: 'Agarbatti',
      category: 'Pooja Samagri',
      price: 12,
      quantity: 30,
    },
    {
      id: 2,
      name: 'Agarbatti',
      category: 'Pooja Samagri',
      price: 12,
      quantity: 25,
    },
    {
      id: 3,
      name: 'Agarbatti',
      category: 'Pooja Samagri',
      price: 12,
      quantity: 15,
    },
  ],
  cart: [
    {
      id: 1,
      quantity: 3,
    },
    {
      id: 2,
      quantity: 2,
    },
    {
      id: 3,
      quantity: 1,
    },
  ],
  orders: [
    {
      id: '123456',
      time: 1617445671655,
      total: '234',
    },
    {
      id: '123443',
      time: 1617145671655,
      total: '234',
      items: [
        {
          id: 1,
          name: 'Agarbatti',
          category: 'Pooja Samagri',
          price: 12,
          quantity: 2,
        },
        {
          id: 2,
          name: 'Havan Samagri',
          category: 'Pooja Samagri',
          price: 12,
          quantity: 5,
        },
      ],
    },
    {
      id: '129856',
      time: 1613989999579,
      total: '234',
    },
  ],
};

const cartReducer = (state = initialCart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let newState = {...state};
      newState.cart = [...state.cart];
      let itemIndex = state.cart.findIndex(
        (item) => item.itemId === action.payload,
      );
      if (itemIndex === -1) {
        newState.cart.push({itemId: action.payload, quantity: 0});
      } else {
        newState.cart[itemIndex].quantity++;
      }
      return newState;

    default:
      return {...state};
  }
};

export default cartReducer;

export const getTotalCartItems = () => {
  let totalPrice = 0;
  let totalItems = 0;
  initialCart.cart.forEach((currentItem) => {
    let ind = initialCart.products.findIndex(
      (product) => product.id == currentItem.id,
    );
    if (ind != -1) {
      totalPrice += initialCart.products[ind].price * currentItem.quantity;
      totalItems += currentItem.quantity;
    }
  });
  return {totalPrice, totalItems};
};
