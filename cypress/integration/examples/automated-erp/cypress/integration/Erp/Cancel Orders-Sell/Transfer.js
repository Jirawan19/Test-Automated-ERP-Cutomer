/// <reference types="cypress" />

context("AddsellTax-Cash", () => {
    beforeEach(() => {
        cy.visit("https://smdevdemo.autocareth.com/retailer/home")
    })
    // ยกเลิกรายการสินค้าแบบมีภาษี
    it("Cancel Order-Sell/Transfer", () => {
        loginCancelOrderTransfer("retail-CRR", "password")
        CancelOrderTransfer1()
        CancelOrderTransfer2()
        CancelOrderTransfer3()
        CancelOrderTransfer4()
        CancelOrderTransfer5()
    })
    // ยกเลิกรายการสินค้าแบบมีภาษี
    it("Cancel Order-Sell/Transfer1", () => {
        loginCancelOrderTransfer("retail-CRR", "password")
        CancelOrderTransfer1()
        CancelOrderTransfer2()
        CancelOrderTransfer3()
        CancelOrderTransfer41()
        CancelOrderTransfer5()
    })
})

const loginCancelOrderTransfer = (username, password) => {
    cy.get('#input_username').type(username)
    cy.get('#input_password').type(password)
    cy.get('.btn').click()
}

// เปิด new orders
const CancelOrderTransfer1 = () => {
    cy.get('.row > :nth-child(1) > .col-12').click()
    cy.get(':nth-child(2) > .form-group > a > .btn').click()

}

// เปิด เลือกสินค้า
const CancelOrderTransfer2 = () => {
    cy.get('.box-add-product > .row > :nth-child(1) > .btn').click()
    cy.get('#scanAddOrders > .modal-dialog > .modal-content > .modal-body > #myTab > :nth-child(2) > #profile-tab')
        .click()
    cy.get('#inventory > .form-group > .form-control').type("11")
    cy.get(':nth-child(1) > td > .btn').click({ force: true })
    cy.get(':nth-child(2) > td > .btn').click({ force: true })
    cy.get('#scanAddOrders').click({ force: true })

}

// กรอกข้อมูลสินค้าและราคา
const CancelOrderTransfer3 = () => {
    const products = [
        {
            price: 2,
            qty: 100,
            percentage1: 5,
            percentage2: 5
        },
        {
            price: 5,
            qty: 50,
            percentage1: 5,
            percentage2: 5,
        }
    ]
    // ชิ้นที่1
    cy.get('#products-0 > :nth-child(2) > .form-row > :nth-child(1) > .el-input > .el-input__inner')
        .clear().type(products[0].price)
    cy.get('#products-0 > [style="width: 200px;"] > :nth-child(1) > .text-left > .form-control')
        .clear().type(products[0].percentage1)
    cy.get('#products-0 > [style="width: 200px;"] > :nth-child(2) > .text-left > .form-control')
        .clear().type(products[0].percentage2)
    cy.get('#products-0 > [style="width: 150px;"] > :nth-child(2) > .el-input__inner')
        .clear().type(products[0].qty)

    // ชิ้นที่2
    cy.get('#products-1 > :nth-child(2) > .form-row > :nth-child(1) > .el-input > .el-input__inner')
        .clear().type(products[1].price)
    cy.get('#products-1 > [style="width: 200px;"] > :nth-child(1) > .text-left > .form-control')
        .clear().type(products[1].percentage1)
    cy.get('#products-1 > [style="width: 200px;"] > :nth-child(2) > .text-left > .form-control')
        .clear().type(products[1].percentage2)
    cy.get('#products-1 > [style="width: 150px;"] > :nth-child(2) > .el-input__inner')
        .clear().type(products[1].qty)

    let totalPrice = 0
    products.map(product => {
        totalPrice += product.qty * product.price
    })
    cy.get(':nth-child(1) > .row > .text-right > h5').should("contain.text", totalPrice)


}
// ข้อมูลลูกค้า,รูปแบบภาษี/การชำระเงิน (แบบมีภาษี)
const CancelOrderTransfer4 = () => {
    cy.get('.col-sm-12.p-0 > [style="background-color: rgb(243, 244, 246);"] > .form-row > .col-md-8 > .el-select > .el-input > .el-input__inner')
        .click().type("{downarrow}{downarrow}{enter}")
    cy.get('.box-price > .row > :nth-child(2) > .btn').click()
    cy.get('.payment-box > img').click()
    cy.get('#paymentModal > .modal-dialog > .modal-content > .modal-footer > .btn-confirm').click()
    cy.get('.swal2-confirm').click()
}

// ข้อมูลลูกค้า,รูปแบบภาษี/การชำระเงิน (แบบไม่มีภาษี)
const CancelOrderTransfer41 = () => {
    cy.get('.col-sm-12.p-0 > [style="background-color: rgb(243, 244, 246);"] > .form-row > .col-md-8 > .el-select > .el-input > .el-input__inner')
        .click().type("{downarrow}{downarrow}{enter}")
    cy.get('.col-sm-12.p-0 > :nth-child(2) > .row > :nth-child(1) > .btn').click()
    cy.get('.col-sm-12.p-0 > :nth-child(2) > .row > :nth-child(2) > .btn').click()
    cy.get('.box-price > .row > :nth-child(2) > .btn').click()
    cy.get('.payment-box > img').click()
    cy.get('#paymentModal > .modal-dialog > .modal-content > .modal-footer > .btn-confirm').click()
    cy.get('.swal2-confirm').click()
}
// ทำขั้นตอนยกเลิกรายการสั่งซื้อ
const CancelOrderTransfer5 = () => {
    cy.get('.el-link--inner').click({ force: true })
    cy.get('.el-link--inner').click({ force: true })
    cy.get('#orders-0 > :nth-child(1) > a').click()
    cy.get('.btn-danger').click()
    cy.get('.swal2-confirm').click()
    cy.get('.swal2-confirm').click({ force: true })
    cy.get('.swal2-confirm').click()
    cy.get(':nth-child(3) > .status-border').should("contain.text", "ยกเลิก")
    cy.get('.container-fuild > .row > :nth-child(1) > .nuxt-link-active > .btn').click()
}