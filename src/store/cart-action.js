import { cartSliceActions } from "./cart-slice";
import { UiSliceActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-d9721-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {     
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      return data;
    };

    try {
      const data = await fetchData();
      dispatch(cartSliceActions.replaceCart({
        items: data.items || [],
        totalQuantity: data.quantity,
      }));
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
          body: JSON.stringify({
            items: cart.items,
            quantity: cart.totalQuantity,
          }),
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
