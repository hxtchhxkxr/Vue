<script setup>
import { computed, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductStore } from "../stores/products.js";

const route = useRoute();
const productStore = useProductStore();

const {
  products,
  isLoading,
  loadError,
  isLoaded,
} = storeToRefs(productStore);

const product = computed(() => {
  const productId = Number(route.params.id);

  return products.value.find((item) => item.id === productId);
});

onMounted(() => {
  productStore.loadProducts();
});
</script>

<template>
  <main class="detail-card">
    <h1>상품 상세</h1>

    <p v-if="isLoading" role="status">
      상품을 불러오는 중...
    </p>

    <div v-else-if="loadError">
      <p role="alert">{{ loadError }}</p>

      <button
        type="button"
        @click="productStore.loadProducts(false)"
      >
        다시 시도
      </button>
    </div>

    <template v-else-if="product">
      <h2>{{ product.name }}</h2>
      <p>{{ product.price.toLocaleString() }}원</p>
      <p>{{ product.soldOut ? "품절" : "판매 중" }}</p>
    </template>

    <p v-else-if="isLoaded">
      해당 상품을 찾을 수 없습니다.
    </p>

    <RouterLink to="/">목록으로 돌아가기</RouterLink>
  </main>
</template>

<style scoped>
.detail-card {
  padding: 28px;
  background: #fff;
  border: 1px solid #e9e1d7;
  border-radius: 20px;
}

h1 {
  margin: 0 0 16px;
}

p {
  color: #786b60;
}

a {
  display: inline-block;
  margin-top: 16px;
  color: #765a42;
  font-weight: 700;
}
</style>