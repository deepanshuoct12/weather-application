console.log('client side java script is running')// run javascript on browser
//fetch api allow us to fetch data from url
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{  // fetch data from client side javascript (data which was send to client by res.send we fetch that javascript by fetch)and print that on console of client side. we get json data and we parse it after parsing we call then() on it
//     response.json().then((data)=>{          
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{

//         if(data.error){
//             console.log(data.error)
//         }

//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })


// })
const weatherform = document.querySelector('form')// we select the form div from browser
const search = document.querySelector('input')  // select the input value from the browser form 
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherform.addEventListener('submit',(e)=>{      // e is event when submit event takes place 
    e.preventDefault()  // we prevent browser to refresh as it bydefault refresh 
      

    const location = search.value

message1.textContent = 'LOADING'
message2.textContent = ''    
//http://localhost:3000   /..write this in fetch() before /weather..if you want to run from local host 
fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{

        if(data.error){
            message1.textContent = data.error
            message2.textContent = ' '
           // console.log(data.error)
        }

        else{
            message1.textContent = data.location
            message2.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })


})
   
})