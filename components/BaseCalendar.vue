<script lang="ts" setup>
import { ElButton, ElSelect, ElOption, ElCheckbox, ElInput, ElDatePicker } from 'element-plus';
import { CalendarView, CalendarViewHeader, CalendarMath } from 'vue-simple-calendar';
import '../node_modules/vue-simple-calendar/dist/style.css';
import '../node_modules/vue-simple-calendar/dist/css/default.css';
import '../node_modules/vue-simple-calendar/dist/css/holidays-us.css';

import { ICalendarItem } from 'vue-simple-calendar/dist/src/ICalendarItem';

interface Item {
  id: string;
  startDate: string | Date;
  endDate?: string | Date;
  classes?: string[];
  title?: string;
  url?: string;
}

const thisMonth = (d: number, h: number = 0, m: number = 0) => {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), d, h, m);
};

const showDate = ref<Date>(new Date());
const message = ref('');
const startingDayOfWeek = ref(0);
const disablePast = ref<boolean>(false);
const disableFuture = ref(false);
const displayPeriodUom = ref('month');
const displayPeriodCount = ref(1);
const displayWeekNumbers = ref(false);
const showTimes = ref(true);
const selectionStart = ref<any>(null);
const selectionEnd = ref<any>(null);
const newItemTitle = ref('');
const newItemStartDate = ref('');
const newItemEndDate = ref('');
const useDefaultTheme = ref(true);
const useHolidayTheme = ref(true);
const useHoverTheme = ref(true);
const useTodayIcons = ref(true);
const items = ref<Item[]>([
  {
    id: 'e0',
    startDate: '2018-01-05',
  },
  {
    id: 'e1',
    startDate: thisMonth(15, 18, 30),
  },
  {
    id: 'e2',
    startDate: thisMonth(15),
    title: 'Single-day item with a long title',
  },
  {
    id: 'e3',
    startDate: thisMonth(7, 9, 25),
    endDate: thisMonth(10, 16, 30),
    title: 'Multi-day item with a long title and times',
  },
  {
    id: 'e4',
    startDate: thisMonth(20),
    title: 'Go to Naver',
    url: 'https://www.naver.com',
  },
  {
    id: 'e5',
    startDate: thisMonth(5),
    endDate: thisMonth(12),
    title: 'Multi-day item',
    classes: ['orange'],
  },
  {
    id: 'foo',
    startDate: thisMonth(29),
    title: 'Same day 1',
  },
  {
    id: 'e6',
    startDate: thisMonth(29),
    title: 'Same day 2',
    classes: ['orange'],
  },
  {
    id: 'e7',
    startDate: thisMonth(29),
    title: 'Same day 3',
  },
  {
    id: 'e8',
    startDate: thisMonth(29),
    title: 'Same day 4',
    classes: ['orange'],
  },
  {
    id: 'e9',
    startDate: thisMonth(29),
    title: 'Same day 5',
  },
  {
    id: 'e10',
    startDate: thisMonth(29),
    title: 'Same day 6',
    classes: ['orange'],
  },
  {
    id: 'e11',
    startDate: thisMonth(29),
    title: 'Same day 7',
  },
]);

onMounted(() => {
  newItemStartDate.value = CalendarMath.isoYearMonthDay(CalendarMath.today());
  newItemEndDate.value = CalendarMath.isoYearMonthDay(CalendarMath.today());
});

const userLocale = computed(() => CalendarMath.getDefaultBrowserLocale);
const dayNames = computed(() => CalendarMath.getFormattedWeekdayNames(userLocale as any, 'long', 0));
const themeClasses = computed(() => {
  return {
    'theme-default': useDefaultTheme.value,
    'holiday-us-traditional': useHolidayTheme.value,
    'holiday-us-official': useHolidayTheme.value,
    'wrap-item-title-on-hover': useHoverTheme.value
  };
});
const myDateClasses = computed(() => {
  const o: any = {};
  const theFirst = thisMonth(1);
  const ides = [2, 4, 6, 9].includes(theFirst.getMonth()) ? 15 : 13;
  const idesDate = thisMonth(ides);
  o[CalendarMath.isoYearMonthDay(idesDate)] = 'ides';
  o[CalendarMath.isoYearMonthDay(thisMonth(21))] = ['first-class', 'second-class'];
  return o;
});
const addButtonDisabled = computed(() => {
  return newItemTitle.value.length === 0 || newItemStartDate.value.length === 0;
});

const periodChanged = () => {
};

const onClickDay = (d: Date) => {
  selectionStart.value = null;
  selectionEnd.value = null
  message.value = `선택한 날: ${d.toLocaleDateString()}`;
};

const onClickItem = (item: ICalendarItem) => {
  message.value = `선택된 일정: ${item.title}`;
  if (item.url) {
    window.open(item.url, '_blank');
  }
};

const handleItemHover = (item: ICalendarItem) => {
  message.value = `마우스 호버: ${item.title}`;
};

const setShowDate = (d: Date) => {
  message.value = `Changing calendar view to ${d.toLocaleDateString()}`;
  showDate.value = d;
};

const setSelection = (dateRange: any) => {
  selectionEnd.value = dateRange[1];
  selectionStart.value = dateRange[0];
};

const finishSelection = (dateRange: any) => {
  setSelection(dateRange);
  message.value = `선택한 아이템: ${selectionStart.toLocaleDateString()} -${selectionEnd.toLocaleDateString()}`;
};

