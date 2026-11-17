import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchProducts } from "../api/products.js";

export const useProductStore = defineStore("products", () => {
  const products = ref([]);
  const isLoading = ref(false);
  const loadError = ref("");
  const isLoaded = ref(false);
  const nextProductId = ref(1);

  const loadProducts = async (shouldFail = false) => {
    // 이미 조회했거나 조회 중이면 중복 실행하지 않음
    if (isLoaded.value || isLoading.value) {
      return;
    }

    isLoading.value = true;
    loadError.value = "";

    try {
      products.value = await fetchProducts(shouldFail);

      nextProductId.value =
        Math.max(0, ...products.value.map((item) => item.id)) + 1;

      isLoaded.value = true;
    } catch (error) {
      loadError.value = "상품 목록을 불러오지 못했어요.";
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const createProduct = (name, price) => {
    products.value.push({
      id: nextProductId.value++,
      name,
      price,
      soldOut: false,
    });
  };

  const deleteProduct = (productId) => {
    products.value = products.value.filter(
      (item) => item.id !== productId
    );
  };

  const toggleProductSoldOut = (productId) => {
    const targetProduct = products.value.find(
      (item) => item.id === productId
    );

    if (!targetProduct) {
      return;
    }

    targetProduct.soldOut = !targetProduct.soldOut;
  };

  return {
    products,
    isLoading,
    loadError,
    isLoaded,
    nextProductId,
    loadProducts,
    createProduct,
    deleteProduct,
    toggleProductSoldOut,
  };
});