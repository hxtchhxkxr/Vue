// utils.js
export const calculateTotal = (price, quantity) => price * quantity;
export const getProductName = (product) => product.name;
// export const fetchProduct = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         id: 1,
//         name: "초코 케이크",
//         price: 17000,
//       });
//     }, 1000);
//   });
// };
export const fetchProduct = (shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("상품 조회에 실패했습니다."));
        return;
      }

      resolve({
        id: 1,
        name: "초코 케이크",
        price: 17000,
      });
    }, 1000);
  });
};