## About

This is a task for testing argsument of function in javascript and deal with the console.
the structure of the code is:

1.  index.js is the main file that will run the programm and contains yargs module.
2.  validation.js is the file that will validate the input
3.  Functions.js is the file that will contain the main functions
    that takes the input and checks its validity and do provided job.
4.  Dealingwithjson.js is the main file that deals with json file either by input or output.

## 💻 Built Using <a name = "tech"></a>

- [Javascript]()
- [CLI]()

## Logs

<div name="Logs" align="center">

### Add Customer

#### if you want to add client, you simply have to enter 2 args which are his name and his balance so you can type `node index.js AddCustomer --CustomerName=<name> --CustomerBalance=<balance>`

For adding name = mhmd and balance = 1500, you wil find the output in the console as this

```
Done Adding  {
  Customer: {
    accNum: 1655162844693,
    transactions: [],
    CustomerName: 'mhmd',
    CustomerBalance: 1500
  }
}
data added

```

then you want to add client but by mistake you didn't add any args or one of 2 args are missing , you will find the error message

```
index.js AddCustomer

responsable for Adding customer to mocking data

Options:
  --help             Show help                                         [boolean]
  --version          Show version number                               [boolean]
  --CustomerName     customer name                                    [required]
  --CustomerBalance  balance of the customer                          [required]

Missing required arguments: CustomerName, CustomerBalance
```

If you try to add customer with the same name, you will get this output in the console

```
 Sorry about that but Customer with this name already exists

```

If you try to add customer with balance < 0, you will get this output in the console

```
balance must be greater than zero
```

### Add Transaction

when you addTransaction the type can be only addBalance or Withdraw nothing else is accepted

#### then you want to add balance Transaction to the customer, you can type `node index.js AddTransaction --name=<name> --type=addBalance --balance=<balance>`

If the user is found you will see

```
data added
Done Adding  { Transaction: { type: 'addBalance', balance: 1500 } }

```

if the user is not exist,you will see

```
No Customer with this name found
```

#### so to add withdraw transaction, you can enter `node index.js AddTransaction --name=<name> --type=Withdraw --balance=<balance>`

if everything is corrected, then

```
data added
Done Adding  { Transaction: { type: 'Withdraw', balance: 1500 } }

```

if your balance is less than Withdraw balance, then

```
You can't withdraw Balance greater than your accual balance

```

if the user is not exist,you will see

```
No Customer with this name found
```

#### If you entered any type other than addBalance or Withdraw,you will find

```
Make sure you entered the correct type
```

### ShowCustomers

#### then you want to see all clients and all their transactions , you can type `node index.js ShowCustomers`

```
 CustomerName => mohamed
 CustomerBalance => 100
 Has No Transactions :(

 CustomerName => mohamed2
 CustomerBalance => 100
 His Transactions :
 addBalance => and its balance : 100
 withdraw => and its balance : 100
 withdraw => and its balance : 100
 addBalance => and its balance : 100
```

### DeleteCustomers

#### if you want to delete all clients , you can type `node index.js DeleteCustomers`

```
   All Custmores Deleted Hope you know what are you doing :(
```

</div>

Happy bank transactions and happy coding :)
