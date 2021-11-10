function ThemSanPham (){
    this.getListProduct=function(){
        return axios({
            url: "https://61812d968bfae60017adfe8b.mockapi.io/product",
            method: "GET"
        })
    }
    this.addProduct=function(product) {
        return axios({
            url: "https://61812d968bfae60017adfe8b.mockapi.io/product",
            method: "POST",
            data: product
        })
    }
    this.deleteProduct=function(id){
        return axios({
            url:`https://61812d968bfae60017adfe8b.mockapi.io/product/${id}`,
            method:"DELETE"
        })
    }
    this.getProductById  = function(id){
        return axios({
            url: `https://61812d968bfae60017adfe8b.mockapi.io/product/${id}`,
            method: "GET"
        })
    
    }
    this.updateProductApi=function(product){
        return axios({
            url: `https://61812d968bfae60017adfe8b.mockapi.io/product/${product.id}`,
            method: "PUT",
            data: product
        })
    }
}
