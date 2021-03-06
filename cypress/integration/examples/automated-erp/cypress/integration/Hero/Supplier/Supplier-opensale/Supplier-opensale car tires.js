
/// <reference types="cypress" />


context("Open-Sale", () => {
    beforeEach(() => {
        cy.visit("https://herodemo.autopair.co/")
    })
    //เปิดรายการขาย

    it("Open-Sale car tires", () => {
        loginsupplier("grip-member1", "password")
        Opensale()

        //รายละเอียดของสินค้า
        Detail1()
        Detail2()

        // Detail3()

        //ค้นหาสินค้า
        searchdetail1()


        //เช็ครายละเอียดสินค้ากรณีกรอกรายละเอียดครบ 3 ช่อง
        //checkdetailproducts()

        //เลือกสินค้า
        Selectproduct()

        //กรอกรายละเอียดหลังจากเลือกสินค้าแล้ว
        detailopensale()

        // เปิดรายการขาย
        supplieropenorder()

        // เช็ครายการขายที่พึ่งเปิด
        checksupplieropenorder()

        // ออกจากระบบ
        logout()
    })
    // workshop รับรายการ
    it("workshop receive ", () => {

        loginWorkshop("empGrip01", "password")

        // // รับรายการยางรถยนต์ แบบทั้งหมด
        // receiveSale()
        // checkreceive()

        // รับรายการยางรถยนต์ แบบบางชิ้น
        receiveSale1()
        checkreceive1()

    })
})


const loginsupplier = (username, password) => {
    cy.get('.my-4 > .text-left > span').should("contain.text", "ชื่อผู้ใช้งาน")
    cy.get('#username').type(username)
    cy.get('.mb-3 > .text-left > span').should("contain.text", "รหัสผ่าน")
    cy.get('#password').type(password)
    cy.get('.btn-global').click()
}

const Opensale = () => {
    cy.get(':nth-child(1) > .nav-link > .row > h6').click()
    cy.get('a > .el-button > span').should("contain.text", "เพิ่มรายการขาย")
    cy.get('a > .el-button > span').click()
    cy.get('.primary-blue').should("contain.text", "ลูกค้า")
    cy.get('.col-xl-4 > .el-select > .el-input > .el-input__inner')
        .click().type("{downarrow}{downarrow}{downarrow}{enter}")
}
// สินค้าช้นที่ 1 ยางรถยนต์
const Detail1 = () => {
    cy.get('.col-xl-6 > .btn').click()
    cy.get('#tab-0').should("contain.text", "ยางรถยนต์")
    cy.get('#tab-1').should("contain.text", "อะไหล่")
    cy.get('#tab-2').should("contain.text", "ล้อแม็กซ์")
    cy.get('.mt-2 > #searchWidth > .bv-no-focus-ring > label').should("contain.text", "หน้ากว้าง")
    cy.get('#searchWidth > .bv-no-focus-ring > .el-select > .el-input > .el-input__inner')
        .click().type("{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}", { force: true })

}

const Detail2 = () => {
    cy.get('.mt-2 > #searchSeries > .bv-no-focus-ring > label').should("contain.text", "ซีรี่ย์")
    cy.get('#searchSeries > .bv-no-focus-ring > .el-select > .el-input > .el-input__inner')
        .click().type("65").type("{downarrow}{downarrow}{enter}")
}

const Detail3 = () => {
    cy.get('.col-6 > .btn').click()
    cy.get('.mt-2 > #searchRimSize > .bv-no-focus-ring > label').should("contain.text", "ขอบ")
    cy.get('#searchRimSize > .bv-no-focus-ring > .el-select > .el-input > .el-input__inner')
        .click().type("{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}", { force: true })
}

const searchdetail1 = () => {
    cy.get('.mt-4 > :nth-child(1) > .btn-search').should("contain.text", "ค้นหา")
    cy.get('.mt-4 > :nth-child(1) > .btn-search').click()

}

const searchdetail2 = () => {
    cy.get(':nth-child(2) > .btn-search').should("contain.text", "ค้นหา")
    cy.get(':nth-child(2) > .btn-search').click()

}

const checkdetailproducts = () => {
    cy.get('#pane-0 > .table-responsive > .table > thead > tr > :nth-child(1)')
        .should("contain.text", "สินค้า")
    cy.get('#pane-0 > .table-responsive > .table > tbody > tr > .text-left')
        .should("contain.text", "QWE123", "DUNLOB")

    cy.get('#pane-0 > .table-responsive > .table > thead > tr > :nth-child(2)')
        .should("contain.text", "รายละเอียด")
    cy.get('#pane-0 > .table-responsive > .table > tbody > tr > :nth-child(2)')
        .should("contain.text", "ยางรีดน้ำ")

    cy.get('#pane-0 > .table-responsive > .table > thead > tr > :nth-child(3)')
        .should("contain.text", "หน่วย")
    cy.get('#pane-0 > .table-responsive > .table > tbody > tr > :nth-child(3)')
        .should("contain.text", "ชิ้น")
}

