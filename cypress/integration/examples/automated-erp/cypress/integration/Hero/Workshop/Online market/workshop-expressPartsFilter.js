// อะไหล่ ใส้กรอง ไม่ด่วน


/// <reference types="cypress" />

context("workshop-expressPartsFilter", () => {

    it("Add order-parts", () => {
        cy.login("empGrip01", "password")
        orderExpressFilter()
        orderExpressFilter1()
        checkorderExpressFilter()
        logout()
    })

    it("supplier receiveATP", () => {
        cy.login("atp-member1", "atp16011986")
        supplierreceive()
        Supllierlogout()
    })

    it("workshop receive", () => {
        cy.login("empGrip01", "password")

        // รับสินค้า อะไหล่ แบบทั้งหมด
        receiveSaleparts()
        checkreceiveparts()

        // รับสินค้า อะไหล่ แบบบางชิ้น
        // receiveSaleparts1()
        // checkreceiveparts1()
    })
})

// เข้าหน้าเพิ่มรายการซื้อ
const orderExpressFilter = () => {
    cy.get('#nav-item-0')
        .click()

    cy.get('#btnMenu-5')
        .click().wait(1000)
}

// เพิ่มรายการซื้ออะไหล่ ระบบเบรก
const orderExpressFilter1 = () => {
    cy.get('#vs10__combobox')
        .wait(2000).click().type("ไส้กรองแอร์").type("{enter}")

    cy.get('#vs11__combobox')
        .wait(2000).click().type("FAME").type("{enter}")


    cy.get('#btnAddCartById-8699')
        .click()

    cy.get('.el-notification__closeBtn')
        .click()


    // เข้าหน้ารายการซื้อ
    cy.get('.input-group > #btnTopbar_Icon_Cart > img')
        .click()

    // เช็ครายการสินค้า
    cy.get('.td-list-text > :nth-child(1)')
        .contains("ไส้กรองแอร์ (27277-1H0A)")

    // จำนวน
    cy.get('#txtQtyReciveBySupplyIndex-0-0')
        .clear().type("3")
    // ราคา
    cy.get('thead > [style="cursor: pointer;"] > :nth-child(4)')
        .contains("80.00")

    cy.get('.total-price')
        .contains("240.00 บาท")

    cy.get(':nth-child(2) > .btn')
        .click()

    cy.get('.swal2-confirm')
        .click()
}

// เช็ครายการสินค้าที่พึ่งเปิด
const checkorderExpressFilter = () => {
    cy.get(':nth-child(1) > :nth-child(1) > a > .primary-blue')
        .click()

    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > .primary-blue')
        .contains("27277-1H0A")

    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(4)')
        .contains("ไส้กรองแอร์")


    cy.get('.status-border')
        .contains("รอยืนยันรายการ")

    cy.get('#totalNettd')
        .contains("240.00 บาท")

    cy.get('#backtoindex')
        .click()
}

// ออกจากระบบ
const logout = () => {
    cy.get('#dropdownMenuOffset').click()
    cy.get('.btn-group > .dropdown-menu > :nth-child(2)').click()
}
// ออกจากระบบ
const Supllierlogout = () => {
    cy.get('#dropdownMenuOffset').click()
    cy.get('.dropdown-menu > .dropdown-item')
        .click()
}
const supplierreceive = () => {
    // เข้าหน้ารับรายการขาย
    cy.get(':nth-child(1) > .nav-link > .row > h6').click()
    cy.get(':nth-child(1) > :nth-child(1) > a > .primary-blue').click()

    // เช็คสินค้าและราคา
    cy.get('.status-border').contains("รอยืนยันรายการ")

    cy.get('.table-order-wrappe > .table > tbody > tr > .text-left > .primary-blue')
        .contains("27277-1H0A")
    cy.get('.table-order-wrappe > .table > tbody > tr > .text-left > :nth-child(4)')
        .contains("ไส้กรองแอร์")

    cy.get('.the-footer > :nth-child(3) > :nth-child(2)')
        .contains("240.00 บาท")

    // บันทึกรับรายการขาย
    cy.get(':nth-child(2) > span > .btn').click()
    cy.get('.swal2-confirm').click()
    cy.wait(1000)
    cy.get('.swal2-confirm').click()
}
// workshop รับรายการอะไหล่ แบบทั้งหมด
const receiveSaleparts = () => {
    cy.get('#nav-item-3')
        .click()

    cy.get(':nth-child(1) > :nth-child(1) > a > .primary-blue')
        .click()
    // ตรวจเช็ครายการสินค้า
    cy.get('.status-border').contains("รอรับสินค้า")

    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > .primary-blue')
        .contains("27277-1H0A")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(4)')
        .contains("ไส้กรองแอร์")

    cy.get('#nbrPurchaseOrderItemQtyReceivedDots_QtyReceived_0')
        .clear().type("3")

    cy.get('#totalNettd')
        .contains("240.00 บาท")


    // บันทึกรายการ
    cy.get('.d-xl-flex > :nth-child(2) > .btn').click()
    cy.get('.swal2-confirm').click()

    cy.wait(500)

    cy.get('.swal2-confirm').click()


}

const checkreceiveparts = () => {
    cy.get('.status-border').contains("รายการเสร็จสิ้น")

    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > .primary-blue')
        .should("contain.text", "27277-1H0A")

    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(4)')
        .contains("ไส้กรองแอร์")

    cy.get('#totalNettd')
        .contains("240.00 บาท")

    cy.get('tbody > :nth-child(1) > :nth-child(7)')
        .contains("ยืนยันการส่ง")

    cy.get('#backtoindex').click()
}

// workshop รับรายการอะไหล่ แบบบางชิ้น
const receiveSaleparts1 = () => {
    cy.get('#nav-item-3')
        .click()

    cy.get(':nth-child(1) > :nth-child(1) > a > .primary-blue')
        .click()
    // ตรวจเช็ครายการสินค้า
    cy.get('.status-border').contains("รอรับสินค้า")

    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > .primary-blue')
        .contains("27277-1H0A")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(4)')
        .contains("ไส้กรองแอร์")

    cy.get('#nbrPurchaseOrderItemQtyReceivedDots_QtyReceived_0')
        .clear().type("2")

    cy.get('tbody > :nth-child(1) > :nth-child(7)')
        .contains("240.00")

    cy.get('#totalNettd')
        .contains("240.00 บาท")


    // บันทึกรายการ
    cy.get('.d-xl-flex > :nth-child(2) > .btn').click()
    cy.get('.swal2-confirm').click()

    cy.wait(500)

    cy.get('.swal2-confirm').click()


}

const checkreceiveparts1 = () => {
    cy.get('.status-border').contains("รับสินค้าบางส่วน")

    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > .primary-blue')
        .should("contain.text", "27277-1H0A")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(4)')
        .contains("ไส้กรองแอร์")

    cy.get('#totalNettd')
        .contains("240.00 บาท")


    cy.get('#backtoindex').click()
}