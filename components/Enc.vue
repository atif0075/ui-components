<template>
    <div>
        <slot v-if="!displayText" />
        <span v-else>{{ displayText }}</span>
    </div>
</template>

<script setup lang="ts">
const slots = useSlots();
if (slots.default) {
    console.log(slots.default()[0].children);
}
// Define the props
const props = defineProps<{
    // if slots.default then the targetText is not required
    targetText?: string;
    cyclesPerLetter?: number;
    shuffleTime?: number;
    chars?: string;
}>();

const TARGET_TEXT = !slots.default
    ? props.targetText
    : (slots.default()[0].children as string);
const CYCLES_PER_LETTER = props.cyclesPerLetter ?? 2;
const SHUFFLE_TIME = props.shuffleTime ?? 50;
const CHARS = props.chars ?? "!@#$%^&*():{};|,.<>/?";

const displayText = ref(TARGET_TEXT);
let intervalRef: NodeJS.Timeout | number;

const scramble = () => {
    let pos = 0;

    intervalRef = setInterval(() => {
        const scrambled = TARGET_TEXT?.split("")
            .map((char, index) => {
                if (pos > index * CYCLES_PER_LETTER) return char;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("");

        displayText.value = scrambled;
        pos++;

        if (pos >= (TARGET_TEXT?.length ?? 0) * CYCLES_PER_LETTER) {
            stopScramble();
        }
    }, SHUFFLE_TIME);
};

const stopScramble = () => {
    clearInterval(intervalRef as any);
    displayText.value = TARGET_TEXT;
};

onMounted(() => {
    scramble();
});
</script>
