const yargs = require("yargs")
const Functions = require("./Functions")

yargs.command({
    command:"AddCustomer",
    describe:"responsable for Adding customer to mocking data",
    builder:{
        CustomerName:{
            demandOption:true,
            describe:"customer name"
        },
        CustomerBalance:{
            demandOption:true,
            describe:"balance of the customer"
        }  
    },
    handler:(argv)=>Functions.AddCustomer(argv)
})

yargs.command({
    command:"AddTransaction",
    describe:"responsable for transfaring from and to balance of the user",
    builder:{
        name:{
            demandOption:true,
            describe:"customer name"
        },
        type:{
            demandOption:true,
            describe:"WithDraw or add Transaction"
        },
        balance:{
            demandOption:true,
            describe:"balance of the Transaction"
        }  
    },
    handler:(argv)=>Functions.AddTransaction(argv)
})

yargs.command({
    command:"DeleteCustomers",
    describe:"responsable for Deleting All Customers",
    handler:()=>Functions.DeleteCustomers()
})

yargs.command({
    command:"ShowCustomers",
    describe:"responsable for Showing all customers",
    handler:()=>Functions.ShowCustomers()
})

yargs.argv
