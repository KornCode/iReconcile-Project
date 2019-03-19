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
              :items="filtered_items_book"
              :filter="filter_book"
              caption-top
              :responsive="true"
            >
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

("use strict");

export default {
  name: "Table",

  data() {
    return {
      items_bank: [],
      items_book: [],

      filter_book: null,
      filter_bank: null
    };
  },

  methods: {
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
    }
  },

  mounted() {
    this.items_book = this.$store.state.stack;
  },

  computed: {
    // filter 'book', 'bank', and 'metas' from object
    filtered_items_book: function() {
      // destructuring assignment
      // https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      let unwrap = ({ book, bank, metas }) => ({ book, bank, metas });
      return this.items_book.map(obj => unwrap(obj));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
