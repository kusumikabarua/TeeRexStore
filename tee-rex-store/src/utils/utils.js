export function getTotalCartQuantity() {
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
    let totalQuantity = cartProducts.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return totalQuantity;
  }