/// <reference types="cypress" />

Cypress.config('defaultCommandTimeout', 100000)

context("Warehouse", () => {
    beforeEach(() => {
        cy.visit("https://hero.autopair.co/")
    })
    it("Car tiees", () => {
        loginWorkshop("empGrip01", "password")
        Cartiees()
        Cartiees1()
        confimeCartiees()
    })
})


const loginWorkshop = (username, password) => {
    cy.get('.my-4 > .text-left > span').should("contain.text", "ชื่อผู้ใช้งาน")
    cy.get('#username').type(username)
    cy.get('.mb-3 > .text-left > span').should("contain.text", "รหัสผ่าน")
    cy.get('#password').type(password)
    cy.get('.btn-global').click()
}

// รายละเอียดสินค้า
const Cartiees = () => {
    cy.get('.CardheadTitle > h3').should("contain.text", "รายการซื้อ")
    cy.get(':nth-child(6) > .nav-link > .row > h6').click()
    cy.get('h3').should("contain.text", "คลังสินค้า")
    cy.get('#tab-TIRE').should("contain.text", "ยางรถยนต์")
    cy.get('#tab-TIRE').click()
    cy.get('.row.mt-4 > .text-xl-right > .btn-confirm').click()
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .el-steps > [style="flex-basis: 50%; margin-right: 0px;"] > .el-step__main > .el-step__title')
        .should("contain.text", "รายละเอียดสินค้า")
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > .row > .col-sm-6 > h5')
        .should("contain.text", "รายละเอียดสินค้า")
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > .mt-3 > :nth-child(1) > .primary-blue')
        .should("contain.text", "รหัสสินค้า")
    taxCartiees(getRandomNumberCartiees(0, 10))
    taxCartiees1(getRandomNumberCartiees(0, 10))
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > :nth-child(3) > :nth-child(1) > .primary-blue')
        .should("contain.text", "Tag")
    taxCartiees2(getRandomNumberCartiees(0, 10))
    taxCartiees3(getRandomNumberCartiees(0, 10))
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > .form-group.mt-2 > .primary-blue')
        .should("contain.text", "รายละเอียดเพิ่มเติม")
    taxCartiees4(getRandomNumberCartiees(0, 10))

    cy.get(':nth-child(5) > :nth-child(1) > .el-select > .el-input > .el-input__inner')
        .click().type("{downarrow}{downarrow}{enter}")
    cy.get(':nth-child(5) > :nth-child(2) > .el-select > .el-input > .el-input__inner')
        .click().type("{downarrow}{downarrow}{enter}")
    cy.get(':nth-child(5) > .pr-0 > .el-select')
        .click().type("{downarrow}{downarrow}{enter}")
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .col-sm-12 > .btn-search')
        .should("contain.text", "ถัดไป")
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .col-sm-12 > .btn-search')
        .click()
}

const getRandomNumberCartiees = (min, max) => {
    0, 0
    return Math.random() * (max - min) + min;
}
const taxCartiees = (textNo) => {
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > .mt-3 > :nth-child(1) > .mt-2 > .el-input__inner')
        .type("test Cartiees").type(textNo)
}
const taxCartiees1 = (textNo) => {
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > .mt-3 > :nth-child(3) > .el-autocomplete > .el-input > .el-input__inner')
        .type("test").type(textNo)
}
const taxCartiees2 = (textNo) => {
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > :nth-child(3) > :nth-child(1) > .mt-2 > .el-input__inner')
        .type("test").type(textNo)
}
const taxCartiees3 = (textNo) => {
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > :nth-child(3) > :nth-child(2) > .mt-2 > .el-input__inner')
        .type("test").type(textNo)
}
const taxCartiees4 = (textNo) => {
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > .form-group.mt-2 > .el-textarea > .el-textarea__inner')
        .type("test").type(textNo)
}

// รายละเอียดราคา
const Cartiees1 = () => {
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .el-steps > [style="flex-basis: 50%; max-width: 50%;"] > .el-step__main > .el-step__title')
        .should("contain.text", "รายละเอียดราคา")
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > .row > .col-sm-6 > h5')
        .should("contain.text", "รายละเอียดราคา")
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > :nth-child(2) > :nth-child(2) > .mt-2 > .el-input__inner')
        .clear().type("100")
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .fromitem > :nth-child(2) > :nth-child(3) > .mt-2 > .el-input__inner')
        .clear().type("50")
    cy.get('.col-md-6 > .mt-2').clear().type("0319")
    cy.get(':nth-child(4) > .col-md-4 > .mt-2 > .el-input__inner').clear().type("50")
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .col-sm-12 > .btn-confirm').should("contain.text", "บันทึก")
    cy.get('#pane-TIRE > .col-xl-12 > .col-12 > .col-sm-12 > .btn-confirm').click()
}

// ยืนยันเพิ่มสินค้า
const confimeCartiees = () => {
    cy.get('#swal2-title').should("contain.text", "สำเร็จ")
    cy.get('#swal2-content').should("contain.text", "เพิ่มสินค้าเข้าคลังเสร็จสิ้น")
    cy.get('.swal2-confirm').should("contain.text", "OK")
    cy.get('.swal2-confirm').click()
    cy.get('#tab-TIRE').click()
}

for (let index = 1; index <= 15; index++) {
    console.log(index)
}