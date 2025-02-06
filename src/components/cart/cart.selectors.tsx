export const selectProductsCount = (state) => {
  return state.cart.products.reduce((acc, curr) => acc + curr.quantity, 0);
};

export const selectProductsTotalPrice = (state) => {
  return state.cart.products.reduce(
    (acc, curr) => acc + curr.actual_price * curr.quantity,
    0
  );
};
