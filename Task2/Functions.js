
const {writeDataToFile, readDataFromJSON} = require("./DealingWithJson")
const {CustomerData,TransactionData} = require("./validation")

const AddCustomer = (argv) =>{
    try {

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
        let index = Customers.findIndex(one=>one.CustomerName===Customer.CustomerName)
        if(index === -1){    
            Customers.push(Customer)
            console.log("Done Adding ",{Customer})
            writeDataToFile("./db/Customers.json", Customers)   
        }else{
            throw new Error("\n Sorry about that but Customer with this name already exists \n")
        }    
    } catch (error) {
        console.log(error.message)        
    }
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
            if(Customers[index].CustomerBalance - Transaction.balance > 0)
                Customers[index].CustomerBalance -=  Transaction.balance      
            else 
                throw new Error("You can't withdraw Balance greater than your accual balance")
        }
        writeDataToFile("./db/Customers.json", Customers)   
        console.log("Done Adding ",{Transaction})
       
    } catch (error) {
        console.log(error.message)       
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
            displayed += data.ele + " => " + user[data.ele] + "\n"
        })
        if(user.transactions.length != 0){
            displayed += "His Transactions : \n"
            user.transactions.forEach((transaction)=>{
                displayed += `${transaction.type} => its balance : ${transaction.balance} \n`
            })
        }else{
            displayed += "Has No Transactions :( \n"
        }
        console.log(displayed)
    })
}

module.exports={AddTransaction,AddCustomer,ShowCustomers,DeleteCustomers}