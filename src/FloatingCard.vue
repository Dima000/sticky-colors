<template>
  <div class="fc-component">
    <div class="fc-main" ref="main">
      <slot name="main"/>
    </div>
    <div class="fc-floating" ref="floating">
      <slot name="floating"/>
    </div>
  </div>
</template>

<script>
  import { throttleEventListener } from './throttleEventListener';

  export default {
    name: 'FloatingCard',
    data() {
      return {
        scrollPosition: 0,
        contentRef: {},
        floatingRef: {},
        floatingWidth: 0,
        offset: 20,
        passedBottomLimit: false,
      }
    },
    mounted() {
      this.contentRef = this.$refs.main.children[0];
      this.floatingRef = this.$refs.floating.children[0];
      this.setFloatingWidth();

      throttleEventListener('scroll', 'scrollY', scrollPosition => {
        this.scrollPosition = scrollPosition;
      });

      throttleEventListener('resize', null, () => {
        this.setFloatingWidth();
      })
    },
    computed: {
      passedTopLimit() {
        return this.scrollPosition > this.contentRef.offsetTop - this.offset;
      },
      passedBottomLimit() {
        const { clientHeight, offsetTop } = this.contentRef;
        const contentBottom = clientHeight + offsetTop - this.scrollPosition;
        return contentBottom < this.floatingRef.clientHeight + this.offset;
      },
      isFixed() {
        return this.passedTopLimit && !this.passedBottomLimit;
      }
    },
    watch: {
      floatingWidth(width) {
        this.floatingRef.style.width = `${width}px`
      },
      isFixed(value) {
        this.floatingRef.style.position = value ? 'fixed' : 'absolute';
        this.floatingRef.style.top = value ? `${this.offset}px` : 'unset';
      },
      passedBottomLimit(value) {
        this.floatingRef.style.bottom = value ? '0' : 'unset';
      }
    },
    methods: {
      setFloatingWidth() {
        if (this.floatingRef) {
          this.floatingWidth = this.floatingRef.clientWidth;
        }
      }
    }
  }
</script>

<style>
  .fc-component {
    display: flex;
  }

  .fc-main {
    flex: 5;
  }

  .fc-floating {
    flex: 3;
    position: relative;
  }
</style>
