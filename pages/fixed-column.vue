<script lang="ts" setup>
import { BaseTableColumn } from '~/components/BaseTable.vue';
import BaseTable from '~/components/BaseTable.vue';

interface Data {
  date: string;
  name: string;
  state: string;
  city: string;
  address: string;
  zip: string;
}

const data = ref<Data[]>([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2020-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2021-05-07',
    name: 'James',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2022-05-07',
    name: 'Peter',
    state: 'Mapo',
    city: 'Seoul',
    address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, sit.',
    zip: 'CA 90036',
  },
]);
const columns1 = ref<BaseTableColumn[]>([
  {
    prop: 'date',
    label: 'Date',
    width: '150',
    fixed: true
  },
  {
    prop: 'name',
    label: 'Name',
    width: '120',
    fixed: true
  },
  {
    prop: 'state',
    label: 'State',
    width: '120'
  },
  {
    prop: 'city',
    label: 'City',
    width: '320'
  },
  {
    prop: 'address',
    label: 'Address',
    width: '600'
  },
  {
    prop: 'zip',
    label: 'Zip',
    width: '120'
  }
]);
const columns2 = ref<BaseTableColumn[]>([
  {
    prop: 'date',
    label: 'Date',
    width: '150'
  },
  {
    prop: 'name',
    label: 'Name',
    width: '120'
  },
  {
    prop: 'state',
    label: 'State',
    width: '120'
  },
  {
    prop: 'city',
    label: 'City',
    width: '320'
  },
  {
    prop: 'address',
    label: 'Address',
    width: '600',
    fixed: true
  },
  {
    prop: 'zip',
    label: 'Zip',
    width: '120',
    fixed: true
  }
]);

const columns3 = ref<BaseTableColumn[]>([
  {
    prop: 'date',
    label: 'Date',
    width: '150',
    fixed: true
  },
  {
    prop: 'name',
    label: 'Name',
    width: '120',
    fixed: true
  },
  {
    prop: 'state',
    label: 'State',
    width: '120'
  },
  {
    prop: 'city',
    label: 'City',
    width: '320'
  },
  {
    prop: 'address',
    label: 'Address',
    width: '1900'
  },
  {
    prop: 'zip',
    label: 'Zip',
    width: '120'
  }
]);
</script>

<template>
  <div class="fixed-column-wrapper">
    <div>
      <h3>왼쪽 2개 컬럼 고정</h3>
      <BaseTable :data="data" :columns="columns1" width="1000px" />
    </div>
    <div>
      <h3>오른쪽 2개 컬럼 고정</h3>
      <BaseTable :data="data" :columns="columns2" width="1000px" />
    </div>
    <div>
      <h3>왼쪽 2개 고정 및 width 100%</h3>
      <BaseTable :data="data" :columns="columns3" width="100%" />
    </div>
  </div>
</template>

<style scoped>
.fixed-column-wrapper div {
  margin-bottom: 2rem;
}
</style>
