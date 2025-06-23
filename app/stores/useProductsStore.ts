import { defineStore } from "pinia";
import { ref } from "vue";
import productsListMock from "@/helpers/productsListMock.json";

export const useProductsStore = defineStore("products-store", () => {
  const products = ref([]);
  const product = ref(null);
  const productMeta = ref(null);

  const fetchProducts = async () => {
    products.value = productsListMock.data;
    product.value = productsListMock.data[0];
    productMeta.value = productsListMock.meta;
  };

  return {
    products,
    product,
    productMeta,
    fetchProducts,
  };
});
