<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type {
  BtnColor,
  BtnType,
  BtnSize,
  FormType,
  BtnIconPosition,
  BtnRouteLink,
} from "./BaseTypes.ts";

const props = withDefaults(
  defineProps<{
    text?: string | null;
    size?: BtnSize;
    type?: BtnType;
    block?: boolean;
    box?: boolean;
    color?: BtnColor;
    loading?: boolean;
    disabled?: boolean;
    square?: boolean;
    icon?: string;
    iconClass?: string;
    iconPosition?: BtnIconPosition;
    showOnHover?: boolean;
    circle?: boolean;
    circleClass?: string;
    formType?: FormType;
    border?: boolean;
    to?: BtnRouteLink | null;
    target?: string;
    fill?: boolean;
    tonal?: boolean;
    outline?: boolean;
    back?: boolean;
  }>(),
  {
    size: "md",
    type: "tonal",
    block: false,
    color: "primary",
    loading: false,
    disabled: false,
    square: false,
    box: false,
    icon: "",
    iconClass: "",
    iconPosition: "left",
    showOnHover: false,
    circle: false,
    circleClass: "w-7 h-7",
    formType: "button",
    border: false,
    to: null,
    target: "_self",
    fill: false,
    tonal: false,
    outline: false,
    back: false,
  }
);

const tonalVarients: Record<BtnColor, string> = {
  transparent: "bg-transparent",
  blue: "bg-blue-50 dark:bg-blue-300 hover:bg-blue-100 text-blue-700",
  red: "bg-red-50 dark:bg-red-300 hover:bg-red-100 text-red-700",
  zinc: "bg-zinc-100 dark:bg-zinc-300 hover:bg-zinc-200 text-zinc-700",
  gray: "bg-gray-50 dark:bg-gray-300 hover:bg-gray-100 text-gray-700",
  green: "bg-green-100 dark:bg-green-300 hover:bg-green-200 text-green-700",
  yellow: "bg-yellow-50 dark:bg-yellow-300 hover:bg-yellow-100 text-yellow-700",
  orange: "bg-orange-50 dark:bg-orange-300 hover:bg-orange-100 text-orange-700",
  indigo: "bg-indigo-50 dark:bg-indigo-300 hover:bg-indigo-100 text-indigo-700",
  primary:
    "bg-primary-50 dark:bg-primary-300 hover:bg-primary-100 text-primary-700",
  secondary:
    "bg-secondary dark:bg-secondary-dark hover:bg-secondary/90 dark:hover:bg-secondary-dark/90 text-primary",
  black:
    "bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black dark:text-white",
};

const fillVarients: Record<BtnColor, string> = {
  blue: "text-white bg-blue-600 hover:bg-blue-600",
  red: "text-white bg-red-600 hover:bg-red-600",
  green: "text-white bg-green-600 hover:bg-green-600",
  primary:
    "text-white bg-primary-500 dark:bg-primary-dark hover:bg-primary-600 dark:hover:bg-primary-dark/90",
  yellow: "text-white bg-yellow-600 hover:bg-yellow-600",
  orange: "text-white bg-orange-600 hover:bg-orange-600",
  black: "text-white bg-black dark:bg-white dark:text-black",
  transparent: "bg-transparent",
  zinc: "text-black bg-zinc-100 hover:bg-zinc-200",
  gray: "text-white bg-gray-600 hover:bg-gray-600",
  secondary:
    "text-primary bg-secondary dark:bg-secondary-dark hover:bg-secondary/90 dark:hover:bg-secondary-dark/90",
  indigo: "text-white bg-indigo-500 hover:bg-indigo-500",
};

const outlineVarients: Record<BtnColor, string> = {
  blue: "text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white ease-in-out transition-all duration-300",
  red: "text-red-600 border border-red-600 hover:bg-red-600 hover:text-red-600 ease-in-out transition-all duration-300",
  green:
    "text-green-600 border border-green-600 hover:bg-green-600 hover:text-white ease-in-out transition-all duration-300",
  yellow:
    "text-yellow-600 border border-yellow-600 hover:bg-yellow-600 hover:text-white ease-in-out transition-all duration-300",
  orange:
    "text-orange-600 border border-orange-600 hover:bg-orange-600 hover:text-white ease-in-out transition-all duration-300",
  black:
    "text-black border border-black dark:text-white dark:border-white dark:bg-black hover:bg-black hover:text-white ease-in-out transition-all duration-300",
  transparent:
    "text-black border border-black dark:text-white dark:border-white dark:bg-black/10 hover:bg-black/20 dark:hover:bg-white/20 ease-in-out transition-all duration-300",
  zinc: "text-zinc-600 border border-zinc-600 hover:bg-zinc-600 hover:text-white ease-in-out transition-all duration-300",
  gray: "text-gray-600 border border-gray-600 hover:bg-gray-600 hover:text-white ease-in-out transition-all duration-300",
  primary:
    "text-primary-600 border border-primary-600 dark:text-white hover:text-white dark:border-primary-dark dark:bg-primary hover:bg-primary-600/90 dark:hover:bg-primary-dark/90 ease-in-out transition-all duration-300",
  secondary:
    "text-secondary border border-secondary dark:text-white dark:border-secondary-dark dark:bg-secondary hover:bg-secondary/90 dark:hover:bg-secondary-dark/90 ease-in-out transition-all duration-300",
  indigo:
    "text-white border border-indigo-600 bg-indigo-600 hover:bg-indigo-600 hover:text-white ease-in-out transition-all duration-300",
};

