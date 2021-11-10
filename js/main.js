function getEle(id) {
    return document.getElementById(id);
}


var getData = new ThemSanPham();
var validation = new Validation();
function fletchData() {
    getData.getListProduct()
        .then(function (rs) {
            console.log(rs.data);
            taoBang(rs.data);
        })
        .catch(function (error) {
            console.log(error)
        })


};
fletchData();
function taoBang(list) {
    var inb = "";
    list.forEach((item, index) => {
        inb += `
       <tr> 
       <td>${index + 1} </td>
       <td>${item.name} </td>
       <td>${item.prize} </td>
       <td><img src="./../img/${item.img}.jpg "width = "100" />
       </td>
       <td>${item.about} </td>
       <td>${item.nd} </td>
       <td>${item.language} </td>
       <td><button class="btn btn-success" data-toggle="modal" data-target="#exampleModal"  onclick="editProduct(${item.id})">Sửa sản phầm</button></td>
       <td><button class="btn btn-danger"   onclick="deleteProduct(${item.id})">Xóa</button></td>
       </tr>`
    });
    getEle("tblDanhSachSP").innerHTML = inb;
}
function checking(isAdd) {
    var name = getEle("ten").value;
    var prize = getEle("gia").value;
    var img = getEle("hinhAnh").value;
    var about = getEle("moTa").value;
    var nd = getEle("loaiNd").value;
    var language = getEle("ngonNgu").value;
    var isValid = true;

    if (isAdd) {
        isValid &= validation.check(name, "tenErr", "* vui lòng nhập tên sản phẩm")

        isValid &= validation.check(prize, "giaErr", "* Vui lòng nhập giá sản phẩm")
        isValid &= validation.check(img, "hinhAnhErr", "* Vui lòng nhập hình ảnh")

        isValid &= validation.check(about, "moTaErr", "* Vui lòng nhập mô tả")

        isValid &= validation.check(nd, "loaiErr", "* vui lòng nhập loại sp")
        isValid &= validation.check(language, "ngonNguErr", "* vui lòng nhập ngôn ngữ")

    }
    if (isValid) {

        var sanPham = new SanPham("", name, prize, img, about, nd, language)
        return sanPham
    }
    return null
}

function themSP() {
    var sanPham = checking(true)
    if (sanPham !== null) {
        getData.addProduct(sanPham)
            .then(function (rs) {
                console.log(rs.data);
                fletchData();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

}
function deleteProduct(id) {

    getData.deleteProduct(id)
        .then(function () {


            fletchData()

        })
        .catch(function (error) {
            console.log(error);
        })

}
function editProduct(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "sửa sản phẩm"
    var footer = `<button class = "btn btn-success" onclick = "updateProduct(${id})" > Câp nhật sản phẩm </button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    getData.getProductById(id)
        .then(function (rs) {
            // show thông tin từ thẻ input lên modal
            getEle("ten").value= rs.data.name;
            getEle("gia").value= rs.data.prize;
            getEle("hinhAnh").value= rs.data.img;
            getEle("moTa").value= rs.data.about;
            getEle("loaiNd").value= rs.data.nd;
            getEle("ngonNgu").value= rs.data.language;
           

        })
        .catch(function (error) {
            console.log(error);
        })
}
function updateProduct(id) {
    var name = getEle("ten").value;
    var prize = getEle("gia").value;
    var img = getEle("hinhAnh").value;
    var about = getEle("moTa").value;
    var nd = getEle("loaiNd").value;
    var language = getEle("ngonNgu").value;
    var sanPham = new SanPham(id, name, prize, img, about, nd, language)
    getData.updateProductApi(sanPham)
        .then(function () {
            alert("cập nhật thành công")
            fletchData();
        })
        .catch(function (error) {
            alert("that bais")
            console.log(error);
        })
}


