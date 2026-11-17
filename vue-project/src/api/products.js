export const fetchProducts = (shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("상품 조회 요청 실패"));
        return;
      }

      resolve([
        { id: 1, name: "초코 케이크", price: 17000, soldOut: false },
        { id: 2, name: "딸기 케이크", price: 20000, soldOut: true },
        { id: 3, name: "치즈 케이크", price: 18000, soldOut: false },
      ]);
    }, 1000);
  });
};