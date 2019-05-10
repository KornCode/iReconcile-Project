<template>
  <div class="dashboard">
    <div style="display: inline-block;">
      <b-button-toolbar key-nav aria-label="Toolbar with button groups">
        <b-button-group class="mx-1">
          <b-button @click="show(1, 0, 0, 0)">Match</b-button>
          <b-button @click="show(0, 1, 0, 0)">Unmatch</b-button>
          <b-button @click="show(0, 0, 1, 0)">Summary</b-button>
          <b-button @click="show(0, 0, 0, 1)">Table</b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>

    <div class="pt-5">
      <div v-show="view_match">
        <Match />
      </div>
      <div v-show="view_unmatch">
        <Unmatch />
      </div>
      <div v-show="view_summary">
        <div class="w-75" style="display: inline-block;">
          <b-row>
            <b-col sm="8">
              <Chart />
            </b-col>
            <b-col sm="4">
              <Summary />
            </b-col>
          </b-row>
        </div>
      </div>
      <div v-show="view_table">
        <Table />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Match from "@/components/Dashboard/BaseMatch.vue";
import Unmatch from "@/components/Dashboard/BaseUnmatch.vue";
import Chart from "@/components/Dashboard/BaseChart.vue";
import Summary from "@/components/Dashboard/BaseSummary.vue";
import Table from "@/components/Dashboard/BaseTable.vue";

export default {
  name: "Dashboard",

  components: {
    Match,
    Unmatch,
    Chart,
    Summary,
    Table
  },

  data() {
    return {
      view_match: true,
      view_unmatch: false,
      view_summary: false,
      view_table: false
    };
  },

  methods: {
    show(bool1, bool2, bool3, bool4) {
      this.view_match = bool1;
      this.view_unmatch = bool2;
      this.view_summary = bool3;
      this.view_table = bool4;
    }
  }
};
</script>

<style scope>
#nav a {
  font-weight: bold;
  color: #ffff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
