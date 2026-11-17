import {
  calculateTotal,
  getProductName,
  fetchProduct,
} from "./utils.js";

const items = [
  { id: 1, name: "초코 케이크", price: 15000, soldOut: false },
  { id: 2, name: "딸기 케이크", price: 20000, soldOut: false },
];

let quantity = 1;

// 1. 두 번째 상품의 이름을 출력하기
console.log(items[1].name);

// 2. 첫 번째 상품의 가격을 17000으로 변경하기
items[0].price = 17000;
console.log(items[0].price);

// 3. 두 번째 상품을 품절 상태로 변경하기
items[1].soldOut = true;
console.log(items[1].soldOut);

// 4. quantity를 3으로 변경하기
quantity = 3;

// 5. 첫 번째 상품 가격 × quantity로 총금액을 계산해서 출력하기
const total = items[0].price * quantity;
console.log(total);

// ── 화살표 함수 실습 ──

// 1. price와 quantity를 받아 총금액을 반환하는
//    화살표 함수 calculateTotal 만들기
// const calculateTotal = (price, quantity) => price * quantity;


// 2. calculateTotal을 호출해서
//    첫 번째 상품을 3개 구매할 때의 총금액 출력하기
console.log(calculateTotal(items[0].price, quantity));


// 3. 상품 객체 product를 받아 상품 이름을 반환하는
//    화살표 함수 getProductName 만들기
// const getProductName = (product) => product.name;

// 4. getProductName을 호출해서 두 번째 상품의 이름 출력하기
console.log(getProductName(items[1]));

// ── 구조 분해 할당 실습 ──

// 1. 두 번째 상품에서 name과 soldOut을 구조 분해 할당으로 꺼내기
const { name, soldOut } = items[1];

// 2. 꺼낸 name과 soldOut 출력하기
console.log(name);
console.log(soldOut);

// 3. 첫 번째 상품의 price를
//    firstPrice라는 변수 이름으로 꺼내기
const { price: firstPrice } = items[0];

// 4. firstPrice 출력하기
console.log(firstPrice);

// 5. items 배열을 구조 분해 할당해서
//    cake1, cake2 변수에 각각 상품 객체 담기
const [cake1, cake2] = items;

// 6. cake1과 cake2의 이름 출력하기
console.log(cake1.name);
console.log(cake2.name);

// ── spread 문법 실습 ──

// 1. 첫 번째 상품을 복사하면서 price를 19000으로 바꾼
//    새 객체 saleProduct 만들기
const saleProduct = { ...items[0]};
saleProduct.price = 19000;

// 2. saleProduct.price와 items[0].price 출력하기
//    기대 결과: 19000, 17000
console.log(saleProduct.price);
console.log(items[0].price);

// 3. 아래 새 상품을 만들기
const newProduct = {
  id: 3,
  name: "치즈 케이크",
  price: 18000,
  soldOut: false,
};

// 4. spread를 사용해서 기존 items 뒤에 newProduct를 추가한
//    새 배열 newItems 만들기
const newItems = [...items, newProduct];

// 5. items.length와 newItems.length 출력하기
//    기대 결과: 2, 3
console.log(items.length);
console.log(newItems.length);

// ── map · filter · find 실습 ──

// 1. map을 사용해서 newItems의 가격만 담은
//    새 배열 prices 만들기
//    기대 결과: [17000, 20000, 18000]
const prices = newItems.map((product) => product.price);

// 2. filter를 사용해서 품절이 아닌 상품만 담은
//    새 배열 availableProducts 만들기
//    힌트: product.soldOut === false
const availableProducts = newItems.filter(
    (product) => product.soldOut === false
);

// 3. find를 사용해서 id가 3인 상품을 찾아
//    cheeseProduct에 저장하기
const cheeseProduct = newItems.find((product) => product.id === 3);

// 4. prices, availableProducts, cheeseProduct 출력하기
console.log(prices);
console.log(availableProducts);
console.log(cheeseProduct);

// 5. [응용] filter를 사용해서 id가 2인 상품을 제외한
//    새 배열 remainingProducts 만들기
//    힌트: 같지 않음은 !==
const remainingProducts = newItems.filter((product) => product.id !== 2);

// 6. remainingProducts와 원본 newItems의 길이 출력하기
//    기대 결과: 2, 3
console.log(remainingProducts.length);
console.log(newItems.length);

// newItems의 상품 중 id가 3인 상품만 가격을 22000으로 변경한
// 새 배열 updatedItems 만들기
// 원본 상품 객체는 수정하지 않기

const updatedItems = newItems.map((product) => {
  if (product.id === 3) {
    // 기존 상품을 복사하면서 price를 바꾼 새 객체 반환하기
    return {...product, price: 22000};
  }

  // 변경 대상이 아닌 상품은 그대로 반환하기
  return product;
});

console.log(updatedItems[2].price); // 22000
console.log(newItems[2].price);     // 18000

// console.log("1. 상품 요청");

// setTimeout(() => {
//   console.log("2. 상품 도착");
// }, 1000);

// console.log("3. 다른 작업");

// const loadProduct = async () => {
//   try {
//     console.log("상품 불러오는 중...");

//     const product = await fetchProduct(true);

//     console.log(product.name);
//   } catch (error) {
//     console.log("상품을 불러오지 못했어요.");
//     console.error(error);
//   } finally {
//     console.log("요청 처리 종료");
//   }
// };

const loadProduct = async (shouldFail) => {
  let isLoading = true;
  console.log("로딩 시작:", isLoading);

  try {
    // 1. fetchProduct에 shouldFail을 전달하고
    //    await로 결과를 받아 product에 저장하기
    const product = await fetchProduct(shouldFail);

    // 2. product의 이름 출력하기
    console.log(product.name);
  } catch (error) {
    // 3. error.message 출력하기
    console.error(error);
  } finally {
    // 4. isLoading을 false로 변경하기
    isLoading = false;

    console.log("로딩 종료:", isLoading);
  }
};

// 먼저 false로 실행하고, 이후 true로 바꿔서 확인하기
const runPractice = async () => {
  await loadProduct(false);
  await loadProduct(true);
};

runPractice();