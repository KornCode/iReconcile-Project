<template>
  <div class="chart">
    <b-card-group deck>
      <b-card
        header=" "
        header-tag="header"
        class="overflow-hidden"
        style="border-radius: 30px"
      >
        <div slot="header" class="float-left">
          <h2>Chart</h2>
        </div>
        <div slot="header" class="float-right">
          <div>
            <b-dropdown
              id="ddown-divider"
              split
              split-variant="outline-primary"
              variant="primary"
            >
              <div slot="text">{{ select_bank }}</div>
              <b-dropdown-header>Bank Accounts</b-dropdown-header>
              <div v-for="(bank, index) in banks_index" :key="index">
                <b-dropdown-item-button @click="selectChart(bank)">{{
                  bank
                }}</b-dropdown-item-button>
              </div>
            </b-dropdown>
          </div>
        </div>
        <chart-mixins
          :chart-data="datacollection"
          :options="options"
          :height="250"
        />
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import ChartMixins from "./Mixins/ChartMixins.js";
import { mapState } from "vuex";

("use strict");

export default {
  name: "Chart",

  components: {
    ChartMixins
  },

  data() {
    return {
      datacollection: null,

      select_bank: "",

      banks_index: [],
      partitioned_bank: [],
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function(value) {
                  return "฿ " + value;
                }
              }
            }
          ]
        },
        elements: {
          line: {
            tension: 0
          }
        }
      },

      datacollections: {}
    };
  },

  computed: {
    ...mapState(["files", "bank_accounts"])
  },

  created() {
    for (var i = 0, len = this.bank_accounts.length; i < len; i++) {
      let each_bank = this.bank_accounts[i];

      this.banks_index.push(each_bank);

      let selected_bank = this.files.bank.filter(o => {
        return o.Bank_Entity === each_bank;
      });

      let date_label = [];
      let balance = [];

      selected_bank.forEach(obj => {
        date_label.push(obj.Date);
        balance.push(obj.Balance);
      });

      let dataset = {
        label: each_bank,
        fill: false,
        borderColor: "#179513",
        data: balance
      };

      let collection = {
        labels: date_label,
        fill: false,
        datasets: [dataset]
      };

      this.datacollections[each_bank] = collection;
    }

    // Initiate chart of first render
    this.$nextTick(() => {
      this.selectChart(this.banks_index[0]);
    });
  },

  methods: {
    selectChart(index) {
      this.select_bank = index;
      this.datacollection = this.datacollections[index];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
