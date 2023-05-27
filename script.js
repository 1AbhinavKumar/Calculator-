class Calculator{
    constructor(previousOperandtextelement,currentOperandtextelement){
        this.previousOperandtextelement=previousOperandtextelement
        this.currentOperandtextelement=currentOperandtextelement
        this.clear()
        // we want to clear everything everytime we open the webpage 
    }

    clear(){
        this.previousOperand=''
        this.currentOperand=''
        this.operation=undefined
    }

    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }

    appendnumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand= this.currentOperand.toString()+ number.toString()
    }
    
    chooseoperation(operation){
        if (this.currentOperand==="")return 
        if (this.previousOperand!== ""){
            this.compute()
        }
        this.operation = operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }

    compute(){
        let computation 
        // here computation is the variable we have created 
        const prev= parseFloat(this.previousOperand)
        const curr=parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return 
        // isNaN is checking it it is not a number (NAN)
        switch(this.operation){
            case "+":
                computation=prev+curr
                break
            case "-":
                computation=prev-curr
                break
            case "*":
                computation=prev*curr
                break
            case "/":
                computation=prev/curr
                break
            default:
                return
        }
        this.currentOperand=computation
        this.operation=undefined
        this.previousOperand=''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}. ${decimalDigits}`
        } else {
        return integerDisplay
        }
    }


    updatedisplay(){
        this.currentOperandtextelement.innerText=this.getDisplayNumber(this.currentOperand)
        if (this.operation!= null){
            this.previousOperandtextelement.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandtextelement.innerText=''
        }
    }
}




const numberbuttons= document.querySelectorAll('[data-number]')
// here querySelectorAll will select all the element from the html having data-number in it

const operationbuttons= document.querySelectorAll('[data-operation]')

const allclearbutton=document.querySelector("[data-allclear]")
const deletebutton = document.querySelector('[data-delete]')
const equalbutton = document.querySelector('[data-equal]')
// here querySelector selctor selects single element 

const previousOperandtextelement= document.querySelector('[data-previous-operand]')
const currentOperandtextelement= document.querySelector('[data-current-operand]')


const calculator= new Calculator(previousOperandtextelement,currentOperandtextelement)


numberbuttons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendnumber(button.innerText)
        // We can also use textcontent in place of innertext. The difference between textContent and innerText is that textContent retrieves all the text within an element, including hidden text, while innerText retrieves only the visible text.
        calculator.updatedisplay()
    })
})

operationbuttons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseoperation(button.innerText)
        calculator.updatedisplay()
    })
})

equalbutton.addEventListener('click',button =>{
    calculator.compute()
    calculator.updatedisplay()
})

allclearbutton.addEventListener('click',button =>{
    calculator.clear()
    calculator.updatedisplay()
})

deletebutton.addEventListener('click',button =>{
    calculator.delete()
    calculator.updatedisplay()
})