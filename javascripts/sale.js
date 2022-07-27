const identifyElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

const products=[
  {id:"1",name:"Mélange original 200g",price:500},
  {id:"2",name:"Mélange original 500g",price:900},
  {id:"3",name:"Mélange spécial 200g",price:700},
  {id:"4",name:"Mélange spécial 500g",price:1200}
];


function add() {
  const identify = parseInt(identifyElement.value);
  const number = parseInt(numberElement.value);
  let ID = identify - 1
  let purchase = {
    tarif : products[ID].price ,
    number: parseInt(number),
    article: products[ID].name,
  };
  
  const newPurchase = purchases.findIndex((item) => item.tarif === purchase.tarif) 
  if(purchases.length < 1 || newPurchase === -1) { 
    purchases.push(purchase);
  } else {
    purchases[newPurchase].number += purchase.number; 
  }
  window.alert(`${display()}\n小計${subtotal()}円`);
  identifyElement.value = "";
  numberElement.value = "";
}

function display() {
  return purchases.map(purchase => {
    return `${purchase.article} ${purchase.tarif} 円が:${purchase.number}点`
  }).join("\n");
};

function subtotal() {
  return purchases.reduce((prev, purchase) => {
    return prev + purchase.tarif * purchase.number 
  }, 0);
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`${display()}\n小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
  purchases = [];
  identifyElement.value= "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000){
   return 500;
  } else {
   return 250;
  }
}