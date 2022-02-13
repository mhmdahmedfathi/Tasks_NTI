
const CustomerData = [
    {
        ele: "CustomerName",
        default: false,
        invalid: function (data) {
            if (data.length < 3) 
                return "name must be more than 3 chars"
            else 
                return false
        }
    },
    {
        ele:"CustomerBalance",
        default: false,
        invalid: function(data){
            if(data < 0) 
                return "balance must be greater than zero"
            else
                return false
        }
    }
]
const TransactionData = [
    {
        ele: "name",
        default: false,
        invalid: function (data) {
            if (data.length < 3) return "name must be more than 3 chars"
            else return false
        }
    },
    {
        ele: "type",
        default: false,
        invalid: function (data) {
            if(data === "withdraw" || data === "addBalance") return false
            return "no"
        }
    },
    {
        ele: "balance",
        default: false,
        invalid: function (data) {
            if(data < 0) 
                return "balance must be greater than zero"
            else
                return false
        }
    }
]


module.exports = {CustomerData,TransactionData}