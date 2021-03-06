/// <reference types="cypress" />

let textNo

context("add-buy-Tax-transfer", () => {
    beforeEach(() => {
        cy.visit("https://smdevdemo.autocareth.com/retailer/home")
    })
    // it("getLatestTaxNo", () => {
    //     getLatestTaxNo()
    // })
    // เช็คเลขกำกับภาษีที่มีในระบบ
    // it("Add-Buy-Tax case tax no dub", () => {
    //     login("retail-CRR", "password")
    //     cy.get(':nth-child(2) > .col-12 > .mt-4').click()
    //     cy.get('.nuxt-link-active > .el-menu-item > .menu-text').click()
    //     cy.get(':nth-child(2) > .form-group > a > .btn').click()
    //     AddBuyCard()
    //     DataCard()
    //     tax(textNo)
    //     cy.get(':nth-child(1) > .text-price').should("contain.text", "เลขใบกำกับภาษีนี้มีในระบบแล้ว")
    // })

    // สินค้าและราคาแบบรวมภาษี PO
    it("Add-Buy-tax/card-PO", () => {
        login("retail-CRR", "password")
        cy.get(':nth-child(2) > .col-12 > .mt-4').click()
        cy.get('.nuxt-link-active > .el-menu-item > .menu-text').click()
        cy.get(':nth-child(2) > .form-group > a > .btn').click()
        AddBuyCard1()
        DataCard()
        tax(getRandomArbitrary(1, 100000))
        cy.get(':nth-child(3) > .row > :nth-child(1) > .btn').click()
        cy.get('.row > :nth-child(3) > .btn').click()
        cy.get('.pt-3 > div > .btn').click()
        cy.get('.swal2-confirm').click()

        // cy.get('.el-link--inner').click()
        // cy.get('#orders-0 > :nth-child(5) > .justify-content-center > .status-border')
        //     .should("contain.text", "รอชำระเงิน")
        // cy.get('#orders-0 > :nth-child(1) > a').click()
        // cy.get(':nth-child(3) > .status-border').should("contain.text", " รอชำระเงิน")
    })

    // สินค้าและราคาแบบไม่รวมภาษี PO
    // it("Add-Buy-Notax/card-PO", () => {
    //     login("retail-CRR", "password")
    //     cy.get(':nth-child(2) > .col-12 > .mt-4').click()
    //     cy.get('.nuxt-link-active > .el-menu-item > .menu-text').click()
    //     cy.get(':nth-child(2) > .form-group > a > .btn').click()
    //     cy.get('.box-add-product > .row > :nth-child(2) > .btn').click({ force: true })
    //     cy.get('#atp > .form-group > .form-control').type("11", { force: true })
    //     cy.get(':nth-child(1) > td > .btn').click({ force: true })
    //     cy.get('#addProductModal > .modal-dialog > .modal-content > .modal-header > .close > span').click()
    //     AddBuyCard1()
    //     DataCard()
    //     tax(getRandomArbitrary(1, 100000))
    //     cy.get(':nth-child(3) > .row > :nth-child(1) > .btn').click()
    //     cy.get(':nth-child(3) > .row > :nth-child(2) > .btn').click()
    //     cy.get('.el-switch__core').click()
    //     cy.get('.pt-3 > div > .btn').click()
    //     cy.get('.row > :nth-child(3) > .btn').click()
    //     cy.get('.swal2-confirm').click()
    //     cy.get('.el-link--inner').click()
    //     cy.get('#orders-1 > :nth-child(5) > .justify-content-center > .status-border')
    //         .should("contain.text", "รอชำระเงิน")
    //     cy.get('#orders-0 > :nth-child(1) > a').click()
    //     cy.get(':nth-child(3) > .status-border').should("contain.text", " รอชำระเงิน")
    // })

    // สินค้าและราคาแบบรวมภาษี RO
    // it("Add-Buy-tax/card-RO", () => {
    //     login("retail-CRR", "password")
    //     cy.get(':nth-child(2) > .col-12 > .mt-4').click()
    //     cy.get('.nuxt-link-active > .el-menu-item > .menu-text').click()
    //     cy.get(':nth-child(2) > .form-group > a > .btn').click()
    //     AddBuyCard2()
    //     DataCard()
    //     tax(getRandomArbitrary(1, 100000))
    //     cy.get(':nth-child(3) > .row > :nth-child(1) > .btn').click()
    //     cy.get('.el-switch__core').click()
    //     cy.get('.pt-3 > div > .btn').click()
    //     cy.get('.row > :nth-child(3) > .btn').click()
    //     cy.get('.swal2-confirm').click()
    //     cy.get('.el-link--inner').click()
    //     cy.get('#orders-1 > :nth-child(5) > .justify-content-center > .status-border')
    //         .should("contain.text", "รอชำระเงิน")
    //     cy.get('#orders-0 > :nth-child(1) > a').click()
    //     cy.get(':nth-child(3) > .status-border').should("contain.text", " รอชำระเงิน")
    // })

    // สินค้าและราคาแบบไม่รวมภาษี RO
    // it("Add-Buy-Notax/card-RO", () => {
    //     login("retail-CRR", "password")
    //     cy.get(':nth-child(2) > .col-12 > .mt-4').click()
    //     cy.get('.nuxt-link-active > .el-menu-item > .menu-text').click()
    //     cy.get(':nth-child(2) > .form-group > a > .btn').click()
    //     cy.get('.box-add-product > .row > :nth-child(2) > .btn').click({ force: true })
    //     cy.get('#atp > .form-group > .form-control').type("11", { force: true })
    //     cy.get(':nth-child(1) > td > .btn').click({ force: true })
    //     cy.get('#addProductModal > .modal-dialog > .modal-content > .modal-header > .close > span').click()
    //     AddBuyCard2()
    //     DataCard()
    //     tax(getRandomArbitrary(1, 100000))
    //     cy.get(':nth-child(3) > .row > :nth-child(1) > .btn').click()
    //     cy.get(':nth-child(3) > .row > :nth-child(2) > .btn').click()
    //     cy.get('.el-switch__core').click()
    //     cy.get('.pt-3 > div > .btn').click()
    //     cy.get('.row > :nth-child(3) > .btn').click()
    //     cy.get('.swal2-confirm').click()
    //     cy.get('.el-link--inner').click()
    //     cy.get('#orders-1 > :nth-child(5) > .justify-content-center > .status-border')
    //         .should("contain.text", "รายการเสร็จสิ้น")
    //     cy.get('#orders-0 > :nth-child(1) > a').click()
    //     cy.get(':nth-child(3) > .status-border').should("contain.text", " รายการเสร็จสิ้น")
    // })
})


