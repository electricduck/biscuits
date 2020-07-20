<template>
  <div class="card-container">
    <div
      class="card"
      :class="[
        { 'card--business' : type == 'uk_business' },
        { 'card--joint' : type === 'uk_retail_joint' },
        { 'card--plus' : type === 'uk_retail_plus' },
        { 'card--pot' : type === 'pot' }
      ]"
      :style="{ backgroundImage: backgroundImage }"
    >
      <div class="card-inner">
        <div class="card-inner-badge"></div>
        <div class="card-inner-chip"></div>
        <div class="card-inner-logo"></div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  computed: {
    backgroundImage: function() {
      if (this.image) {
        if (this.image.startsWith("https://")) {
          return `url(${this.image})`;
        } else if (this.image.startsWith("color_")) {
          let color = this.image.replace("color_", "");
          return `linear-gradient(0deg, ${color}, ${color})`;
        } else {
          switch(this.image) {
            default:
              return `linear-gradient(0deg, var(--accent-color), var(--accent-color))`;
          }
        }
      }

      return null;
    }
  },
  props: {
    image: {
      default: "",
      type: String
    },
    type: {
      default: "uk_retail_personal",
      type: String
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/themes/_monzo.scss";
@import "@/scss/shared/_variables.scss";

.card-container {
  $radius: 5px;

  width: 250px;

  .card {
    background-color: $monzo-personal-card;
    background-position: center;
    background-size: cover;
    border-radius: $radius;
    box-shadow: var(--shadow);
    overflow: hidden;
    height: 0;
    padding-top: 63%;
    position: relative;

    &.card--business {
      background-color: $monzo-business-card;
    }

    &.card--joint {
      .card-inner .card-inner-badge {
        display: block;
      }
    }

    &.card--pot {
      background-color: var(--background-color);

      .card-inner {
        display: none;
      }
    }

    &.card--plus {
      background-color: $monzo-plus-card;
      background-image: $monzo-plus-card-gradient;
    }

    .card-inner {
      display: grid;
      grid-template-columns: 5% 13% 20% 1fr;
      grid-template-rows: 13% 0.7fr 17% 1.3fr 13%;
      height: 100%;
      left: 0;
      padding: 6%;
      position: absolute;
      top: 0;
      width: 100%;

      .card-inner-badge {
        display: none;
        background-color: white;
        border-radius: 9999px;
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row: 1;
      }

      .card-inner-chip {
        background-color: #c4c3c4;
        border-radius: 10%;
        grid-column: 2;
        grid-row: 3;
      }
    }
  }
}
</style>