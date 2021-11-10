function Validation(){
    this.check = function(type, id, text){
        if(type.trim()=== ""){
            getEle(id).innerHTML = text;
            getEle(id).className = "alert alert-danger"
            return false;
        }else{
            getEle(id).innerHTML = "";
            getEle(id).className = ""
            return true
        }
    }
}