<template>
  <Card>
    <CardHeader>
      <CardTitle>Галерея</CardTitle>
      <CardDescription>
        <GalleryList class="w-full pt-4" type="default" />
      </CardDescription>
    </CardHeader>
  </Card>
</template>

<script setup lang="ts">
import GalleryList from "~/components/admin/gallery/GalleryList.vue";
import { useAdminStore } from "~/stores/useAdminStore";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const adminStore = useAdminStore();

onMounted(async () => {
  adminStore.setBreadcrumbs([
    { label: "Головна", url: "/admin" },
    { label: "Галерея", url: "/admin/gallery" },
  ]);
});
</script>

<style scoped></style>
