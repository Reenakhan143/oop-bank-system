#! /user/bin/env node
import inquirer from "inquirer";


 //Bank account interface interfac 
 interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance():void
    }

    // class Bank account
    class BankAccount implements BankAccount{
        accountNumber: number;
        balance: number;

        constructor(account:number,bal:number){
            this.accountNumber=account
            this.balance = bal
        }
        // Debit money
        withdraw(amount:number){
            if(this.balance >=amount){
                this.balance -= amount;
                console.log(`withdrawal of $${amount} successfull. Remainig balance $${this.balance}`);
            }else{
                console.log("insufficient balance");
            }
        }
        // Credit money
        deposit(amount:number){
            if(amount > 100){
                amount -= 1; //$1 fee charged if more then $100 doller is deposit
            }
            this.balance += amount;
            console.log(`Deposit of $${amount} successfull. New balance $${this.balance}`)
        }

        // checked Balance
        checkBalance(): void{
            console.log(`Your current balance is $${this.balance}`)
        }
        // customer class
       

        }
        class customer{
            firstName:string
            lastName:string
            account:BankAccount
            age : number
            gender:string
            mobileNumber:number
            constructor(firstName:string,lastName:string,account:BankAccount,age:number,gender:string,mobile:number){
                this.firstName = firstName;
                this.lastName = lastName;
                this.age = age;
                this.gender = gender;
                this.mobileNumber = mobile;
                this.account = account

            }

        }

        // create bank account
        const account: BankAccount []=[
            new BankAccount(10001,1000),
            new BankAccount(10002,2000),
            new BankAccount(10003,3000),

        ];
        // creat customer
            
        const customers: customer[]=[
             new customer("Muhammad","Hussain",account[0],25,"Male",345664445,),
                                       
             new customer("Reena","khan",account[1],30,"Female",333465789),
            new customer ("muhammmad","ali",account[2], 37,"male",334658766)
        ]
        // function interect with bank account
         async function service(){
            do{
                const accountNumberInput= await inquirer.prompt({
                    type:"number",
                    name:"accountNumber",
                    message:"Enter your account number"

                
                })
                const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
                if(customer){
                    console.log(`Welcome ${customer.firstName} ${customer.lastName}!\n`)
                    const ans = await inquirer.prompt([{
                        type:"list",
                        name:"select",
                        message:"Choose an option",
                        choices:["Deposit","Withdraw","Check Balance","Exit"]
                    }]);
                    switch(ans.select){
                        case "Deposit":
                        const depositAmount = await inquirer.prompt({
                            type:"number",
                            name:"amount",
                            message:"Enter amount to deposit"

                        }) 
                        customer.account.deposit(depositAmount.amount)
                        break;
                        case "Withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            type:"number",
                            name:"amount",
                            message:"Enter amount to deposit"

                        }) 
                        customer.account.withdraw(withdrawAmount.amount)
                        break; 
                        case "Check Balance":
                           customer.account.checkBalance();
                            break;
                        case  "Exit":
                             console.log("Exiting bank program...")
                             console.log("\n thank you for using our bank services. Have a great day!");
                             return;


                                
                        




                    }
                }
                else{
                    console.log("invalid acount number.please tray again")
                }

                
              

            }while(true)
        }
        service()
       
        


    

 

 
