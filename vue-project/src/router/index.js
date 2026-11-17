import { createRouter, createWebHistory } from "vue-router";
import ProductListView from "../views/ProductListView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "product-list",
      component: ProductListView,
    },
    {
      path: "/products/:id",
      name: "product-detail",
      component: ProductDetailView,
    },
  ],
});

export default router;