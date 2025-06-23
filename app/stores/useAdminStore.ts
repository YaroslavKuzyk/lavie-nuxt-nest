import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin-store", () => {
  const breadcrumbs = ref<{ label: string; url: string }[]>([]);

  const setBreadcrumbs = (items: { label: string; url: string }[]) => {
    breadcrumbs.value = items;
  };

  return {
    breadcrumbs,
    setBreadcrumbs,
  };
});
