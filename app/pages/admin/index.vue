<template>
  <div>Admin Page</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});
</script>

<style scoped></style>
