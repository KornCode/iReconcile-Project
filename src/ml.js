import Vue from "vue";
import { MLInstaller, MLCreate, MLanguage } from "vue-multilanguage";

Vue.use(MLInstaller);

export default new MLCreate({
  initial: "EN",
  save: process.env.NODE_ENV === "production",
  languages: [
    new MLanguage("EN").create({
      /******************
       * App Navbar
       */
      navHome: "Home",
      navDashboard: "Dashboard",
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

      setupColStatement:
        "We need to make sure we got the right columns name, please confirm each column name.",
      setupColRange:
        "Set range of date for matching. Set to zero for no error.",

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

      matchColBank: "Review your bank statement lines...",
      matchColBook: "...then match with your transactions",

      matchModalTransfer: "Transfer",
      matchModalTransferHeader: "Submit transfer",

      matchModalCreate: "Create",
      matchModalCreateHeader: "Submit creates",

      matchModalComment: "Comment",
      matchModalCommentHeader: "Submit comment",

      matchModalSwap: "Swap",
      matchModalSwapHeader: "Submit swap",

      matchModalEditBank: "Edit",
      matchModalEditBankHeader: "Submit edit",

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
      navDashboard: "แดชบอร์ด",
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

      setupColStatement: "กรุณาเลือกชื่อคอลัมให้ตรงกับความหมาย",
      setupColRange:
        "ตั้งค่าความคลาดเคลื่อนของวันที่ ตั้งค่าไว้ที่ 0 ในกรณีที่ไม่ต้องการความคลาดเคลื่อน",

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

      matchColBank: "ตรวจดูรายการของธนาคาร...",
      matchColBook: "...เพื่อกระทบยอดกับการการของบริษัท",

      matchModalTransfer: "บัญชีบริษัท",
      matchModalTransferHeader: "แก้ไขบัญชีบริษัท",

      matchModalCreate: "สร้าง",
      matchModalCreateHeader: "แก้ไขการสร้าง",

      matchModalComment: "รายละเอียด",
      matchModalCommentHeader: "แก้ไขรายละเอียด",

      matchModalSwap: "สลับ",
      matchModalSwapHeader: "ยืนยัน",

      matchModalEditBank: "แก้ไข",
      matchModalEditBankHeader: "ยืนยัน",

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
