<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import {
  emailValidation,
  passwordValidation,
  nameValidation,
  phoneValidation,
  urlValidation,
  dateValidation,
} from "./Validations";

type ValidationRule = (value: string) => string | boolean;
type RuleType =
  | "email"
  | "password"
  | "name"
  | "phone"
  | "url"
  | "date"
  | "none";

interface Props {
  type: "email" | "password" | "text" | "tel" | "url" | "date";
  placeholder?: string;
  iconPosition?: "left" | "right";
  icon?: string;
  rounded?: boolean;
  square?: boolean;
  className?: string;
  iconClass?: string;
  iconFunction?: () => void;
  rules?: RuleType | RuleType[] | ValidationRule | ValidationRule[];
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
  icon: "",
  rounded: false,
  square: false,
  iconPosition: "left",
  className: "",
  iconClass: "",
  iconFunction: () => {},
  rules: "none",
});

const modelValue = defineModel<string>();
const showPassword = ref(false);
const error = ref("");

const inputType = computed(() => {
  if (props.type === "password") {
    return showPassword.value ? "text" : "password";
  }
  return props.type;
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const getValidationRules = (ruleType: RuleType): ValidationRule[] => {
  switch (ruleType) {
    case "email":
      return emailValidation;
    case "password":
      return passwordValidation;
    case "name":
      return nameValidation;
    case "phone":
      return phoneValidation;
    case "url":
      return urlValidation;
    case "date":
      return dateValidation;
    default:
      return [];
  }
};

const validate = () => {
  let rulesToApply: ValidationRule[] = [];

  if (typeof props.rules === "string") {
    rulesToApply = getValidationRules(props.rules as RuleType);
  } else if (Array.isArray(props.rules)) {
    rulesToApply = props.rules.flatMap((rule) =>
      typeof rule === "string" ? getValidationRules(rule as RuleType) : rule
    );
  } else if (typeof props.rules === "function") {
    rulesToApply = [props.rules];
  }

  for (const rule of rulesToApply) {
    const result = rule(modelValue.value || "");
    if (typeof result === "string") {
      error.value = result;
      return false;
    }
  }
  error.value = "";
  return true;
};

const handleInput = () => {
  validate();
};
</script>

<template>
  <div class="relative w-full">
    <input
      v-model="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      @input="handleInput"
      :class="`
        ${
          className
            ? className
            : 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500'
        } 
        ${rounded ? '!rounded-full' : ''} 
        ${square ? '!rounded-none' : ''}  
        ${icon || type === 'password' ? 'pr-10' : ''}
        ${icon && iconPosition === 'left' ? 'pl-10' : ''}
        ${error ? 'border-red-500' : ''}
      `"
    />
    <span
      v-if="icon"
      :class="`absolute top-1/2 transform -translate-y-1/2 ${
        iconPosition === 'left' ? 'left-3' : 'right-3'
      }`"
    >
      <Icon :icon="icon" :class="iconClass" @click="iconFunction" />
    </span>
    <button
      v-if="type === 'password'"
      type="button"
      @click="togglePassword"
      class="absolute top-1/2 right-3 transform -translate-y-1/2"
    >
      <Icon
        :icon="
          showPassword ? 'mdi:eye-lock-open-outline' : 'mdi:eye-lock-outline'
        "
      />
    </button>
  </div>
  <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
</template>
