<template>
  <div class="sticky-panel">
    <div :class="staticClass" ref="static">
      <slot name="static"/>
    </div>
    <div :class="stickyClass" ref="sticky" style="position: relative;">
      <slot name="sticky"/>
    </div>
  </div>
</template>

<script>

  import { throttleEventListener } from './helpers/throttleEventListener';

  export default {
    name: 'sticky-panel',
    props: {
      staticClass: String,
      stickyClass: String,
      gapTop: {
        type: Number,
        default: 20
      },
      heightOffsetStatic: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        scrollPosition: 0,
        staticRef: null,
        stickyRef: null,
        stickyWidth: 0,
      }
    },
    computed: {
      passedTopLimit() {
        if (!this.staticRef) {
          return false;
        }

        return this.scrollPosition > this.staticRef.offsetTop - this.gapTop;
      },
      passedBottomLimit() {
        if (!this.staticRef || !this.stickyRef) {
          return false;
        }

        const { clientHeight, offsetTop } = this.staticRef;
        const contentBottom = clientHeight + offsetTop - this.scrollPosition;
        return contentBottom < this.stickyRef.clientHeight + this.gapTop;
      },
      isFixed() {
        return this.passedTopLimit && !this.passedBottomLimit;
      }
    },
    watch: {
      stickyWidth(width) {
        if (this.stickyRef) {
          this.stickyRef.style.width = `${width}px`
        }
      },
      isFixed(value) {
        if (this.stickyRef) {
          this.stickyRef.style.position = value ? 'fixed' : 'absolute';
          this.stickyRef.style.top = value ? `${this.gapTop}px` : 'unset';
        }
      },
      passedBottomLimit(value) {
        if (this.stickyRef) {
          this.stickyRef.style.bottom = value ? '0' : 'unset';
        }
      }
    },
    mounted() {
      this.staticRef = this.$refs.static.children[0];
      this.stickyRef = this.$refs.sticky.children[0];
      this.setStickyWidth();

      throttleEventListener('scroll', 'scrollY', scrollPosition => {
        this.scrollPosition = scrollPosition;
      });

      throttleEventListener('resize', null, () => {
        this.setStickyWidth();
      })
    },
    methods: {
      /* public */
      setStickyWidth() {
        if (this.$refs.sticky) {
          this.stickyWidth = this.$refs.sticky.clientWidth;
        }
      }
    }
  }
</script>
