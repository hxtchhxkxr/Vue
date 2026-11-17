<script setup>
import { RouterLink } from "vue-router";

defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  "delete-product",
  "toggle-sold-out",
]);


</script>

<template>
  <article class="product-card">
    <h3>{{ product.name }}</h3>
    <RouterLink
      :to="{
        name: 'product-detail',
        params: { id: product.id },
      }"
    >
      상세 보기
    </RouterLink>
    <p class="price">{{ product.price }}원</p>

    <p v-if="product.soldOut">품절</p>
    <p v-else>판매 중</p>

    <button :disabled="product.soldOut">
      {{ product.name }} 구매
    </button>

    <button
        type="button"
        @click="emit('delete-product', product.id)"
    >
        삭제
    </button>

    <button
      type="button"
      @click="emit('toggle-sold-out', product.id)"
    >
       {{ product.soldOut ? "판매 재개" : "품절 처리" }}
    </button>
  </article>
</template>

<style scoped>
.product-card {
  box-sizing: border-box;
  width: 100%;
  margin: 16px 0;
  padding: 24px;
  background: #fff;
  border: 1px solid #e9e1d7;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgb(70 45 20 / 4%);
}

h3 {
  margin: 0 0 10px;
  color: #382e28;
  font-size: 19px;
  line-height: 1.4;
}

p {
  color: #786b60;
  font-size: 14px;
  line-height: 1.7;
}

.price {
  color: #765a42;
  font-size: 19px;
  font-weight: 700;
}

button {
  margin: 4px 6px 4px 0;
  padding: 11px 16px;
  border: none;
  border-radius: 10px;
  background: #765a42;
  color: #fff;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
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

@media (max-width: 480px) {
  .product-card {
    padding: 20px;
  }
}

a {
  display: inline-block;
  margin-bottom: 12px;
  color: #765a42;
  font-size: 14px;
  font-weight: 700;
}
</style>