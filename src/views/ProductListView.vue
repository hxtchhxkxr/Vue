<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import ProductCard from "../components/ProductCard.vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "../stores/products.js";

const product = {
  id: 1,
  name: "초코 케이크",
  price: 17000,
  description: "진한 초콜릿이 들어간 케이크",
};

const quantity = ref(1);

const increaseQuantity = () => {
  quantity.value += 1;
};

const decreaseQuantity = () => {
  if(quantity.value > 1){
    quantity.value -= 1;
  }
};

const soldOut = ref(false);

const toggleSoldOut = () => {
  soldOut.value = !soldOut.value;
};

// const {
//   products,
//   isLoading,
//   loadError,
//   loadProducts,
//   createProduct,
//   deleteProduct,
//   toggleProductSoldOut,
// } = useProducts();

const productStore = useProductStore();

// 상태는 반응성을 유지하도록 ref로 꺼내기
const {
  products,
  isLoading,
  loadError,
} = storeToRefs(productStore);

// 함수는 그대로 꺼내기
const {
  loadProducts,
  createProduct,
  deleteProduct,
  toggleProductSoldOut,
} = productStore;

const searchKeyword = ref("");
const onlyAvailable = ref(false);

const filteredProducts = computed(() => {
  const keyword = searchKeyword.value.trim();

  return products.value.filter((item) => {
    const matchesKeyword = item.name.includes(keyword);

    const matchesAvailability =
      !onlyAvailable.value || !item.soldOut;

    return matchesKeyword && matchesAvailability;
  });
});

const originalTitle = document.title;

watch(
  () => filteredProducts.value.length,
  (count) => {
    document.title = `상품 ${count}개 | 케이크샵`;
  },
  { immediate: true }
);

onUnmounted(() => {
  document.title = originalTitle;
});

const clearSearch = () => {
  searchKeyword.value = "";
};

const newProductName = ref("");
const newProductPrice = ref("");
const formError = ref("");

const addProduct = () => {
  if (isLoading.value || loadError.value) {
    return;
  }

  formError.value = "";

  const name = newProductName.value.trim();
  const price = Number(newProductPrice.value);

  if (name === "") {
    formError.value = "상품 이름을 입력해 주세요.";
    return;
  }

  if (!Number.isFinite(price) || price <= 0) {
    formError.value = "가격은 0보다 큰 숫자로 입력해 주세요.";
    return;
  }

  createProduct(name, price);

  resetProductForm();
};

const resetProductForm = () => {
  // 1. newProductName 비우기
  newProductName.value = "";

  // 2. newProductPrice 비우기
  newProductPrice.value = "";

  // 3. formError 비우기
  formError.value = "";
};

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <main class="product-card">
    <h1>{{ product.name }}</h1>
    <p>{{ product.price }}원</p>
    <p>{{ product.description }}</p>

    <p>수량: {{ quantity }}</p>

    <button @click="increaseQuantity" :disabled="soldOut">
      수량 증가
    </button>

    <button
      @click="decreaseQuantity"
      :disabled="soldOut || quantity <= 1"
    >
      수량 감소
    </button>

    <p v-if="soldOut">품절된 상품입니다.</p>
    <p v-else>구매 가능한 상품입니다.</p>

    <button @click="toggleSoldOut">판매 상태 변경</button>

    <p v-show="!soldOut">지금 주문할 수 있어요.</p>
  </main>

  <section class="product-list">
    <h2>상품 목록</h2>

    <form @submit.prevent="addProduct" novalidate>
      <h3>상품 등록</h3>

      <button type="button" @click="resetProductForm">
        입력 초기화
      </button>

      <div>
        <label for="new-product-name">상품명</label>
        <input
          id="new-product-name"
          v-model="newProductName"
          type="text"
          placeholder="예: 바나나 케이크"
        />
      </div>

      <div>
        <label for="new-product-price">가격</label>
        <input
          id="new-product-price"
          v-model="newProductPrice"
          type="number"
          placeholder="예: 15000"
        />
      </div>

      <p v-if="formError" role="alert">{{ formError }}</p>

      <!-- 조회 중이거나 조회에 실패하면 등록 불가 -->
      <button
        type="submit"
        :disabled="isLoading || !!loadError"
      >
        상품 등록
      </button>
    </form>

    <label for="product-search">상품 검색</label>

    <input
      id="product-search"
      v-model="searchKeyword"
      type="text"
      placeholder="상품 이름을 입력하세요"
    />

    <button
      @click="clearSearch"
      :disabled="searchKeyword === ''"
    >
      검색어 초기화
    </button>

    <label class="filter-option">
      <input type="checkbox" v-model="onlyAvailable" />
      판매 중인 상품만 보기
    </label>

    <p>입력한 검색어: {{ searchKeyword }}</p>

    <!-- 1. 조회 중 -->
    <p v-if="isLoading" role="status">
      상품 목록을 불러오는 중...
    </p>

    <!-- 2. 조회 실패 -->
    <div v-else-if="loadError">
      <p role="alert">{{ loadError }}</p>

      <button type="button" @click="loadProducts(false)">
        다시 시도
      </button>
    </div>

    <!-- 3. 조회 완료 -->
    <template v-else>
      <p>검색 결과: {{ filteredProducts.length }}개</p>

      <p v-if="filteredProducts.length === 0">
        검색 결과가 없습니다.
      </p>

      <ProductCard
        v-for="item in filteredProducts"
        :key="item.id"
        :product="item"
        @delete-product="deleteProduct"
        @toggle-sold-out="toggleProductSoldOut"
      />
    </template>
  </section>