const tax = (textNo) => {
    cy.get('.col-sm-12.p-0 > :nth-child(2) > .row > :nth-child(1) > .form-control').clear()
    cy.get('.col-sm-12.p-0 > [style="background-color: rgb(243, 244, 246);"] > .form-row > .col-md-8 > .el-select > .el-input > .el-input__inner').click()
        .type("{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}")
    cy.get('.col-sm-12.p-0 > :nth-child(2) > .row > :nth-child(1) > .form-control')
        .type(textNo)
    cy.get('#products-0 > :nth-child(2) > .form-row > :nth-child(1) > .el-input > .el-input__inner')
        .click()

}

const login = (username, password) => {
    // exampleExpect()
    cy.get('#input_username').type(username)
    cy.get('#input_password').type(password)
    cy.get('.btn').click()
}
// // เช็คสินค้าที่มีเลขกำกับภาษีในระบบ
const AddBuyCard = () => {
    cy.get('.box-add-product > .row > :nth-child(2) > .btn').click()
    cy.get('#addProductModal > .modal-dialog > .modal-content > .modal-body > #myTab > :nth-child(2) > #profile-tab').click()
    cy.get('.mb-2 > :nth-child(1) > .el-autocomplete > .el-input > .el-input__inner')
        .type("ผ้าดิสเบรค").tab().type("{downarrow}{downarrow}{enter}")
    cy.get('.mt-3 > :nth-child(1) > .el-autocomplete > .el-input > .el-input__inner').type("BENDIX")
    cy.get('.form-group > .mt-2 > .el-input__inner').type("1111").tab()
    cy.get('.inline-input > .el-input__inner').type("1150").tab().type("{downarrow}{downarrow}{enter}")
    cy.get('.text-right > .btn-confirm').click()
}
// ราคาสินค้า
const DataCard = () => {
    const products = [
        {
            price: 300,
            qty: 2,
            percentage1: 10,
            percentage2: 10
        },
        // {
        //     price: 100,
        //     qty: 2,
        //     percentage1: 5,
        //     percentage2: 5,
        // }
    ]
    cy.get('#products-0 > :nth-child(2) > .form-row > :nth-child(1) > .el-input > .el-input__inner')
        .clear().type(products[0].qty)
    cy.get('#products-0 > [style="width: 200px;"] > :nth-child(1) > .text-left > .form-control')
        .clear().type(products[0].percentage1)
    cy.get('#products-0 > [style="width: 200px;"] > :nth-child(2) > .text-left > .form-control')
        .clear().type(products[0].percentage2)
    cy.get('#products-0 > [style="width: 150px;"] > .el-input > .el-input__inner')
        .clear().type(products[0].price)
    cy.get('.col-md-5').click({ force: true })

    let totalPrice = 0
    products.map(product => {
        totalPrice += product.qty * product.price
    })
    cy.get(':nth-child(1) > .row > .text-right > h5').should("contain.text", totalPrice)
}