const onDrop = (item: any, date: Date) => {
  message.value = `You dropped ${item.id} on ${date.toLocaleDateString()}`;
  const eLength = CalendarMath.dayDiff(item.startDate, date);
  item.originalItem.startDate = CalendarMath.addDays(item.startDate, eLength);
  item.originalItem.endDate = CalendarMath.addDays(item.endDate, eLength);
};

const clickTestAddItem = () => {
  items.value.push({
    startDate: newItemStartDate.value,
    endDate: newItemEndDate.value,
    title: newItemTitle.value,
    id: 'e' + Math.random().toString(36).substr(2, 10),
  })
  message.value = '아이템 추가 완료!'
};

const get21thDayVisible = (date: Date): String => {
  return date.getDate() === 21 ? '21일!!' : '';
}

</script>

<template>
  <div class="calendar-controls">
    <div v-if="message" class="notification is-success">{{ message }}</div>

    <div class="box">
      <h4 class="title is-5">Play with the options!</h4>

      <span>
        <label>캘린더 형태</label>
        <el-select v-model="displayPeriodUom" class="m-2" placeholder="캘린더 형태">
          <el-option
              v-for="item in ['month', 'week', 'year']"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </span>
      <br/>

      <span>
        <label>기간 개수</label>
        <el-select v-model="displayPeriodCount" class="m-2" placeholder="년월일 카운트">
          <el-option
              v-for="item in ['1', '2', '3']"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </span>
      <br/>

      <span>
        <label>주 시작 요일</label>
        <el-select v-model="startingDayOfWeek" class="m-2" placeholder="주 시작 요일">
          <el-option
              v-for="(item, index) in dayNames"
              :key="index"
              :label="item"
              :value="index"
          />
        </el-select>
      </span>
      <br/>

      <el-checkbox v-model="useTodayIcons" label="헤더 투데이 아이콘 표시"/>
      <el-checkbox v-model="displayWeekNumbers" label="주 넘버링 표시"/>
      <el-checkbox v-model="showTimes" label="시간 보이기"/>
      <el-checkbox v-model="useDefaultTheme" label="라이브러리 테마 적용"/>
      <el-checkbox v-model="useHolidayTheme" label="휴일 적용(미국)"/>
      <el-checkbox v-model="useHoverTheme" label="아이템 hover 펼치기"/>

      <div class="box">
        <h3>아이템 추가란</h3>
        <div class="field">
          <label class="label">제목</label>
          <div class="control">
            <el-input v-model="newItemTitle" placeholder="Title"/>
          </div>
        </div>

        <div class="field">
          <label class="label">시작일</label>
          <div class="control">
            <el-date-picker
                v-model="newItemStartDate"
                type="date"
                placeholder="시작일"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">종료일</label>
          <div class="control">
            <el-date-picker
                v-model="newItemEndDate"
                type="date"
                placeholder="종료일"
            />
          </div>
        </div>

        <el-button
            @click="clickTestAddItem"
            :disabled="addButtonDisabled"
        >
          아이템 추가
        </el-button>
      </div>
    </div>
  </div>
  <div class="calendar-parent">
    <calendar-view
        :items="items"
        :show-date="showDate"
        :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
        :enable-drag-drop="true"
        :disable-past="disablePast"
        :disable-future="disableFuture"
        :show-times="showTimes"
        :date-classes="myDateClasses"
        :display-period-uom="displayPeriodUom"
        :display-period-count="displayPeriodCount"
        :starting-day-of-week="startingDayOfWeek"
        :class="themeClasses"
        :period-changed-callback="periodChanged"
        :current-period-label="useTodayIcons ? 'icons' : ''"
        :displayWeekNumbers="displayWeekNumbers"
        :enable-date-selection="true"
        :selection-start="selectionStart"
        :selection-end="selectionEnd"
        :do-emit-item-mouse-events="true"
        @date-selection-start="setSelection"
        @date-selection="setSelection"
        @date-selection-finish="finishSelection"
        @drop-on-date="onDrop"
        @click-date="onClickDay"
        @click-item="onClickItem"
        @item-mouseenter="handleItemHover"
    >
      <template #header="{ headerProps }">
        <calendar-view-header slot="header" :header-props="headerProps" @input="setShowDate"/>
      </template>
      <template #dayContent="{day}">
        {{get21thDayVisible(day)}}
      </template>
    </calendar-view>
  </div>
</template>

<style scoped>
.calendar-controls {
  margin-right: 1rem;
  min-width: 14rem;
  max-width: 14rem;
}

.calendar-parent {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 60vh;
  max-height: 80vh;
  background-color: white;
}

/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
.cv-wrapper.period-month.periodCount-2 .cv-week,
.cv-wrapper.period-month.periodCount-3 .cv-week,
.cv-wrapper.period-year .cv-week {
  min-height: 6rem;
}

/* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */

/* Add some styling for items tagged with the "birthday" class */
.theme-default .cv-item.birthday {
  background-color: #e0f0e0;
  border-color: #d7e7d7;
}

.theme-default .cv-item.birthday::before {
  content: "\1F382"; /* Birthday cake */
  margin-right: 0.5em;
}

/* The following classes style the classes computed in myDateClasses and passed to the component's dateClasses prop. */
.theme-default .cv-day.ides {
  background-color: #ffe0e0;
}

.ides .cv-day-number::before {
  content: "\271D";
}

.cv-day.do-you-remember.the-21st .cv-day-number::after {
  content: "\1F30D\1F32C\1F525";
}

.orange {
  color: orange;
}
</style>
