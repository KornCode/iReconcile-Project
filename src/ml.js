import Vue from "vue";
import { MLInstaller, MLCreate, MLanguage } from "vue-multilanguage";

Vue.use(MLInstaller);

export default new MLCreate({
  initial: "TH",
  save: process.env.NODE_ENV === "production",
  languages: [
    new MLanguage("EN").create({
      /******************
       * App Navbar
       */
      navHome: "Home",
      navAbout: "About",
      navContact: "Contact",

      /******************
       * Home
       */
      homeDescription:
        "A free online accounting software for your small business.",
      homeUploadButton: "Start Upload Files",

      /******************
       * Contact
       */
      contactHeader: "Contact",
      contactEmail: "Email",
      contactName: "Name",
      contactCategory: "Category",
      contactComment: "Comment",

      contactPhone: "Phone",
      contactMail: "Mail",

      contactSubmitButton: "Submit",
      contactResetButton: "Reset",

      /******************
       * TheUpload
       */
      uploadHeader: "Upload Statements",
      uploadLedger: "Ledger statement",
      uploadBanks: "Bank statements",
      uploadClearLedger: "Clear Ledger",
      uploadClearBanks: "Clear Banks",
      uploadReview: "Review",

      /******************
       * BaseSetup
       */
      setupHeader: "Reconsile Setup",
      setupParseButton: "Start Parsing",

      setupBookStatement: "Ledger Statement",
      setupBookDate: "Date",
      setupBookDescription: "Description",
      setupBookDebit: "Debit",
      setupBookCredit: "Credit",
      setupBookBalance: "Balance",

      setupBankStatement: "Bank Statement",
      setupBankDate: "Date",
      setupBankDescription: "Description",
      setupBankReference: "Reference",
      setupBankDeposit: "Deposit",
      setupBankWithdraw: "Withdraw",
      setupBankBalance: "Balance",

      setupRange: "Range",
      setupRangeDate: "Date",
      setupRangeAmount: "Amount",

      /******************
       * BaseMatch
       */
      ok: "Ok",
      cancel: "Cancel",
      matchModalMore: "More",

      matchModalTransfer: "Transfer",
      matchModalTransferHeader: "Submit transfer",

      matchModalCreate: "Create",
      matchModalCreateHeader: "Submit creates",

      matchModalComment: "Comment",
      matchModalCommentHeader: "Submit comment",

      matchSpent: "Spent",
      matchReceived: "Received",

      /******************
       * BaseSummary
       */
      summaryChart: "Chart Balance",
      summaryTotal: "Total",
      summaryMatched: "Matched",
      summaryRemaining: "Remaining",
      summaryBookBalance: "Book Balance",
      summaryBankBalance: "Bank Balance"
    }),

    new MLanguage("TH").create({
      /******************
       * App Navbar
       */
      navHome: "หน้าแรก",
      navAbout: "เกี่ยวกับ",
      navContact: "ติดต่อ",

      /******************
       * Home
       */
      homeDescription: "โปรแกรมการทำบัญชีกระทบยอดสำหรับธุรกิจขนาดเล็ก",
      homeUploadButton: "เริ่มต้นอัปโหลดไฟล์",

      /******************
       * Contact
       */
      contactHeader: "ติดต่อ",
      contactEmail: "อีเมล",
      contactName: "ชื่อ",
      contactCategory: "ประเภท",
      contactComment: "ความเห็น",

      contactPhone: "เบอร์",
      contactMail: "อีเมล",

      contactSubmitButton: "ส่ง",
      contactResetButton: "ล้าง",

      /******************
       * TheUpload
       */
      uploadHeader: "อัปโหลดไฟล์",
      uploadLedger: "บัญชีบริษัท",
      uploadBanks: "บัญชีธนาคาร",
      uploadClearLedger: "ล้างบัญชีบริษัท",
      uploadClearBanks: "ล้างบัญชีธนาคาร",
      uploadReview: "รีวิว",

      /******************
       * BaseSetup
       */
      setupHeader: "ตั้งค่าการทำงาน",
      setupParseButton: "เริ่มต้นกระทบยอด",

      setupBookStatement: "บัญชีบริษัท",
      setupBookDate: "วันที่",
      setupBookDescription: "รายละเอียด",
      setupBookDebit: "เดบิต",
      setupBookCredit: "เครดิต",
      setupBookBalance: "คงเหลือ",

      setupBankStatement: "บัญชีธนาคาร",
      setupBankDate: "วันที่",
      setupBankDescription: "รายละเอียด",
      setupBankReference: "อ้างอิง",
      setupBankDeposit: "เงินออก",
      setupBankWithdraw: "เงินเข้า",
      setupBankBalance: "คงเหลือ",

      setupRange: "ขอบเขต",
      setupRangeDate: "วันที่",
      setupRangeAmount: "จำนวนเงิน",

      /******************
       * BaseMatch
       */
      ok: "ตกลง",
      cancel: "ยกเลิก",
      matchModalMore: "เพิมเติม",

      matchModalTransfer: "บัญชีบริษัท",
      matchModalTransferHeader: "แก้ไขบัญชีบริษัท",

      matchModalCreate: "สร้าง",
      matchModalCreateHeader: "แก้ไขการสร้าง",

      matchModalComment: "รายละเอียด",
      matchModalCommentHeader: "แก้ไขรายละเอียด",

      matchSpent: "เงินออก",
      matchReceived: "เงินเข้า",

      /******************
       * BaseSummary
       */
      summaryChart: "กราฟยอดคงเหลือ",
      summaryTotal: "ทั้งหมด",
      summaryMatched: "จับคู่แล้ว",
      summaryRemaining: "ไม่มีคู่",
      summaryBookBalance: "ยอดคงเหลือบริษัท",
      summaryBankBalance: "ยอดคงเหลือธนาคาร"
    })
  ]
});
