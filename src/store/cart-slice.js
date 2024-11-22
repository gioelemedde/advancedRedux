import { createSlice } from "@reduxjs/toolkit";
import { UiSliceActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItems = action.payload;
      const existingItems = state.items.find((item) => item.id === newItems.id);
      state.totalQuantity++;
      if (!existingItems) {
        state.items.push({
          id: newItems.id,
          name: newItems.title,
          price: newItems.price,
          quantity: 1,
          totalPrice: newItems.price,
        });
      } else {
        existingItems.quantity++;
        existingItems.totalPrice += newItems.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItems = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItems.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItems.quantity--;
        existingItems.totalPrice -= existingItems.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      UiSliceActions.showNotification({
        status: "pending",
        title: "Pending",
        message: "Sending ...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-d9721-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    };

    try {
      await sendRequest();
      dispatch(
        UiSliceActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        UiSliceActions.showNotification({
          status: "error",
          title: "Error",
          message: "Error while sending cart data",
        })
      );
    }
  };
};

export const cartSliceActions = cartSlice.actions;

export default cartSlice;