const getLatestTaxNo = () => {
    login("retail-CRR", "password")
    cy.get(':nth-child(2) > .col-12 > .mt-4').click()
    cy.get('#orders-0 > :nth-child(1) > a').click()
    cy.get(':nth-child(1) > :nth-child(4) > .form-control').invoke('val')
        .then(sometext => {
            textNo = sometext
        });
}
// สินค้า PO
const AddBuyCard1 = () => {
    cy.get('.box-add-product > .row > :nth-child(1) > .btn').click()
    cy.get('#scanAddOrders > .modal-dialog > .modal-content > .modal-body > #myTab > :nth-child(2) > #profile-tab')
        .click()
    cy.get('#inventory > .form-group > .form-control').type("05")
    cy.get('#inventory > [style="overflow: auto;"] > .table > tbody > :nth-child(1) > td > .btn')
        .click()
    cy.get('#scanAddOrders > .modal-dialog > .modal-content > .modal-header > .close')
        .click()

        cy.get('.col-sm-12.p-0 > [style="background-color: rgb(243, 244, 246);"] > .form-row > .col-md-8 > .el-select > .el-input > .el-input__inner')
}

// สินค้า RO
const AddBuyCard2 = () => {
    cy.get('.box-add-product > .row > :nth-child(2) > .btn').click()
    cy.get('#addProductModal > .modal-dialog > .modal-content > .modal-body > #myTab > :nth-child(2) > #profile-tab')
        .click()
    cy.get('.mb-2 > :nth-child(1) > .el-autocomplete > .el-input > .el-input__inner')
        .type("ผ้าดิสเบรค").tab().type("{downarrow}{downarrow}{enter}")
    cy.get('.mt-3 > :nth-child(1) > .el-autocomplete > .el-input > .el-input__inner').type("BENDIX")
    cy.get('.form-group > .mt-2 > .el-input__inner').type("1111").tab()
    cy.get('.inline-input > .el-input__inner').type("1150").tab().type("{downarrow}{downarrow}{enter}")
    cy.get('.text-right > .btn-confirm').click()
}

const getRandomArbitrary = (min, max) => {
    1, 100000
    return Math.random() * (max - min) + min;
}