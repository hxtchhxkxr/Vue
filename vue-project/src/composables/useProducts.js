import { ref } from "vue";
import { fetchProducts } from "../api/products.js";

export const useProducts = () => {
  const products = ref([]);
  const isLoading = ref(true);
  const loadError = ref("");

  let nextProductId = 4;

  const loadProducts = async (shouldFail = false) => {
    isLoading.value = true;
    loadError.value = "";

    try {
      products.value = await fetchProducts(shouldFail);
    } catch (error) {
      loadError.value = "상품 목록을 불러오지 못했어요.";
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const createProduct = (name, price) => {
    products.value.push({
      id: nextProductId++,
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
    loadProducts,
    createProduct,
    deleteProduct,
    toggleProductSoldOut,
  };
};