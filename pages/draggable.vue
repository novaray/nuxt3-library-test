<script lang="ts" setup>
import BaseDraggable from '~/components/BaseDraggable.vue';

</script>

<template>
  <div>
    <BaseDraggable />
  </div>
</template>

<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.not-draggable {
  cursor: no-drop;
}
</style>
