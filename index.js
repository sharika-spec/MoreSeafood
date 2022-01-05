// tag not equal to name incase in future name can be
// changed to tamil and english names localStorage function will not damage
let products = [{
    name: 'seerfish',
    tag: 'seerfish',
    price: '100',
    inCart: 0
  },
  {
    name: 'prawns',
    tag: 'prawns',
    price: '200',
    inCart: 0
  },
  {
    name: 'crabs',
    tag: 'crabs',
    price: '300',
    inCart: 0
  },
  {
    name: 'seabass',
    tag: 'seabass',
    price: '400',
    inCart: 0
  },
  {
    name: 'sardines',
    tag: 'sardines',
    price: '500',
    inCart: 0
  },
  {
    name: 'pomfret',
    tag: 'pomfret',
    price: '600',
    inCart: 0
  },
]
let seafood = ["seerfish", "prawns", "crabs", "seabass", "sardines", "pomfret"]
let addSeafood = ".seerfish-add,.prawns-add,.crabs-add,.seabass-add,.sardines-add,.pomfret-add"
let minusSeafood = ".seerfish-minus,.prawns-minus,.crabs-minus,.seabass-minus,.sardines-minus,.pomfret-minus"
var items_to_checkout = []
var no_of_items = 0

//when addcart button is clicked
$(".btn-addcart").click(function() {

  var lengthOfclassName = this.className.split(" ").length - 1;
  var itemSelected = this.className.split(" ")[lengthOfclassName];
  $("." + itemSelected).addClass("hide-addcart");
  $("." + itemSelected + "-show-action").removeClass("hide-addcart");
  items_to_checkout.push(itemSelected);
  for (let i = 0; i < seafood.length; i++) {
    if (seafood[i] == itemSelected) {
      cartItems(products[i]);
    }
  }
});

//when plus button is clicked
$(addSeafood).click(function() {
  var itemSelected = this.className.split(" ")[0].split("-")[0];
  items_to_checkout.push(itemSelected);
  add_no_of_items = parseInt($("." + itemSelected + "-number").text()) + 1;
  setTimeout(function() {
    $("." + itemSelected + "-number").text(add_no_of_items)
  }, 100);

  //TODO: dialog box
  if (add_no_of_items == 9) {
    alert("r u sure?");
  }
});

//when minus button is clicked
$(minusSeafood).click(function() {
  var itemSelected = this.className.split(" ")[0].split("-")[0];
  items_to_checkout = items_to_checkout.filter(e => e !== itemSelected);
  sub_no_of_items = parseInt($("." + itemSelected + "-number").text()) - 1;
  if (sub_no_of_items == 0) {
    $("." + itemSelected).removeClass("hide-addcart");
    $("." + itemSelected + "-show-action").addClass("hide-addcart");
  } else {
    $("." + itemSelected + "-number").text(sub_no_of_items);
  }
});

function cartItems(product) {
  // var obj = new Object();
  // for(var i=0;i<items_to_checkout.length;i++)
  // {
  // obj.quantity=1;
  // obj.itemName=items_to_checkout[i];
  // }
  // let string = JSON.stringify(obj);
  //convert string to Json Object
  // console.log(JSON.parse(string));
  console.log(product)
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
  } else {
    localStorage.setItem('cartNumbers', 1);
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  // console.log("carti",cartItems)

  // for nth time
  if (cartItems != null) {

    // if the new product(compared with first product) added in next time
    if (cartItems[product.tag] == undefined) {
      // console.log("carti",product.tag)
      //... refers to existing items
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  }
  // for the first time
  else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
