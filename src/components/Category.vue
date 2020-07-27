<template>
  <span class="category" :style="{ backgroundColor: computedCategory.color }">
    <span class="category-text">{{ computedCategory.name }}</span>
    <span class="category-icon">{{ computedCategory.icon }}</span>
  </span>
</template>

<script>
const categories = [
  {
    color: "#61C4E3",
    icon: "💡",
    key: "bills",
    name: "Bills"
  },
  {
    color: "#6F7887",
    icon: "🎀",
    key: "charity",
    name: "Charity"
  },
  {
    color: "#AFE277",
    icon: "🍕",
    key: "eating_out",
    name: "Eating Out"
  },
  {
    color: "#C69DFD",
    icon: "🎟",
    key: "entertainment",
    name: "Entertainment"
  },
  {
    color: "#BB7C65",
    icon: "🧾",
    key: "expenses",
    name: "Expenses"
  },
  {
    color: "#6389DA",
    icon: "👪",
    key: "family",
    name: "Family"
  },
  {
    color: "#61D491",
    icon: "💷",
    key: "finances",
    name: "Finances"
  },
  {
    color: "#6F7C8C",
    icon: "💰",
    key: "general",
    name: "General"
  },
  {
    color: "#C46492",
    icon: "🎁",
    key: "gifts",
    name: "Gifts"
  },
  {
    color: "#F6C779",
    icon: "🛒",
    key: "groceries",
    name: "Groceries"
  },
  {
    color: "#FFA88C",
    icon: "🧳",
    key: "holidays",
    name: "Holidays"
  },
  {
    color: "#F18292",
    icon: "❤️",
    key: "personal_care",
    name: "Personal Care"
  },
  {
    color: "#F564B3",
    icon: "🛍",
    key: "shopping",
    name: "Shopping"
  },
  {
    color: "#67A6B4",
    icon: "🚍",
    key: "transport",
    name: "Transport"
  }
]

export default {
  computed: {
    computedCategory: function() {
      let unknownCategory = {
        icon: "❔",
        name: "Other"
      }
      let found = categories.find(c => c.key === this.category)
      return (found) ? found : unknownCategory
    }
  },
  props: {
    category: String
  }
}
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.category {
  background-color: #00A3D7;
  border-radius: 9999px;
  color: rgba(255,255,255,0.9);
  line-height: 1;
  font-size: 0.6em;
  padding: 0.2em 0.6em;
  
  .category-icon {
    display: none;
    margin-left: 4px;
  }

  .category-text {
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: lowercase;
  }
}
</style>