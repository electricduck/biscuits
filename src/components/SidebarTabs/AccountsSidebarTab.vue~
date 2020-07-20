<template>
  <BaseLayout class="sidebar-accounts" :loaded="loaded">
    <CardsList :cards="cards" />
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/components/Layouts/BaseLayout.vue";
import CardsList from "@/components/CardsList.vue";
import Card from "@/models/Card.js";
import Person from "@/models/Person.js";

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
  methods: {
    buildCards(accounts) {
      return new Promise(resolve => {
        let cards = [];

        accounts.forEach(account => {
          let owners = []

          account.owners.forEach(owner => {
            owners.push(new Person({
              fullName: owner.preferred_name,
              id: account.id,
              shortName: owner.preferred_first_name
            }))
          })

          cards.push(
            new Card({
              accountNumber: account.account_number,
              amount: 0,
              created: new Date(account.created),
              currency: "GBP",
              id: account.id,
              owners: owners,
              type: account.type
            })
          );
        });

        cards = cards.sort((a, b) => {
          if (a.created > b.created) return 1;
          if (a.created < b.created) return -1;
          return 0;
        });

        resolve(cards);
      });
    }
  },

  async beforeMount() {
    this.$store.dispatch('updateBalances')
    this.$api.accounts.getAccounts().then(data => {
      this.buildCards(data.accounts).then(cards => {
        this.cards = cards;
        this.loaded = true;
      });
    });
  }
};
</script>