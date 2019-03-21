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

              <b-col md="6" class="my-1">
                <b-form-group>
                  <!-- <b-form-radio-group
                    v-model="selected_radioBook"
                    :options="options_book"
                    name="radioInline"
                  > 
                  </b-form-radio-group> -->
                </b-form-group>
                <div class="mt-3">
                  <!-- Selected: <strong>{{ selected_radioBook }}</strong> -->
                </div>
              </b-col>
            </b-row>
            <!-- :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc" -->
            <b-table
              hover
              small
              :items="stack"
              :fields="fields"
              :filter="filter_book"
              caption-top
              :responsive="true"
            >
              <template slot="undo" slot-scope="row">
                <div class="pt-3">
                  <b-button variant="danger" size="sm" @click="undo(row.item.index)">
                    undo {{row.item.index}}
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

("use strict");

export default {
  name: "Table",

  data() {
    return {
      items_bank: [],
      items_book: [],

      fields: ["book", "bank", "metas", "undo"],

      filter_book: null,
      filter_bank: null
    };
  },

  methods: {
    ...mapActions(["undo"]),

    generatePDF() {
      let doc = new jsPDF();

      doc.autoTable({
        head: [["Book", "Bank", "Meta"]],
        body: [
          ["David", "david@example.com", "Sweden"],
          ["Castille", "castille@example.com", "Norway"]
          // ...
        ]
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
    ...mapState(["stack"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
