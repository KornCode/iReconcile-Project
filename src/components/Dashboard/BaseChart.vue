<template>
  <div class="chart">
    <b-card-group deck>
      <b-card header=" " header-tag="header">
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
              text="Dropdown with divider"
            >
              <b-dropdown-header>Dropdown header</b-dropdown-header>
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

      banks_index: [],
      partitioned_bank: [],
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, values) {
                  return "฿ " + values;
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
        // legend: {
        //   display: false
        // },
        // tooltips: {
        //   callbacks: {
        //     label: function(tooltipItem) {
        //       return tooltipItem.yLabel;
        //     }
        //   }
        // }
      }
    };
  },

  computed: {
    ...mapState(["files", "bank_accounts"])
  },

  created() {
    this.bank_accounts.forEach(each => {
      this.banks_index.push(each);
    });
  },

  methods: {
    selectChart(index) {
      var selected_bank = this.files.bank.filter(o => {
        return o.Bank_Entity === index;
      });

      var date_label = [];
      var balance = [];

      selected_bank.forEach(obj => {
        date_label.push(obj.Date);
        balance.push(obj.Balance);
      });

      var dataset = {
        label: index,
        fill: false,
        borderColor: "#0073b7",
        data: balance
      };

      this.datacollection = {
        labels: date_label,
        fill: false,
        datasets: [dataset]
      };
    }
  },

  mounted() {
    this.selectChart();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
