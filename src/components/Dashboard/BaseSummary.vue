<template>
  <div class="summary">
    <b-list-group class="overflow-hidden">
      <h3 class="text-left">Matched</h3>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
        style="border-radius: 20px 20px 0px 0px"
      >
        <div v-text="$ml.get('summaryTotal')" />
        <b-badge variant="primary" pill>{{ pairedLength }}</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        <div v-text="$ml.get('summaryMatched')" />
        <b-badge variant="primary" pill>{{ countStacks }}</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
        style="border-radius: 0px 0px 20px 20px"
      >
        <div v-text="$ml.get('summaryRemaining')" />
        <b-badge variant="warning" pill>{{
          pairedLength - countStacks
        }}</b-badge>
      </b-list-group-item>
    </b-list-group>

    <div class="py-2"></div>

    <b-list-group class="overflow-hidden">
      <h3 class="text-left">Unmatched</h3>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
        style="border-radius: 20px 20px 0px 0px"
      >
        <div v-text="$ml.get('summaryTotal')" />
        <b-badge variant="primary" pill>{{ remainingLength }}</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        <div v-text="$ml.get('summaryMatched')" />
        <b-badge variant="primary" pill>{{ countStackUnmatch }}</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
        style="border-radius: 0px 0px 20px 20px"
      >
        <div v-text="$ml.get('summaryRemaining')" />
        <b-badge variant="warning" pill>{{
          remainingLength - countStackUnmatch
        }}</b-badge>
      </b-list-group-item>
    </b-list-group>

    <div class="py-2"></div>

    <b-list-group class="overflow-hidden">
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
        style="border-radius: 20px 20px 0px 0px"
      >
        <div v-text="$ml.get('summaryBookBalance')" />
        <b-badge variant="warning" pill>{{
          (bookBalance + editBookBalance) | numFormatting
        }}</b-badge>
      </b-list-group-item>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
        style="border-radius: 0px 0px 20px 20px"
      >
        <div v-text="$ml.get('summaryBankBalance')" />
        <b-badge variant="warning" pill>{{
          (bankBalance + editBankBalance) | numFormatting
        }}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Summary",

  computed: {
    ...mapState("Unmatch", ["editBankBalance", "editBookBalance"]),
    ...mapGetters(["bookBalance", "bankBalance"]),
    ...mapGetters("Match", ["countStacks", "pairedLength"]),
    ...mapGetters("Unmatch", ["countStackUnmatch", "remainingLength"])
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
