function get_element_li (name, price) {
    return `<li class="added-item">name: ${name} price:<span class="item-price"> ${price}</span>   <button class="remove-item">remove</button></li>`
  }

let total = 0;

function Recalculate () {
    console.log("Calculating total...");
    total = 0;
    let List = document.getElementById("List");
    let items = List.getElementsByClassName("added-item")
    for (var i = 0; i < items.length; i++) {
        let price = items[i].getElementsByClassName("item-price")[0];
        let priceVal = Number(price.innerHTML);
        total += priceVal;
    }
    document.getElementById("total").innerHTML = `Total: ${total}`;
}

let add_item_to_list_with_template = () => {
    return (event) => {
        console.log("The item is being added");
        let itemName = document.querySelector("#item-name").value.trim();
        console.log(itemName);
        let itemValue = document.querySelector("#item-value").value.trim();
        let liVal = get_element_li(itemName, itemValue);
        total += Number(itemValue);
        document.getElementById("total").innerHTML = `Total: ${total}`;
        let list = document.getElementById("List");
        let element = document.createElement("li");
        element.innerHTML = liVal;
        list.append(element);
        
        // add event listener to the button inside the element just added with the remove_item function
        let bttn = element.getElementsByClassName("remove-item")[0];
        bttn.addEventListener("click", remove_item());
        //addToTotal();
    }
}
  
  document.getElementById("add-item").addEventListener("click", add_item_to_list_with_template());
  /*
   for removing elements could be this way
    let element_to_delete = document.querySelector("selector").lastElementChild;
    element_to_delete.parentNode.removeChild(element_to_delete);
    or we could use ChildNode.remove()
    https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
  */
  
  let remove_item  = (/*node_to_remove*/) => {
    return (event)=>{
        let node_to_remove = event.target;
        node_to_remove.parentNode.parentNode.remove();
        Recalculate();
    }
  }