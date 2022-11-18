<script lang="ts" setup>
import BaseCalendar from '~/components/BaseCalendar.vue';

definePageMeta({
  title: 'Calendar sample page'
})
</script>

<template>
  <div class="calendar-wrapper">
    <ClientOnly>
      <BaseCalendar />
    </ClientOnly>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  display: flex;
  flex-direction: row;
  width: 95vw;
  min-width: 30rem;
  max-width: 100rem;
  min-height: 40rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
