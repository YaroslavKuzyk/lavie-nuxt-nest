<template>
  <Card>
    <CardHeader>
      <CardTitle>Категорії</CardTitle>
      <div>
        <div class="flex gap-4 items-center justify-between mt-3">
          <div class="w-1/3">
            <Input v-model="search" type="text" placeholder="Пошук по назві" />
          </div>
          <div>
            <CreateCategoryDrawer>
              <template #trigger>
                <Button class="cursor-pointer">
                  <Plus />
                  Додати категорію
                </Button>
              </template>
            </CreateCategoryDrawer>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Назва</TableHead>
            <TableHead>Картинка</TableHead>
            <TableHead>Створено</TableHead>
            <TableHead>Оновлено</TableHead>
            <TableHead class="text-right">Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="categoriesStore.categories.length">
            <TableRow
              v-for="category in categoriesStore.categories"
              :key="category.id"
            >
              <TableCell>{{ category.id }}</TableCell>
              <TableCell>{{ category.name }}</TableCell>
              <TableCell>
                <img
                  :src="category.picture.path"
                  alt="category-picture"
                  class="w-10 h-10 object-cover"
                />
              </TableCell>
              <TableCell>{{
                $dayjs(category.createdAt).format("DD.MM.YYYY")
              }}</TableCell>
              <TableCell>{{
                $dayjs(category.updatedAt).format("DD.MM.YYYY")
              }}</TableCell>
              <TableCell class="text-right">
                <Button
                  variant="ghost"
                  class="size-9 mr-2 cursor-pointer"
                  @click="onEdit(category.id)"
                >
                  <Pencil />
                </Button>

                <Button
                  variant="ghost"
                  class="size-9 text-red-500 hover:text-red-500 cursor-pointer"
                  @click="onDelete(category.id)"
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="6" class="h-24 text-center">
                Немає результатів
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardContent>

    <EditCategoryDrawer
      :is-open="isOpen"
      :id="id ?? 0"
      @update:is-open="isOpen = $event"
    />
  </Card>
</template>

<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import { definePageMeta } from "#imports";
import { ref, watch, onMounted } from "vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Trash2 } from "lucide-vue-next";
import { useAdminStore } from "~/stores/useAdminStore";
import { useCategoriesStore } from "~/stores/useCategoriesStore";
import CreateCategoryDrawer from "~/components/admin/categories/drawers/CreateCategoryDrawer.vue";
import EditCategoryDrawer from "~/components/admin/categories/drawers/EditCategoryDrawer.vue";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const categoriesStore = useCategoriesStore();
const adminStore = useAdminStore();
const isOpen = ref(false);
const id = ref<number | null>(null);
const search = ref("");

const { data: categories } = useAsyncData("categories", async () => {
  return await categoriesStore.fetchCategories(search.value);
});

watch(
  () => search.value,
  async () => {
    await categoriesStore.fetchCategories(search.value);
  }
);

onMounted(async () => {
  adminStore.setBreadcrumbs([
    { label: "Головна", url: "/admin" },
    { label: "Категорії", url: "/admin/categories" },
  ]);
});

const onEdit = (categoryId: number) => {
  isOpen.value = true;
  id.value = categoryId;
};

const onDelete = async (id: number) => {
  await categoriesStore.deleteCategory(id);
};
</script>

<style scoped></style>
