const addCustomer = document.querySelector("#addCustomer")
const editCustomer = document.querySelector("#EditCustomer")
const addTransaction = document.querySelector("#addTransaction")  
const datawrap = document.querySelector("#datawrap")
const delAll = document.querySelector("#delAll")
const CustomerHeads = ["CustomerName","CustomerBalance"]
const createMyOwnElement = (element) => {
    try {
        let myElement = document.createElement(element.element)
        element.parent.appendChild(myElement)
        if (element.textContent) 
            myElement.innerHTML = element.textContent
        if (element.classes) 
            myElement.classList = element.classes   
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
    }
    catch (e) {
        data = []
    }
    return data
}

const writeDataToStorage = (storageItem, data) => {
    localStorage.setItem(storageItem, JSON.stringify(data))
}

const drawCustomer = (Customer,index) => {
    const tr = createMyOwnElement(
        elementObjCreator("tr", datawrap, null, null, [])
    )
    createMyOwnElement(
        elementObjCreator("td", tr, Customer.accNum, null, [])
    )
    createMyOwnElement(
        elementObjCreator("td", tr, Customer.CustomerName, null, [])
    )
    createMyOwnElement(
        elementObjCreator("td", tr, Customer.CustomerBalance, null, [])
    )
    
    let transactions = ""
    Customer.transactions.forEach((transaction)=>{
        transactions += `transactionType: ${transaction.transactionType} , Balance: ${transaction.balance} <br/>`
    })

    createMyOwnElement(
        elementObjCreator("td", tr, transactions, null, [])
    )
    const td = createMyOwnElement(
        elementObjCreator("td", tr, null, null, [])
    )
    const singleBtn = createMyOwnElement(
        elementObjCreator("button", td, "Show", "btn btn-success mx-3", [])
    )
    singleBtn.addEventListener("click", ()=> showElement(Customer))
    const editBtn = createMyOwnElement(
        elementObjCreator("a", td, "Edit", "btn btn-warning mx-3", [{ key: "href", val: "edit.html" }])
    )
    editBtn.addEventListener("click", ()=>EditItem(Customer))
    const delBtn = createMyOwnElement(
        elementObjCreator("button", td, "delete", "btn btn-danger mx-3", [])
    )
    delBtn.addEventListener("click", ()=>deleteItem(index))
}

const deleteItem = (index)=>{
    const Customers = readFromStorage("Customers")
    Customers.splice(index,1)
    writeDataToStorage("Customers", Customers)
    drawAllCustomers(Customers)
}

const EditItem = (Customer)=>{
    writeDataToStorage("CustomerEdit", Customer)
    window.location.href = "Edit.html"
}
const showElement=(Customer)=>{
    datawrap.textContent = ""
    createMyOwnElement(elementObjCreator("tr", datawrap, null, "alert alert-danger", []))
    const tr2 = createMyOwnElement(
        elementObjCreator("tr", datawrap, null, null, [])
    )
    createMyOwnElement(
        elementObjCreator("td", tr2, Customer.accNum, null, [])
    )
    createMyOwnElement(
        elementObjCreator("td", tr2, Customer.CustomerName, null, [])
    )
    createMyOwnElement(
        elementObjCreator("td", tr2, Customer.CustomerBalance, null, [])
    )
    
    let transactions = ""
    Customer.transactions.forEach((transaction)=>{
        transactions += `transactionType: ${transaction.transactionType} , Balance: ${transaction.balance} <br/>`
    })

    createMyOwnElement(
        elementObjCreator("td", tr2, transactions, null, [])
    )

    const element = document.getElementById("Control");
    element.remove()
    
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

if (addCustomer) {
    addCustomer.addEventListener("submit",  (e)=> {
        e.preventDefault()
        let Customer = { accNum: Date.now(),transactions:[] }
        CustomerHeads.forEach((head) => {
            Customer[head] = addCustomer.elements[head].value
        })
        let Customers = readFromStorage("Customers") 
        if(Customers) 
            Customers.push(Customer)
        else {
            Customers = [Customer]
        }
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
if (editCustomer) {
    const Customer = readFromStorage("CustomerEdit")
    CustomerHeads.forEach((head) => {
        editCustomer.elements[head].value = Customer[head]
    })
    
    editCustomer.addEventListener("submit",  (e)=> {
        e.preventDefault()
        const Customers = readFromStorage("Customers") 
        let index = Customers.findIndex(One => Customer.accNum === One.accNum )
        CustomerHeads.forEach((head) => {
            Customers[index][head] = editCustomer.elements[head].value
        })
        writeDataToStorage("Customers", Customers) 
        editCustomer.reset()
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























