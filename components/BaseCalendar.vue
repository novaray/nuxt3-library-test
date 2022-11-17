<script lang="ts" setup>
import { CalendarView, CalendarViewHeader, CalendarMath } from 'vue-simple-calendar';
import '../node_modules/vue-simple-calendar/dist/style.css';
import '../node_modules/vue-simple-calendar/dist/css/default.css';
import '../node_modules/vue-simple-calendar/dist/css/holidays-us.css';

const showDate = ref(new Date());

const setShowDate = (d: any) => {
  showDate.value = d;
};
</script>

<template>
  <calendar-view
      :show-date="showDate"
      class="theme-default holiday-us-traditional holiday-us-official"
  >
    <template #header="{ headerProps }">
      <calendar-view-header
          :header-props="headerProps"
          @input="setShowDate"/>
    </template>
  </calendar-view>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
