const CustomerHeads = ["CustomerName","CustomerBalance"]
const addCustomer = document.querySelector("#addCustomer")  //form   undife =>false
const addTransaction = document.querySelector("#addTransaction")  //form   undife =>false

const datawrap = document.querySelector("#datawrap")
const delAll = document.querySelector("#delAll")
const createMyOwnElement = (element) => {
    try {
        let myElement = document.createElement(element.element)
        element.parent.appendChild(myElement)
        if (element.textContent) myElement.innerHTML = element.textContent
        if (element.classes) myElement.classList = element.classes  // <option class> 
        element.attributes.forEach(attribute => {
            myElement.setAttribute(attribute.key, attribute.val)
        })
        return myElement
    }
    catch (e) {
        console.log(e)
    }
}
const elementObjCreator = (element, parent, textContent, classes, attributes) => {
    return { element, parent, textContent, classes, attributes }
}
const readFromStorage = (storageItem) => {
    let data
    try {
        data = JSON.parse(localStorage.getItem(storageItem))
        if (!Array.isArray(data)) throw new Error("Data not array")
    }
    catch (e) {
        data = []
    }
    return data
}
//write data in localstorage
const writeDataToStorage = (storageItem, data) => {
    localStorage.setItem(storageItem, JSON.stringify(data))
}
// draw Customer
const drawCustomer = (Customer,index) => {
    const tr = createMyOwnElement(elementObjCreator("tr", datawrap, null, null, []))
    createMyOwnElement(elementObjCreator("td", tr, Customer.accNum, null, []))
    createMyOwnElement(elementObjCreator("td", tr, Customer.CustomerName, null, []))
    createMyOwnElement(elementObjCreator("td", tr, Customer.CustomerBalance, null, []))
    let transactions = ""

    Customer.transactions.forEach((transaction)=>{
        transactions += `transactionType: ${transaction.transactionType} , Balance: ${transaction.balance} <br/>`
    })
    createMyOwnElement(elementObjCreator("td", tr, transactions, null, []))
    
    const td = createMyOwnElement(elementObjCreator("td", tr, null, null, []))
    const singleBtn = createMyOwnElement(
        elementObjCreator("button", td, "Show", "btn btn-success mx-3", [])
    )
    singleBtn.addEventListener("click", ()=> showElement(Customer))
    const delBtn = createMyOwnElement(
        elementObjCreator("button", td, "delete", "btn btn-danger mx-3", [])
    )
    delBtn.addEventListener("click", ()=>deleteItem(index))
}
const deleteItem = (index)=>{
    //index
    const Customers = readFromStorage("Customers")
    Customers.splice(index,1)
    writeDataToStorage("Customers", Customers)
    drawAllCustomers(Customers)
}
const showElement=(Customer)=>{
    writeDataToStorage("Customer", Customer)
}



const drawEmptyRow = (colSpan) => {
    const tr = createMyOwnElement(elementObjCreator("tr", datawrap, null, "alert alert-danger", []))
    createMyOwnElement(elementObjCreator("td", tr, "no Customers yet", "text-center", [{ key: "colspan", val: colSpan }]))
}
const drawAllCustomers = (Customers) => {
    datawrap.textContent = ""
    if (Customers.length == 0) drawEmptyRow(6)
    Customers.forEach((Customer, i) => drawCustomer(Customer, i))
}
const drawCustomerTypes = (CustomerTypes)=>{
    CustomerTypes.forEach(CustomerType => {
        createMyOwnElement(elementObjCreator("option", document.querySelector("#tType"), CustomerType, null, [{ key: "value", val: CustomerType }]))
    })
}

const drawTransactionTypes = (TransactionTypes)=>{
    TransactionTypes.forEach(TransactionType => {
        createMyOwnElement(elementObjCreator("option", document.querySelector("#transactionType"), TransactionType, null, [{ key: "value", val: TransactionType }]))
    })
}

const drawCustomerName = (Customers)=>{
    Customers.forEach(Customer => {
        createMyOwnElement(elementObjCreator("option", document.querySelector("#CustomerName"), Customer.CustomerName, null, [{ key: "value", val: Customer.CustomerName }]))
    })
}
//add Customer page
if (addCustomer) {
    addCustomer.addEventListener("submit",  (e)=> {
        e.preventDefault()
        let Customer = { accNum: Date.now(),transactions:[] }
        CustomerHeads.forEach((head) => Customer[head] = addCustomer.elements[head].value)
        const Customers = readFromStorage("Customers") 
        Customers.push(Customer) 
        writeDataToStorage("Customers", Customers) 
        addCustomer.reset()
        window.location.href = "index.html"
    })
}
if (addTransaction) {
    const TransactionTypes = ["withdraw","addBalance"]
    drawTransactionTypes(TransactionTypes)
    const Customers = readFromStorage("Customers")
    drawCustomerName(Customers)
    addTransaction.addEventListener("submit",  (e)=> {
        e.preventDefault()
        let type =  addTransaction.elements["transactionType"].value
        let balance =  addTransaction.elements["transactionBalance"].value
        let name =addTransaction.elements["customer"].value
        let index = Customers.findIndex(Customer=>name===Customer.CustomerName)
        let Transaction = {
            transactionType:type,
            balance:balance
        }
        Customers[index].transactions.push(Transaction)
        if(type === "addBalance"){
            Customers[index].CustomerBalance += parseInt(balance)  
        }else{
            Customers[index].CustomerBalance -=  balance      
        }
        
        writeDataToStorage("Customers", Customers) 
        addTransaction.reset()
        window.location.href = "index.html"
    })
}
if (datawrap) {
    drawAllCustomers( readFromStorage("Customers") )
    delAll.addEventListener("click", (event) => {
        writeDataToStorage("Customers", [])
        drawAllCustomers([])
    })
}























