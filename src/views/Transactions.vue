<template>
  <DualColumnLayout class="transactions">
    <router-link to="/accounts/acc_00009pjHH1ANXTGyzijvMH">test 1</router-link><br />
  </DualColumnLayout>
</template>

<script>
import DualColumnLayout from "@/components/Layouts/DualColumnLayout.vue";

export default {
  components: {
    DualColumnLayout
  },

  beforeMount() {
    this.$store.dispatch('invokeTransactions', 'acc_00009pjDWvoCpI4Jf8cMRl')
  }
};
</script>