const Selectproduct = () => {
    cy.get('#pane-0 > .d-xl-block > .table > thead > tr > [style="width: 200px;"]').click()
    cy.get('#pane-0 > .d-xl-block > .table > thead > tr > [style="width: 200px;"]').click()
    cy.get('.d-xl-block > .table > tbody > tr > :nth-child(5) > .btn-details').click({ force: true })
    cy.get('.close').click()
}

// ตรวจเช็คสินค้าที่เลือกแบบรวมภาษี 7%
const detailopensale = () => {
    cy.get('.col-12.mt-2 > .table > thead > tr > :nth-child(2)').should("contain.text", "รายการ")
    cy.get('.col-12.mt-2 > .table > tbody > tr > :nth-child(2) > :nth-child(1)')
        .should("contain.text", "195 / 65 R 15")
    cy.get('.col-12.mt-2 > .table > tbody > tr > :nth-child(2) > :nth-child(3)')
        .should("contain.text", "NANO ENERGY 3")
    cy.get('.col-12.mt-2 > .table > tbody > tr > :nth-child(2) > :nth-child(5)')
        .should("contain.text", "TOYO")
    cy.get('.col-12.mt-2 > .table > thead > tr > :nth-child(4)').should("contain.text", "จำนวน")
    cy.get(':nth-child(1) > :nth-child(4) > .form-check > .form-control').clear().type("2")
    cy.get('.col-12.mt-2 > .table > thead > tr > :nth-child(5)').should("contain.text", "ราคาต่อหน่วย")
    cy.get('.col-12.mt-2 > .table > tbody > tr > :nth-child(5)').should("contain.text", "2,650.00")
    cy.get('.col-12.mt-2 > .table > thead > tr > :nth-child(6)').should("contain.text", "ราคารวม")
    cy.get('.col-12.mt-2 > .table > tbody > tr > :nth-child(6)').should("contain.text", "5,300.00")
    cy.get('tfoot > :nth-child(1) > .text-right').should("contain.text", "5,300.00")
    cy.get(':nth-child(4) > [colspan="2"]').should("contain.text", "ยอดรวมสินค้าสุทธิ (VAT)")
    cy.get(':nth-child(4) > .text-right').should("contain.text", "5,671.00 บาท")

    // ตรวจเช็คสินค้าที่เลือกแบบไม่รวมภาษี 7%
    cy.get('.pl-0.d-xl-block > .table > tfoot > :nth-child(3) > .text-right > .el-switch > .el-switch__core')
        .click()
    cy.get(':nth-child(3) > [colspan="2"]').should("contain.text", "ภาษีมูลค่าเพิ่ม (VAT)")
    cy.get(':nth-child(4) > [colspan="2"]').should("contain.text", "ยอดรวมสินค้าสุทธิ")
    cy.get(':nth-child(4) > .text-right').should("contain.text", "5,300.00 บาท")
}

// เปิดรายการขายแบบบวกภาษีเพิ่ม
const supplieropenorder = () => {
    cy.get('.pl-0.d-xl-block > .table > tfoot > :nth-child(3) > .text-right > .el-switch > .el-switch__core')
        .click()
    cy.get('.el-textarea__inner').type("ด่วน")
    cy.get('.d-xl-flex > :nth-child(2) > .btn').click()
    cy.get('#swal2-title').should("contain.text", "สำเร็จ")
    cy.get('#swal2-content').should("contain.text", "สถานะรอรับสินค้า")
    cy.get('.swal2-confirm').should("contain.text", "OK")
    cy.get('.swal2-confirm').click()
}

