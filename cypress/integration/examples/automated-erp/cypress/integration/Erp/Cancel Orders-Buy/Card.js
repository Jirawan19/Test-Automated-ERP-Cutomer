/// <reference types="cypress" />

context("Cancel Order-Buy/Card", () => {
    beforeEach(() => {
        cy.visit("https://smdevdemo.autocareth.com/retailer/home")
    })
    // ยกเลิก ออเดอร์แบบรวมภาษี
    it("Cancel Order-Buy/Card", () => {
        loginCancelOrderBuyCard("retail-CRR", "password")
        CancelOrderBuy1()
        CancelOrderBuy2()
        CancelOrderBuy3()
        CancelOrderBuy4()
        taxCancelOrderBuy(getRandomArbitraryCancelOrderBuy(1, 100000))
        CancelOrderBuy5()
    })
    // ยกเลิก ออเดอร์แบบไม่รวมภาษี
    it("Cancel Order-Buy/Card", () => {
        loginCancelOrderBuyCard("retail-CRR", "password")
        CancelOrderBuy1()
        CancelOrderBuy2()
        CancelOrderBuy3()
        CancelOrderBuy4()
        taxCancelOrderBuy1(getRandomArbitraryCancelOrderBuy(1, 100000))
        CancelOrderBuy5()
    })

})
const loginCancelOrderBuyCard = (username, password) => {
    cy.get('#input_username').type(username)
    cy.get('#input_password').type(password)
    cy.get('.btn').click()
}

// // เปิด new orders
const CancelOrderBuy1 = () => {
    cy.get(':nth-child(2) > .col-12 > .mt-4').click()
    cy.get(':nth-child(2) > .form-group > a > .btn').click()
}

// เลือกสินค้า
const CancelOrderBuy2 = () => {
    cy.get('.box-add-product > .row > :nth-child(1) > .btn').click()
    cy.get('#scanAddOrders > .modal-dialog > .modal-content > .modal-body > #myTab > :nth-child(2) > #profile-tab')
        .click()
    cy.get('#inventory > .form-group > .form-control').type("11")
    cy.get(':nth-child(1) > td > .btn').click()
    cy.get('#scanAddOrders > .modal-dialog > .modal-content > .modal-header > .close')
        .click()
}


// กรอกข้อมูลสินค้าและราคา
const CancelOrderBuy3 = () => {
    const products = [
        {
            price: 4,
            qty: 20,
            percentage1: 5,
            percentage2: 5
        },
        // {
        //     price: 1,
        //     qty: 200,
        //     percentage1: 5,
        //     percentage2: 5,
        // }
    ]
    // ชิ้นที่1
    cy.get('#products-0 > :nth-child(2) > .form-row > :nth-child(1) > .el-input > .el-input__inner')
        .clear().type(products[0].price)
    cy.get('#products-0 > [style="width: 200px;"] > :nth-child(1) > .text-left > .form-control')
        .clear().type(products[0].percentage1)
    cy.get('#products-0 > [style="width: 200px;"] > :nth-child(2) > .text-left > .form-control')
        .clear().type(products[0].percentage2)
    cy.get('#products-0 > [style="width: 150px;"] > .el-input > .el-input__inner')
        .clear().type(products[0].qty)

    // ชิ้นที่2
    // cy.get('#products-1 > :nth-child(2) > .form-row > :nth-child(1) > .el-input > .el-input__inner')
    //     .clear().type(products[1].price)
    // cy.get('#products-1 > [style="width: 200px;"] > :nth-child(1) > .text-left > .form-control')
    //     .clear().type(products[1].percentage1)
    // cy.get('#products-1 > [style="width: 200px;"] > :nth-child(2) > .text-left > .form-control')
    //     .clear().type(products[1].percentage2)
    // cy.get('#products-1 > [style="width: 150px;"] > .el-input > .el-input__inner')
    //     .clear().type(products[1].qty)

    let totalPrice = 0
    products.map(product => {
        totalPrice += product.qty * product.price
    })
    
    cy.get(':nth-child(1) > .row > .text-right').should("contain.text", totalPrice)
}

// ข้อมูลลูกค้า,รูปแบบภาษี/การชำระเงิน  (แบบมีภาษี)
const CancelOrderBuy4 = () => {
    cy.get('.col-sm-12.p-0 > [style="background-color: rgb(243, 244, 246);"] > .form-row > .col-md-8 > .el-select > .el-input > .el-input__inner')
        .click().type("{downarrow}{downarrow}{enter}")
    cy.get('.col-sm-12.p-0 > :nth-child(2) > .row > :nth-child(1) > .form-control')
}
// สุ่มตัวเลขภาษี
const getRandomArbitraryCancelOrderBuy = (min, max) => {
    1, 100000
    return Math.random() * (max - min) + min;
}
// ข้อมูลลูกค้า,ราคาแบบรวมภาษี,และสุ่มภาษี (ราคารวมภาษี)
const taxCancelOrderBuy = (textNo) => {
    cy.get('.col-sm-12.p-0 > :nth-child(2) > .row > :nth-child(1) > .form-control').clear()
    cy.get('.col-sm-12.p-0 > [style="background-color: rgb(243, 244, 246);"] > .form-row > .col-md-8 > .el-select > .el-input > .el-input__inner').click()
        .type("{downarrow}{downarrow}{enter}")
    cy.get('.col-sm-12.p-0 > :nth-child(2) > .row > :nth-child(1) > .form-control')
        .type(textNo)
    cy.get(':nth-child(3) > .row > :nth-child(1) > .btn').click()
    cy.get('.row > :nth-child(3) > .btn').click()
    cy.get('.pt-3 > div > .btn').click()
    cy.get('.swal2-confirm').click()
}

// ข้อมูลลูกค้า,ราคาแบบไม่รวมภาษี,และสุ่มภาษี (ราคาไม่รวมภาษี)
const taxCancelOrderBuy1 = (textNo) => {
    cy.get('.col-sm-12.p-0 > :nth-child(2) > .row > :nth-child(1) > .form-control').clear()
    cy.get('.col-sm-12.p-0 > [style="background-color: rgb(243, 244, 246);"] > .form-row > .col-md-8 > .el-select > .el-input > .el-input__inner').click()
        .type("{downarrow}{downarrow}{enter}")
    cy.get('.col-sm-12.p-0 > :nth-child(2) > .row > :nth-child(1) > .form-control')
        .type(textNo)
    cy.get(':nth-child(3) > .row > :nth-child(1) > .btn').click()
    cy.get('.row > :nth-child(3) > .btn').click()
    cy.get('.pt-3 > div > .btn').click()
    cy.get('.swal2-confirm').click()
}

// ขั้นตอนยกเลิกออเดอร์
const CancelOrderBuy5 = () => {
    cy.get('.el-link--inner').click()
    cy.get('#orders-0 > :nth-child(1) > a').click()
    cy.get(':nth-child(3) > .status-border').should("contain.text", "รอชำระเงิน")
    cy.get('.mt-2 > .btn').click({ force: true })
    cy.get('.swal2-confirm').click({ force: true })
    cy.get('.swal2-confirm').click({ force: true })
    cy.get('.swal2-confirm').click()
    cy.get(':nth-child(3) > .status-border').should("contain.text", "ยกเลิก")
    cy.get('.btn').click({ force: true })
}
