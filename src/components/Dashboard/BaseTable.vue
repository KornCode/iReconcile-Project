<template>
  <div class="hello">
    <div style="display: inline-block;" class="w-75">
      <b-card no-body header-bg-variant="dark" header-text-variant="light">
        <div slot="header" class="float-right">
          <b-button variant="outline-info" @click="generatePDF">
            Generate PDF
          </b-button>
        </div>
        <div slot="header" class="float-left">
          <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search" />
              <b-input-group-append>
                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </div>

        <b-table
          hover
          small
          fixed
          :items="list_items"
          :fields="fields"
          :filter="filter"
          caption-top
          :responsive="true"
        >
          <template slot="undo" slot-scope="row">
            <div class="">
              <b-button
                variant="warning"
                size="sm"
                @click="undo(row.item.index)"
              >
                <font-awesome-icon icon="undo" />
              </b-button>
            </div>
          </template>
        </b-table>
      </b-card>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";

import { mapState, mapActions } from "vuex";

export default {
  name: "Table",

  data() {
    return {
      items_bank: [],
      items_book: [],

      fields: [
        "Date",
        "Payee",
        "Reference",
        "Spent",
        "Received",
        "Comment",
        "undo"
      ],

      filter: null
    };
  },

  methods: {
    ...mapActions(["undo"]),

    generatePDF() {
      let doc = new jsPDF();
      let body_data = this.list_items.map(obj => Object.values(obj));

      doc.autoTable({
        head: [
          ["No", "Date", "Payee", "Reference", "Spent", "Received", "Comment"]
        ],
        body: body_data
      });

      doc.save("table.pdf");
    },

    detectPageReload() {
      window.addEventListener("beforeunload", event => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = "";
      });
    }
  },

  mounted() {
    // this.detectPageReload();
  },

  computed: {
    ...mapState(["stack"]),

    list_items: function() {
      let temp = [];
      for (var key in this.stack) {
        let obj = {
          index: this.stack[key].index,
          Date: this.stack[key].bank.Date,
          Payee: this.stack[key].book.Desc,
          Reference: this.stack[key].metas.create.what,
          Spent: this.stack[key].bank.Deposit,
          Received: this.stack[key].bank.Withdraw,
          Comment: this.stack[key].metas.comment
        };

        temp.push(obj);
      }
      return temp;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