// เช็ครายการสินค้าที่พึ่งเปิด
const checksupplieropenorder = () => {
    cy.get('.CardheadTitle > h3').should("contain.text", "รายการขาย")
    cy.get(':nth-child(1) > :nth-child(1) > a > .primary-blue').click()
    cy.get('.status-border').should("contain.text", "รอรับสินค้า")
    cy.get('.col-sm-12 > .font-weight-bold').should("contain.text", "รายละเอียดการขาย")
    cy.get('.table-order-wrappe > .table > thead > tr > :nth-child(1)').should("contain.text", "รายการ")
    cy.get('.table-order-wrappe > .table > tbody > :nth-child(1) > .text-left > .primary-blue')
        .should("contain.text", "195 / 65 R 15")
    cy.get('.table-order-wrappe > .table > tbody > :nth-child(1) > .text-left > :nth-child(3)')
        .should("contain.text", "NANO ENERGY 3")
    cy.get('.table-order-wrappe > .table > tbody > :nth-child(1) > .text-left > :nth-child(5)')
        .should("contain.text", "TOYO")
    cy.get('.table-order-wrappe > .table > thead > tr > :nth-child(5)')
        .should("contain.text", "สถานะ")
    cy.get(':nth-child(1) > :nth-child(5) > .secondary-blue')
        .should("contain.text", "ยืนยันการส่ง")
    cy.get('.table-order-wrappe > .table > thead > tr > :nth-child(4)')
        .should("contain.text", "ราคารวม")
    cy.get('.table-order-wrappe > .table > tbody > :nth-child(1) > :nth-child(4)')
        .should("contain.text", "5,300.00")
    cy.get('.table-order-wrappe > .table > tbody > :nth-child(4) > .secondary-blue')
        .should("contain.text", "ภาษีมูลค่าเพิ่ม (VAT)")
    cy.get('.table-order-wrappe > .table > tbody > :nth-child(4) > :nth-child(3)')
        .should("contain.text", "371.00 บาท")
    cy.get('.table-order-wrappe > .table > tbody > :nth-child(5) > .secondary-blue')
        .should("contain.text", "ยอดรวมสุทธิ (VAT)")
    cy.get('.ml-auto > .nuxt-link-active > .btn')
        .should("contain.text", "กลับ")
    cy.get('.ml-auto > .nuxt-link-active > .btn')
        .click()
}



// ออกจากระบบ

const logout = () => {
    cy.get('#dropdownMenuOffset').click()
    cy.get('.btn-group > .dropdown-menu > :nth-child(2)').click()
}

// workshop รับรายการยางรถยนต์ แบบทั้งหมด
const loginWorkshop = (username, password) => {
    cy.get('.my-4 > .text-left > span').should("contain.text", "ชื่อผู้ใช้งาน")
    cy.get('#username').type(username)
    cy.get('.mb-3 > .text-left > span').should("contain.text", "รหัสผ่าน")
    cy.get('#password').type(password)
    cy.get('.btn-global').click()
}
// รับสินค้าทั้งหมด
const receiveSale = () => {
    cy.get('.CardheadTitle > h3').should("contain.text", "รายการซื้อ")
    cy.get('thead > tr > :nth-child(1)').should("contain.text", "เลขที่รายการซื้อ")
    cy.get(':nth-child(1) > :nth-child(5) > .status-border').should("contain.text", "รอรับสินค้า")
    cy.get(':nth-child(1) > :nth-child(1) > a > .primary-blue').click()

    // ตรวจเช็ครายการสินค้า
    cy.get('.table-order-wrapper.d-none > .table > thead > tr > :nth-child(2)')
        .should("contain.text", "รายการ")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > .primary-blue')
        .should("contain.text", "195 / 65 R 15")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(3)')
        .should("contain.text", "NANO ENERGY 3")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(5)')
        .should("contain.text", "TOYO")

    // กรอกจำนวนและ dot ที่รับสินค้า
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > :nth-child(4) > .row > :nth-child(1) > input')
        .clear().type("2")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > :nth-child(4) > .row > :nth-child(2) > input')
        .clear().type("1903")

    // ตรวจเช็ค ราคาสินค้า
    cy.get('.table-order-wrapper.d-none > .table > thead > tr > :nth-child(5)')
        .should("contain.text", "ราคา")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > :nth-child(5)')
        .should("contain.text", "2,650.00")
    cy.get('.table-order-wrapper.d-none > .table > thead > tr > :nth-child(6)')
        .should("contain.text", "ราคารวม")
    cy.get('tbody > :nth-child(1) > :nth-child(6)')
        .should("contain.text", "5,300.00")

    // ราคาภาษีมูลค่าเพิ่ม
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(4) > .secondary-blue')
        .should("contain.text", "ภาษีมูลค่าเพิ่ม (VAT)")
    cy.get(':nth-child(4) > [colspan="2"]')
        .should("contain.text", "371.00 บาท")

    // บันทึกรับรายการขาย
    cy.get('.d-xl-flex > :nth-child(2) > .btn').click()
    cy.get('#swal2-title').should("contain.text", "ยืนยันการทำรายการ ?")
    cy.get('#swal2-content').should("contain.text", "การกระทำนี้จะไม่สามารถเปลี่ยนแปลงได้")
    // cy.get('.swal2-confirm').should("contain.text", "ใช่")
    cy.get('.swal2-confirm').click()

    cy.get('#swal2-title').should("contain.text", "สำเร็จ")
    cy.get('#swal2-content').should("contain.text", "บันทึกรายการสำเร็จ")
    cy.get('.swal2-confirm').should("contain.text", "OK")
    cy.get('.swal2-confirm').click()
}

