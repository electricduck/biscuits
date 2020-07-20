<template>
  <BaseLayout class="sidebar-pots" :loaded="loaded">
    <CardsList :cards="pots" />
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/components/Layouts/BaseLayout.vue";
import CardsList from "@/components/CardsList.vue";
//import Card from "@/models/Card.js";
//import Person from "@/models/Person.js

export default {
  components: {
    BaseLayout,
    CardsList
  },
  data: function() {
    return {
      cards: {},
      loaded: false
    };
  },

  async beforeMount() {
    this.$store.dispatch('updateBalances')
    this.$api.pots.getPots('acc_00009pjDWvoCpI4Jf8cMRl').then(data => {
      /*this.buildCards(data.accounts).then(cards => {
        this.cards = cards;
        this.loaded = true;
      });*/
      console.log(data.pots)
    });
  }
}
</script>
