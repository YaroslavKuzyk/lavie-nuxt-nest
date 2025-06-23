<template>
  <Card>
    <CardHeader>
      <CardTitle>Продукти</CardTitle>
      <CardDescription>
        <div class="flex gap-4 items-center justify-between mt-3">
          <div class="w-1/3">
            <Input
              type="text"
              placeholder="Пошук по назві, категорії, кольору, розміру"
            />
          </div>
          <div>
            <Button>
              <NuxtLink
                to="/admin/products/create"
                class="flex items-center gap-2"
              >
                <Plus />
                Додати продукт
              </NuxtLink>
            </Button>
          </div>
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Назва</TableHead>
            <TableHead>Категорія</TableHead>
            <TableHead>Розмір</TableHead>
            <TableHead>Колір</TableHead>
            <TableHead>Кількість</TableHead>
            <TableHead>Ціна</TableHead>
            <TableHead>Знижка</TableHead>
            <TableHead>Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="productsStore.products.length">
            <TableRow
              v-for="product in productsStore.products"
              :key="product.id"
            >
              <TableCell>{{ product.name }}</TableCell>
              <TableCell>{{ product.category }}</TableCell>
              <TableCell>{{ product.size }}</TableCell>
              <TableCell>{{ product.color.name }}</TableCell>
              <TableCell>{{ product.quantity }}</TableCell>
              <TableCell> {{ product.price }} грн </TableCell>
              <TableCell>
                {{ product.discount ? `${product.discount} грн` : "-" }}
              </TableCell>
              <TableCell>
                <Button variant="ghost" class="size-9 mr-2">
                  <NuxtLink to="/">
                    <Pencil />
                  </NuxtLink>
                </Button>

                <Button
                  variant="ghost"
                  class="size-9 text-red-500 hover:text-red-500"
                >
                  <NuxtLink to="/">
                    <Trash2 />
                  </NuxtLink>
                </Button>
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="6" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter class="flex justify-end">
      <Pagination class="mx-0 justify-end" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Trash2 } from "lucide-vue-next";
import Pagination from "~/components/common/Pagination.vue";
import { useAdminStore } from "~/stores/useAdminStore";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const productsStore = useProductsStore();
const adminStore = useAdminStore();

onMounted(async () => {
  await productsStore.fetchProducts();
  adminStore.setBreadcrumbs([
    { label: "Головна", url: "/admin" },
    { label: "Продукти", url: "/admin/products" },
  ]);
});
</script>

<style scoped></style>
