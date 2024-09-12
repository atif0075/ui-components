<template>
  <div class="bg-white shadow-lg rounded-2xl overflow-hidden">
    <div class="flex items-center justify-between p-2 sm:p-4 bg-primary-100">
      <re-button
        @click="prevMonth"
        fill
        icon="material-symbols:chevron-left-rounded"
        class="text-sm sm:text-base"
        :text="width > 640 ? 'Prev' : ''"
      />
      <h2 class="sm:text-xl font-bold text-gray-800">
        {{ currentMonth }} {{ currentYear }}
      </h2>
      <re-button
        @click="nextMonth"
        fill
        icon="material-symbols:chevron-right-rounded"
        iconPosition="right"
        class="text-sm sm:text-base"
        :text="width > 640 ? 'Next' : ''"
      />
    </div>
    <div class="grid grid-cols-7 sm:gap-1 p-2 sm:p-4">
      <re-button
        :outline="width > 640"
        :color="width < 640 ? 'transparent' : 'primary'"
        v-for="day in daysOfWeek"
        :key="day"
        class="text-center font-semibold text-gray-600 text-xs sm:text-sm"
      >
        {{ day }}
      </re-button>
      <div
        v-for="date in dates"
        :key="date.getTime()"
        :class="{
          'border rounded-xl h-20': width > 640,
        }"
        class="w-full flex justify-center flex-col items-center relative"
      >
        <div
          :class="{
            'bg-primary-100': isToday(date),
          }"
          @click="openModal(date)"
          class="p-2 w-10 h-10 text-center rounded-xl font-semibold cursor-pointer"
        >
          {{ date.getDate() }}
        </div>
        <div
          v-if="getEventsForDate(date).events.length"
          class="w-full px-2 flex justify-center relative"
        >
          <div
            v-if="getEventsForDate(date).hasMultiple"
            class="text-xs bg-primary-700 text-primary-50 p-1 px-2 mb-1 rounded-full text-center truncate max-w-full cursor-pointer"
            @click="openModal(date)"
          >
            {{ getEventsForDate(date).events.length }}
            <span v-if="width > 640"> events </span>
          </div>
          <div
            v-else
            v-for="event in getEventsForDate(date).events.slice(0, 2)"
            :key="event.id"
            :class="
              width > 640
                ? 'text-xs bg-primary-50/40 text-primary-800 p-1 px-2 mb-1 rounded-full text-center truncate max-w-full cursor-pointer'
                : 'absolute -bottom-2 right-0'
            "
            @click="openModal(date)"
            :title="event.name"
          >
            <span v-if="width > 640">
              {{ event.name }}
            </span>
            <span
              v-else
              class="text-xs text-primary-50 bg-primary-500 p-1 px-2 rounded-full text-center truncate max-w-full cursor-pointer"
            >
              1
            </span>
          </div>
          <div
            v-if="getEventsForDate(date).events.length > 2"
            class="text-xs text-primary-800 italic cursor-pointer"
            @click="openModal(date)"
          >
            +{{ getEventsForDate(date).events.length - 2 }}
            <span v-if="width > 640"> more </span>
          </div>
        </div>
      </div>
    </div>
    <re-modal v-model="showModal">
      <template #header>
        <h2 class="text-lg sm:text-xl font-semibold">
          Events on {{ formatDate(selectedDate) }}
        </h2>
      </template>

      <div v-if="selectedDateEvents.length" class="space-y-4">
        <MazCardSpotlight v-for="event in selectedDateEvents" :key="event.id">
          <h3 class="font-bold">{{ event.name }}</h3>
          <p class="text-sm">{{ event.desc }}</p>
          <div class="flex justify-end">
            <re-button
              size="sm"
              to="/dashboard/events/how-are-you"
              iconPosition="right"
              icon="material-symbols:chevron-right-rounded"
            >
              View Details
            </re-button>
          </div>
        </MazCardSpotlight>
      </div>
      <div v-else>No events on this date.</div>
    </re-modal>
  </div>
</template>

<script setup lang="ts">
interface Event {
  id: number;
  name: string;
  desc: string;
  date: Date;
}
const { width } = useWindowSize();
const currentDate = ref(new Date());
const showModal = ref(false);
const selectedDate = ref(new Date());

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Sample events
const events = ref<Event[]>([
  {
    id: 1,
    name: "Ahmad Hallow",
    desc: "This event is organized by Ahmad Hallow. It is a very important event. Please attend. Thank you.",
    date: new Date(2024, 6, 10),
  },
  {
    id: 2,
    name: "Ahmad Lassan",
    desc: "This event is organized by Ahmad Lassan. It is a very important event. Please attend. Thank you.",
    date: new Date(2024, 6, 20),
  },
  {
    id: 3,
    name: "Ahmad Dassan",
    desc: "This event is organized by Ahmad Lassan. It is a very important event. Please attend. Thank you.",
    date: new Date(2024, 6, 20),
  },
  {
    id: 4,
    name: "Ahmad Laddan",
    desc: "This event is organized by Ahmad Laddan. It is a very important event. Please attend. Thank you.",
    date: new Date(2024, 6, 25),
  },
]);

const currentMonth = computed(() => {
  return currentDate.value.toLocaleString("default", { month: "long" });
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});

const dates = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysArray = [];
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  while (startDate <= lastDay) {
    daysArray.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return daysArray;
});

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const prevMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

const getEventsForDate = (date: Date) => {
  const eventsOnDate = events.value.filter(
    (event) =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
  );
  return {
    events: eventsOnDate,
    hasMultiple: eventsOnDate.length > 1,
  };
};

const openModal = (date: Date) => {
  selectedDate.value = date;
  showModal.value = true;
};

const selectedDateEvents = computed(() => {
  return getEventsForDate(selectedDate.value).events;
});

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
