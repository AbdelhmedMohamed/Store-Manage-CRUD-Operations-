
var productNameInput = document.getElementById('productNameInput') ;
var productpriceInput = document.getElementById('productpriceInput') ;
var productcategoryInput = document.getElementById('productcategoryInput') ;
var productDescInput = document.getElementById('productDescInput') ;


var tebleBody = document.getElementById('tebleBody') ;

var addBtn = document.getElementById('addBtn') ;
var updateBtn = document.getElementById('updateBtn') ;



var prodectContainer ;

if (localStorage.getItem('myProdect')!=null) {
    prodectContainer =JSON.parse(localStorage.getItem('myProdect')) ;
    disPlayProducts(prodectContainer) ;
} else {
    prodectContainer = [] ;
}


//============================================


function addproduct(){
  if(validateProduct(productNameInput.value)){

    var product = {
        productName : productNameInput.value ,
        productprice : productpriceInput.value ,
        productcategory : productcategoryInput.value ,
        productDesc : productDescInput.value ,

    }

    prodectContainer.push(product) ;
    
    localStorage.setItem('myProdect',JSON.stringify(prodectContainer))


    clearForm() ;

    disPlayProducts(prodectContainer)

  }else{
    alert('product Name Invalid Please enter the first letter as a capital and the rest as a small (the number must not be less than 4 letters or numbers and not more than 16)')
  }

}

//=============================================


 function clearForm(){
    productNameInput.value = '' ;
    productpriceInput.value = '' ;
    productcategoryInput.value= '' ;
    productDescInput.value = '' ;
 }

//==============================================

 function disPlayProducts(arr){
    var cartoona = `` ;
    var  disPlayindex = i+1 ;
    for(var i=0;i<arr.length ; i++){
        disPlayindex = i+1 ;
        cartoona += `

        <tr>

        <td>${disPlayindex}</td>
        <td>${arr[i].productName}</td>
        <td>${arr[i].productprice}</td>
        <td>${arr[i].productcategory}</td>
        <td>${arr[i].productDesc}</td>
        <td><button onclick="setFormForUpdate(${i})" class="btn btn-warning btn-sm">Ubdata</button></td>
        <td><button onclick="deletProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
       
       </tr>`

    }

tebleBody.innerHTML = cartoona


 }

//=============================================

 function searchProducts (searchTerm){
var searchResult =[] ;
for (let i = 0; i <prodectContainer.length; i++) {
if(prodectContainer[i].productName.toLowerCase().includes(searchTerm.toLowerCase())){
    searchResult.push(prodectContainer[i])
} ;
    
}
console.log(searchResult)
disPlayProducts(searchResult) ;

 }

//============================================


function deletProduct (deleteIndex){
    prodectContainer.splice(deleteIndex ,1) ;
    console.log(prodectContainer) ;
    localStorage.setItem('myProdect' , JSON.stringify(prodectContainer)) ;

    disPlayProducts(prodectContainer)
} 


//=============================================
var index ;

function setFormForUpdate(updateIndex){
    productNameInput.value=prodectContainer[updateIndex].productName ;
    productpriceInput.value=prodectContainer[updateIndex].productprice ;
    productcategoryInput.value=prodectContainer[updateIndex].productcategory ;
    productDescInput.value=prodectContainer[updateIndex].productDesc ;

  addBtn.classList.add('d-none') ;
  updateBtn.classList.replace('d-none' , 'd-block') ;
 
   index = updateIndex ;

}

function upDataProduct(){
    var product = {
        productName : productNameInput.value ,
        productprice : productpriceInput.value ,
        productcategory : productcategoryInput.value ,
        productDesc : productDescInput.value ,

    }

    prodectContainer.splice(index, 1 ,product) ;
    
    localStorage.setItem('myProdect',JSON.stringify(prodectContainer)) ;

    clearForm() ;
 
    updateBtn.classList.add('d-none') ;
    addBtn.classList.replace('d-none' , 'd-block') ;
   

    disPlayProducts(prodectContainer)
}



//================================================

function validateProduct(name){
    var regex = /^[A-Z]{1}[a-z]{3,10}\s?\S{0,5}$/ ;
    if(regex.test(name)){
        productNameInput.classList.replace('is-invalid' ,'is-valid')
        return true 
    }else{
        productNameInput.classList.add('is-invalid') 
        return false
    }

}