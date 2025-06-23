<template>
  <div>
    <div class="flex gap-4 mb-4">
      <div class="relative">
        <Input
          type="text"
          v-model="galleryStore.galleryParams.search"
          placeholder="Search"
          class="w-[250px]"
        />
        <div
          v-if="galleryStore.galleryParams.search"
          class="absolute right-0 top-0 cursor-pointer h-full flex items-center justify-center p-2"
          @click="galleryStore.galleryParams.search = ''"
        >
          <X class="w-4 h-4" />
        </div>
      </div>
      <div class="relative">
        <Select v-model="galleryStore.galleryParams.userId">
          <SelectTrigger class="cursor-pointer w-[250px]">
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="user in 10" :key="user" :value="user">
              User {{ user }}
            </SelectItem>
          </SelectContent>
        </Select>
        <div
          v-if="galleryStore.galleryParams.userId"
          class="absolute right-0 top-0 cursor-pointer h-full flex items-center justify-center p-2"
          @click="galleryStore.galleryParams.userId = null"
        >
          <X class="w-4 h-4" />
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-4">
      <ImgUploadThumb @filesSelected="handleFiles" />
      <ImgThumb
        v-for="img in galleryStore.galleryImagesMeta.data"
        :img="{
          url: img.path,
        }"
        :key="img.id"
        @onDelete="handleDelete(img.id)"
      />
    </div>

    <Pagination
      class="w-full"
      :total="galleryStore.galleryImagesMeta.meta.total"
      :page="galleryStore.galleryParams.page"
      :perPage="galleryStore.galleryParams.perPage"
      v-model="galleryStore.galleryParams.page"
    />
  </div>
</template>

<script setup lang="ts">
import ImgUploadThumb from "~/components/common/ImgControls/ImgUploadThumb.vue";
import { useGalleryStore } from "~/stores/useGalleryStore";
import ImgThumb from "~/components/common/ImgControls/ImgThumb.vue";
import { X } from "lucide-vue-next";
import Pagination from "~/components/common/Pagination.vue";

const galleryStore = useGalleryStore();

const handleFiles = (files: File[]) => {
  files.forEach(async (file) => {
    await galleryStore.uploadImage(file);
  });
};

const handleDelete = async (id: number) => {
  await galleryStore.deleteImage(id);
};

watch(
  () => [
    galleryStore.galleryParams.search,
    galleryStore.galleryParams.userId,
    galleryStore.galleryParams.page,
    galleryStore.galleryParams.perPage,
  ],
  async () => {
    await galleryStore.fetchGalleryImages();
  }
);

onMounted(async () => {
  await galleryStore.fetchGalleryImages();
});
</script>

<style scoped></style>