// เช็คสถานะ
const checkreceive = () => {
    cy.get('.status-border').should("contain.text", "รายการเสร็จสิ้น")
    cy.get('.table-order-wrapper.d-none > .table > thead > tr > :nth-child(1)')
        .should("contain.text", "รายการ")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > .primary-blue')
        .should("contain.text", "195 / 65 R 15")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(3)')
        .should("contain.text", "NANO ENERGY 3")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(5)')
        .should("contain.text", "TOYO")
    cy.get('.table-order-wrapper.d-none > .table > thead > tr > [style="width: 200px;"]')
        .should("contain.text", "สถานะ")
    cy.get(':nth-child(6) > .secondary-blue').should("contain.text", "ยืนยันการส่ง")
}

const receiveSale1 = () => {
    cy.get('.CardheadTitle > h3').should("contain.text", "รายการซื้อ")
    cy.get('thead > tr > :nth-child(1)').should("contain.text", "เลขที่รายการซื้อ")
    cy.get(':nth-child(1) > :nth-child(5) > .status-border').should("contain.text", "รอรับสินค้า")
    cy.get(':nth-child(1) > :nth-child(1) > a > .primary-blue').click()

    // ตรวจเช็ครายการสินค้า
    cy.get('.table-order-wrapper.d-none > .table > thead > tr > :nth-child(2)')
        .should("contain.text", "รายการ")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > .primary-blue')
        .should("contain.text", "195 / 65 R 15")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(3)')
        .should("contain.text", "NANO ENERGY 3")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(5)')
        .should("contain.text", "TOYO")

    // กรอกจำนวนและ dot ที่รับสินค้า
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > :nth-child(4) > .row > :nth-child(1) > input')
        .clear().type("1")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > :nth-child(4) > .row > :nth-child(2) > input')
        .clear().type("1903")

    // ตรวจเช็ค ราคาสินค้า
    cy.get('.table-order-wrapper.d-none > .table > thead > tr > :nth-child(5)')
        .should("contain.text", "ราคา")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > :nth-child(5)')
        .should("contain.text", "2,650.00")
    cy.get('.table-order-wrapper.d-none > .table > thead > tr > :nth-child(6)')
        .should("contain.text", "ราคารวม")
    cy.get('tbody > :nth-child(1) > :nth-child(6)')
        .should("contain.text", "5,300.00")

    // ราคาภาษีมูลค่าเพิ่ม
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(4) > .secondary-blue')
        .should("contain.text", "ภาษีมูลค่าเพิ่ม (VAT)")
    cy.get(':nth-child(4) > [colspan="2"]')
        .should("contain.text", "371.00 บาท")

    // บันทึกรับรายการขาย
    cy.get('.d-xl-flex > :nth-child(2) > .btn').click()
    cy.get('#swal2-title').should("contain.text", "ยืนยันการทำรายการ ?")
    cy.get('#swal2-content').should("contain.text", "การกระทำนี้จะไม่สามารถเปลี่ยนแปลงได้")
    // cy.get('.swal2-confirm').should("contain.text", "ใช่")
    cy.get('.swal2-confirm').click()

    cy.get('#swal2-title').should("contain.text", "สำเร็จ")
    cy.get('#swal2-content').should("contain.text", "บันทึกรายการสำเร็จ")
    cy.get('.swal2-confirm').should("contain.text", "OK")
    cy.get('.swal2-confirm').click()
}

const checkreceive1 = () => {
    cy.get('.status-border').should("contain.text", "รับสินค้าบางส่วน")
    cy.get('.table-order-wrapper.d-none > .table > thead > tr > :nth-child(2)')
        .should("contain.text", "รายการ")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > .primary-blue')
        .should("contain.text", "195 / 65 R 15")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(3)')
        .should("contain.text", "NANO ENERGY 3")
    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > :nth-child(5)')
        .should("contain.text", "TOYO")
    // cy.get(':nth-child(5) > [colspan="4"]').click()
    cy.get('.ml-auto > .nuxt-link-active > .btn').click({ force: true })
}