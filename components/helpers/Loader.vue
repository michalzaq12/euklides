<template>
    <transition :name="animation">
        <div
            class="loading-overlay is-active"
            :class="{ 'is-full-page': isFullPage, dark: dark }"
            v-if="isActive">
            <div class="loading-background" @click="cancel"></div>
            <v-progress-circular :color="dark ? 'white' : 'primary'" indeterminate></v-progress-circular>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'loader',
        props: {
            dark: {
                type: Boolean,
                default: false
            },
            active: {
                type: Boolean,
                required: true
            },
            isFullPage: {
                type: Boolean,
                default: false
            },
            animation: {
                type: String,
                default: 'fade'
            },
            canCancel: {
                type: Boolean,
                default: false
            },
            onCancel: {
                type: Function,
                default: () => {}
            }
        },
        data() {
            return {
                isActive: this.active || false
            }
        },
        watch: {
            active(value) {
                this.isActive = value
            }
        },
        methods: {
            cancel() {
                if (!this.canCancel || !this.isActive) return;
                this.close()
            },
            close() {
                this.onCancel.apply(null, arguments);
                this.$emit('close');
                this.$emit('update:active', false);
            }
        }
    }
</script>


<style lang="scss" scoped>
    @mixin overlay($offset: 0){
        bottom: $offset;
        left: $offset;
        position: absolute;
        right: $offset;
        top: $offset;
    }


    .loading-overlay {
        @include overlay;
        align-items: center;
        display: none;
        justify-content: center;
        overflow: hidden;
        z-index: 999;
        &.is-active {
            display: flex
        }
        &.is-full-page {
            position: fixed;
        }



        .loading-background {
            @include overlay;
            pointer-events: none;
            background:#7f7f7f;
            background:rgba(255,255,255,0.4);
        }

        &.dark {
            z-index: 1000;
            .loading-background {
                background-color: var(--v-primary-base);
            }
        }
    }
</style>
