let firstValue='';
let operator='';
let secodeValue='';
let result='';
let equalBtn=false;
let additionalOperator;
let inputDisplay=document.querySelector('#input'); 
let resultDisplay=document.querySelector('#result'); 

window.addEventListener('keydown',(e)=>{
    console.log(e.Number);
    if(e.key>=0&&e.key<=9)updateValues(e.key);
    if (e.key === '.') updateValues('.');
    if (e.key === '=' || e.key === 'Enter') updateValues('=')
    if (e.key === 'Backspace') deleteLastNumber();
    if (e.key === 'Escape') clearAll();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'||e.key==='%')
         updateValues(convertOperator(e.key))
});
function updateValues(inputValue)
{   
  
    if((inputValue==='+'||inputValue==='−'||inputValue==='×'||inputValue==='÷'||inputValue==='%')&&(operator.length>=1&&firstValue.length==0))
    {
        equation(inputValue);
    }
   else if(inputValue=='%')
    {
        operator='%';
        updateResult()
    }
    else if(inputValue>=0&&inputValue<=9&&operator.length===0)
    {
       if(firstValue.length<=15) 
       {
           
            firstValue+=inputValue;
       }
    }
    else if(inputValue>=0&&inputValue<=9&&operator.length===1)
    {
        if(secodeValue.length<=15)
        {
            secodeValue+=inputValue;
            updateResult();
        }
    }
    else if(inputValue=='=')
    {
        resultDisplay.setAttribute('style','color:#80ed99;font-size:30px;transition:0.1s linear;');   
        updateResult();
        equalBtn=true;
    }
    else{
        operator=inputValue;
        if(firstValue.length==0)
            {
                firstValue=0;
               
           }
    }
    updateDisplay();
}
function equation(value)
{
      console.log(value);
        firstValue=result;
        secodeValue='';
        result='';
        operator=value;
}
function updateDisplay()
{
    let displayvalue=firstValue+
                     (operator.length>=1?(" "+operator):"")+
                     (secodeValue.length>=1?(' '+secodeValue):'');
    if(displayvalue.length>=20)
        {
            inputDisplay.setAttribute('style','font-size:20px');
        }
    inputDisplay.textContent=displayvalue.length=='  '?'0':displayvalue;
  
  
    if(result.length>=15)
        {
            resultDisplay.setAttribute('style','font-size:20px');
        }
    if(!equalBtn)
        {      
          resultDisplay.textContent=''+(result==0?firstValue:result);
        }
}
function updateResult()
{
    let a=Number(firstValue);
    let b=Number(secodeValue)
    switch(operator)
    {
        case '+':
            result=add(a,b);
            break;
        case '−':
            result=sub(a,b);
            break;
        case '÷':
            if(b==0){
                checkArithmeticError();
                return;
            }
            result=div(a,b);
            break;
        case '×':
            result=multiply(a,b);
            break;
        case '%':
            result=percentage(a);
            break;
        default:
            result=(a==0?'':a);
            break;
    }   
}
function checkArithmeticError()
{
    clearAll();
    resultDisplay.textContent=`= Can't divide by zero`;   
}
function clearAll()
{
    resultDisplay.removeAttribute('style','color:#80ed99;font-size:30px;transition:0.1s linear;');
    equalBtn=false;
    firstValue='';
    operator='';
    secodeValue=''
    inputDisplay.textContent='0';
    resultDisplay.textContent='';
}
function deleteLastNumber()
{
    if(!equalBtn)
    {
        if(firstValue.length >=1&&operator.length==0)
        {
            firstValue=firstValue.slice(0,-1);
        }
        else if(firstValue.length>=1&&operator.length===1&&secodeValue.length==0||firstValue==0&&operator.length===1)
        {
            firstValue=firstValue==0?'':firstValue;
            operator=operator.slice(0,-1);
        }
        else 
        {
            secodeValue=secodeValue.slice(0,-1);
        }
    }
    console.log(firstValue)
    updateResult();
    updateDisplay();
}
function add(a,b)
    {
        return a+b;
    }
function sub(a,b)
    {
        return a-b;
    }
function multiply(a,b)
    {
        return a*b;
    }
function div(a,b)
    {
        return a/b;
    }
function percentage(a)
    {
        return a/100;
    }
function convertOperator(keyboardOperator) 
{
    if (keyboardOperator === '/') return '÷'
    else if (keyboardOperator === '*') return '×'
    else if (keyboardOperator === '-') return '−'
    else if (keyboardOperator === '+') return '+'
    else if(keyboardOperator==='%')return '%';
}
      
