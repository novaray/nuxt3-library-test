<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus';
import {ElTabs, ElTabPane} from 'element-plus';

const activeName = ref('first');
const handleClick = async (tab: TabsPaneContext, event: Event) => {
  await navigateTo(`/${tab.paneName}`);
}

</script>

<template>
  <el-tabs v-model="activeName" class="page-tabs" @tab-click="handleClick">
    <el-tab-pane label="Calendar" name="calendar">Calendar</el-tab-pane>
    <!--<el-tab-pane label="draggable" name="draggable">draggable</el-tab-pane>-->
  </el-tabs>
</template>

<style scoped>
.page-tabs {
  margin-bottom: 1rem;
}

.page-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