</template>

<style scoped>
.product-list,
main.product-card,
input,
button {
  box-sizing: border-box;
}

/* 위쪽 단일 상품 카드 */
main.product-card {
  width: 100%;
  margin: 0 0 32px;
  padding: 28px;
  background: #fff;
  border: 1px solid #e9e1d7;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgb(70 45 20 / 4%);
}

h1,
h2,
h3 {
  color: #382e28;
  line-height: 1.4;
}

h1 {
  margin: 0 0 12px;
  font-size: 26px;
}

p {
  color: #786b60;
  font-size: 14px;
  line-height: 1.7;
}

/* 목록 영역 */
.product-list {
  width: 100%;
  margin: 0;
}

.product-list > h2 {
  margin: 40px 0 24px;
  font-size: 28px;
  text-align: left;
}

/* 상품 등록 폼 */
form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px 12px;
  margin-bottom: 32px;
  padding: 28px;
  background: #fff;
  border: 1px solid #e9e1d7;
  border-radius: 20px;
}

form h3 {
  align-self: center;
  margin: 0;
  font-size: 19px;
}

form > button[type="button"] {
  margin: 0;
  background: #f3eee7;
  color: #796653;
}

form > div,
form > p,
form > button[type="submit"] {
  grid-column: 1 / -1;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #625448;
  font-size: 13px;
  font-weight: 700;
}

input {
  width: 100%;
  min-width: 0;
  padding: 13px 14px;
  border: 1px solid #dfd6cb;
  border-radius: 10px;
  background: #fffdfa;
  color: #382e28;
  font: inherit;
  font-size: 14px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

input::placeholder {
  color: #a99d91;
}

input:focus {
  outline: none;
  border-color: #947454;
  box-shadow: 0 0 0 3px rgb(148 116 84 / 14%);
}

/* 버튼 */
button {
  padding: 11px 16px;
  border: none;
  border-radius: 10px;
  background: #765a42;
  color: #fff;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}

button:hover:not(:disabled) {
  background: #604732;
}

button:focus-visible {
  outline: 3px solid #bd9c79;
  outline-offset: 3px;
}

button:disabled {
  background: #eee9e2;
  color: #a89e93;
  cursor: not-allowed;
}

main.product-card button {
  margin: 4px 6px 4px 0;
}

form > button[type="button"]:hover {
  background: #e9dfd2;
}

form > button[type="submit"] {
  padding: 14px;
}

form p[role="alert"] {
  margin: 0;
  color: #b34336;
}

/* 검색 */
.product-list > label {
  margin-top: 8px;
}

.product-list > button {
  margin-top: 10px;
  background: #eae1d6;
  color: #69533f;
}

.product-list > button:hover:not(:disabled) {
  background: #ddd0bf;
}

.product-list > button:disabled {
  background: #eee9e2;
  color: #a89e93;
}

.product-list > p {
  margin: 12px 0;
}

/* 작은 화면 */
@media (max-width: 480px) {
  :global(#app) {
    padding: 24px 16px 40px;
  }

  form,
  main.product-card {
    padding: 20px;
  }
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
  cursor: pointer;
}

.filter-option input {
  width: auto;
  margin: 0;
  accent-color: #765a42;
}
</style>