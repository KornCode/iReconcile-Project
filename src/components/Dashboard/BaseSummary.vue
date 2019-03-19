<template>
  <div class="summary">
    <b-list-group>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        <div v-text="$ml.get('summaryChart')" />
        <b-badge variant="primary" pill>28</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        <div v-text="$ml.get('summaryMatched')" />
        <b-badge variant="primary" pill>{{ countStacks }}</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        <div v-text="$ml.get('summaryRemaining')" />
        <b-badge variant="warning" pill>{{ 28 - countStacks }}</b-badge>
      </b-list-group-item>
    </b-list-group>

    <div class="py-2"></div>

    <b-list-group>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        <div v-text="$ml.get('summaryBookBalance')" />
        <b-badge variant="warning" pill>{{
          bookBalance | numFormatting
        }}</b-badge>
      </b-list-group-item>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        <div v-text="$ml.get('summaryBankBalance')" />
        <b-badge variant="warning" pill>{{
          bankBalance | numFormatting
        }}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

("use strict");

export default {
  name: "Summary",

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["countStacks", "bookBalance", "bankBalance"])
  },

  filters: {
    numFormatting: function(number) {
      if (number) {
        return number.toLocaleString("en");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
