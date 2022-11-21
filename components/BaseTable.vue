<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus';
interface BaseTableProps {
  data: unknown[];
  columns: BaseTableColumn[];
  width: string;
}

export interface BaseTableColumn {
  prop: string;
  label: string;
  width: string;
  fixed?: boolean;
}

defineProps<BaseTableProps>();

</script>

<template>
  <el-table :data="data" :style="{'width': width}" height="250">
    <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :fixed="column.fixed"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
    />
  </el-table>
</template>

<style scoped>

</style>