const borders: Record<BtnColor, string> = {
  blue: "border-blue-600",
  red: "border-red-600",
  green: "border-green-600",
  yellow: "border-yellow-600",
  orange: "border-orange-600",
  black: "border-black dark:border-white",
  transparent: "border-black dark:border-white",
  zinc: "border-zinc-600",
  gray: "border-gray-600",
  primary: "border-primary-600 dark:border-primary-800/50",
  secondary: "border-secondary dark:border-secondary/50",
  indigo: "border-indigo-600",
};

const getClassNames = computed(() => {
  const classNames = [];

  // New logic for fill, tonal, and outline
  if (props.fill) {
    classNames.push(fillVarients[props.color as BtnColor]);
  } else if (props.tonal) {
    classNames.push(tonalVarients[props.color as BtnColor]);
  } else if (props.outline) {
    classNames.push(outlineVarients[props.color as BtnColor]);
  } else {
    // Previous logic (fallback)
    if (props.type === "tonal") {
      classNames.push(tonalVarients[props.color as BtnColor]);
    } else if (props.type === "fill") {
      classNames.push(fillVarients[props.color as BtnColor]);
    } else {
      classNames.push(outlineVarients[props.color as BtnColor]);
    }
  }

  // Size classes (unchanged)
  if (props.size === "sm") {
    classNames.push("px-3 py-1 text-sm");
  } else if (props.size === "md") {
    classNames.push("px-4 py-2 text-md");
  } else if (props.size === "lg") {
    classNames.push("px-5 py-3 text-lg");
  } else if (props.size === "xl") {
    classNames.push("px-6 py-4 text-xl");
  } else if (props.size === "2xl") {
    classNames.push("px-7 py-5 text-2xl");
  } else {
    classNames.push("p-1 text-sm");
  }

  // Block class (unchanged)
  if (props.block) {
    classNames.push("w-full");
  }

  return classNames.join(" ");
});

const allClass = computed(() => {
  const classNames = [];
  classNames.push(getClassNames.value);
  return classNames.join(" ");
});

const router = useRouter();

const openInNewTab = (to: string) => {
  const { href } = router.resolve(to as string);
  window.open(href, "_blank");
};
</script>

<template>
  <button
    :type="formType"
    @click="
      to !== null && target === '_self'
        ? $router.push(to)
        : to !== '/' && target === '_blank'
        ? openInNewTab(to as string)
        : null,
        back ? $router.go(-1) : null
    "
    :class="`${allClass}
      ${border ? `border ${borders[color]}` : ''}
      ${disabled ? 'cursor-not-allowed opacity-20 ' : 'cursor-pointer'}
      ${square && !box ? 'rounded-xl' : 'rounded-full'}
      ${box ? 'rounded-none' : ''}
      ${loading ? 'cursor-wait' : ''}
      ${icon !== '' && size !== 'sm' ? 'gap-x-2' : 'gap-x-1'} 

      ${circle ? `rounded-full !p-0 ${circleClass}` : ''}
    `"
    :disabled="disabled"
    class="flex items-center justify-center transition-all duration-300 ease-in-out group whitespace-nowrap"
  >
    <Icon
      v-if="loading"
      icon="line-md:loading-loop"
      class="animate-spin"
      :class="`${
        size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'
      }
        ${loading && (text || $slots.default) ? 'mr-2' : ''}
      `"
    />
    <Icon
      v-if="icon !== '' && !loading && iconPosition === 'left'"
      :icon="icon"
      class="group-hover:scale-105 transition-[transform] duration-300 ease-in-out"
      :class="`${
        iconClass !== ''
          ? iconClass
          : size === 'sm'
          ? 'w-4 h-4'
          : size === 'md'
          ? 'w-5 h-5'
          : 'w-6 h-6'
      }`"
    />
    <div
      v-if="text || $slots.default"
      :class="[
        showOnHover
          ? ' max-w-0 overflow-hidden group-hover:max-w-lg transition-all ease-in-out duration-300'
          : '',
        iconPosition === 'left' && icon !== '' && !showOnHover ? '' : '',
        iconPosition === 'right' && icon !== '' && !showOnHover ? '' : '',
        iconPosition === 'left' && icon !== '' && showOnHover
          ? 'group-hover:ml-2'
          : '',
        iconPosition === 'right' && icon !== '' && showOnHover
          ? 'group-hover:mr-2'
          : '',
      ]"
    >
      <slot>{{ text }}</slot>
    </div>
    <Icon
      v-if="icon !== '' && !loading && iconPosition === 'right'"
      :icon="icon"
      class="group-hover:scale-105 transition-[transform] duration-300 ease-in-out"
      :class="size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'"
    />
  </button>
</template>

<style scoped>
/* Add any additional styles you want here */
button {
  animation: button-pop var(--animation-btn, 0.25s) ease-out;
}

button:active:hover,
button:active:focus {
  animation: button-pop 0s ease-out;
  transform: scale(var(--btn-focus-scale, 0.93));
}

button:disabled:hover,
button:disabled:focus {
  animation: none;
  transform: none;
}
</style>
