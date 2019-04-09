<template>
  <div class="hello">
    <div style="display: inline-block; width: 95%;">
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
        <div slot="header" class="float-left pl-3">
          <b-form-group>
            <b-form-radio-group
              v-model="selected"
              :options="options"
              buttons
              button-variant="outline-info"
            ></b-form-radio-group>
          </b-form-group>
        </div>

        <b-table
          hover
          small
          fixed
          :items="list_items"
          :fields="fields"
          :filter="filter"
          :tbody-tr-class="rowClass"
          caption-top
          :responsive="true"
        >
          <template slot="undo" slot-scope="row">
            <div class="">
              <div v-if="selected === 'Matched'" key="selected">
                <b-button
                  variant="warning"
                  size="sm"
                  @click="undo_match(row.item.index)"
                >
                  <font-awesome-icon icon="undo" />
                </b-button>
              </div>
              <div v-else-if="selected === 'Unmatched'" key="selected">
                <b-button
                  variant="warning"
                  size="sm"
                  @click="undo_unmatch(row.item.index)"
                >
                  <font-awesome-icon icon="undo" />
                </b-button>
              </div>
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
        "Bank",
        "Reference",
        "Spent",
        "Received",
        "Who",
        "Why",
        "Comment",
        "undo"
      ],

      filter: null,

      selected: "Matched",
      options: [
        { text: "match", value: "Matched" },
        { text: "unmatch", value: "Unmatched" }
      ]
    };
  },

  methods: {
    ...mapActions("Match", ["undo_match"]),
    ...mapActions("Unmatch", ["undo_unmatch"]),

    generatePDF() {
      if (Object.values(this.list_items).length !== 0) {
        let doc = new jsPDF("landscape", "cm", "a4");
        let body_data = this.list_items.map(obj => Object.values(obj));

        doc.autoTable({
          head: [
            [
              "No",
              "Date",
              "Payee",
              "Bank",
              "Reference",
              "Spent",
              "Received",
              "Who",
              "Why",
              "Comment"
            ]
          ],
          body: body_data
        });

        doc.save("table.pdf");
      } else {
        alert("Table is empty.");
      }
    },

    detectPageReload() {
      window.addEventListener("beforeunload", event => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        this.generatePDF();

        event.returnValue = "";
      });
    },

    rowClass(item) {
      if (!item) return;
      if (item.status === "grouped") return "table-success";
    }
  },

  mounted() {
    // this.detectPageReload();
  },

  computed: {
    ...mapState(["raw_files"]),
    ...mapState("Unmatch", ["stack_unmatch"]),
    ...mapState("Match", ["stack_match"]),

    list_items: function() {
      let stack =
        this.selected === "Matched" ? this.stack_match : this.stack_unmatch;
      let temp = [];
      const add = (a, b) => a + b;
      for (var key in stack) {
        let obj = {
          index: stack[key].index,
          Date: stack[key].bank.Date,
          Payee: stack[key].book.Desc,
          Who: stack[key].metas.create.who,
          Why: stack[key].metas.create.why,
          Comment: stack[key].metas.comment
        };

        if (Array.isArray(stack[key].book) || Array.isArray(stack[key].bank)) {
          obj.status = "grouped";
          obj.Date = stack[key].book.map(each => each.Date);
          obj.Payee = stack[key].book.map(each => each.Desc);
          obj.Spent = stack[key].book.map(each => each.Debit).reduce(add);
          obj.Received = stack[key].book.map(each => each.Credit).reduce(add);
          obj.Bank = stack[key].bank.map(each => each.Bank_Entity);
          obj.Reference = stack[key].bank.map(each => each.Reference);
        } else {
          obj.Spent = stack[key].book.Debit;
          obj.Received = stack[key].book.Credit;
          obj.Bank = stack[key].bank.Bank_Entity;
          obj.Reference = stack[key].metas.create.what;
        }

        temp.push(obj);
      }
      return temp;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
