<template>
  <div class="hello">
    <div style="display: inline-block;" class="w-75">
      <b-button @click="generatePDF"
        ><font-awesome-icon icon="file-pdf"
      /></b-button>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Book" active>
            <b-row class="mb-4">
              <b-col md="6" class="my-1">
                <b-form-group horizontal label="Filter" class="mb-0">
                  <b-input-group>
                    <b-form-input
                      v-model="filter_book"
                      placeholder="Type to Search"
                    />
                    <b-input-group-append>
                      <b-btn :disabled="!filter_book" @click="filter_book = ''"
                        >Clear</b-btn
                      >
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>

            <b-table
              hover
              small
              :items="list_items"
              :fields="fields"
              :filter="filter_book"
              caption-top
              :responsive="true"
            >
              <template slot="undo" slot-scope="row">
                <div class="pt-3">
                  <b-button
                    variant="danger"
                    size="sm"
                    @click="undo(row.item.index)"
                  >
                    undo {{ row.item.index }}
                  </b-button>
                </div>
              </template>
            </b-table>
          </b-tab>
        </b-tabs>
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

      filter_book: null,
      filter_bank: null
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
