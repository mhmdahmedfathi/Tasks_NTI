
const {writeDataToFile, readDataFromJSON} = require("./DealingWithJson")
const {CustomerData,TransactionData} = require("./validation")

const AddCustomer = (argv) =>{
    let errors = []
    let Customer = { accNum: Date.now(),transactions:[] }
    CustomerData.forEach((Data)=>{
        let valid = Data.invalid(argv[Data.ele]) 
        if(valid)
            errors.push(valid)
        if(!Data.default)
            return Customer[Data.ele] = argv[Data.ele]

        Customer[Data.ele] = Data.default
    })
    if(errors.length != 0) throw new Error(errors)
    const Customers = readDataFromJSON("./db/Customers.json")
    Customers.push(Customer)
    console.log("Done Adding ",{Customer})
    writeDataToFile("./db/Customers.json", Customers)   
}


const AddTransaction = (argv) =>{
    try {
        let errors = []
        let Transaction = {}
        TransactionData.forEach((Data)=>{
            let valid = Data.invalid(argv[Data.ele])
            if(valid)
                errors.push(valid)
            if(!Data.default)
                return Transaction[Data.ele] = argv[Data.ele]
            Transaction[Data.ele] = Data.default
        })
        if(errors.length != 0) throw new Error(errors)
        const Customers = readDataFromJSON("./db/Customers.json")
        let index = Customers.findIndex(Customer=>Transaction.name===Customer.CustomerName)
        delete Transaction.name
        if(index == -1)
            throw new Error("No Customer with this name found")
        Customers[index].transactions.push(Transaction)
        if(Transaction.type === "addBalance"){
            Customers[index].CustomerBalance += parseInt(Transaction.balance)  
        }else{
            Customers[index].CustomerBalance -=  Transaction.balance      
        }
        writeDataToFile("./db/Customers.json", Customers)   
        console.log("Done Adding ",{Transaction})
       
    } catch (error) {
        console.log(error)       
    }
}

const DeleteCustomers = ()=>{
    writeDataToFile("./db/Customers.json", [])
}

const ShowCustomers = ()=>{
    const Customers = readDataFromJSON("./db/Customers.json")
    Customers.forEach(user=>{
        let displayed = ""
        CustomerData.forEach((data)=> {
            displayed += data.ele + " => " + user[data.ele]
            user.transactions.forEach((transaction)=>{
                displayed += `${transaction.type} => ${transaction.balance} \n`
            })
        })
        console.log(displayed)
    })
}

module.exports={AddTransaction,AddCustomer,ShowCustomers,DeleteCustomers}