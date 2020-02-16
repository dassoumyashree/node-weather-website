//code related to fetching the forecast - the json data in the client side js file
//making http req. for forecast data from client side js in the browser

//fetch is not a part of js, it's a browser based API, something we can use in all modern browsers, but not accessible in nodejs
//the code below cant be used in a back-end node script
//the code is running in client side js


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => { //data- parsed json data -- js object
//          console.log(data)
//     })
// })



//select the element from our html document that we're trying to work with
const weatherForm = document.querySelector('form') //js representation of the html element (1st element of its kind)
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//on submit the browser gets refreshed completely & msg gets cleared, allowing the server to render a new page
//default behaviour of form is to completely reload the page, everything resets, thats not what we want
weatherForm.addEventListener('submit', (e) => { //event callback - event object
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
        //    console.log(data.error)
           messageOne.textContent = data.error
        } else {
           messageTwo.textContent = data.forecast
           messageOne.textContent = data.location
        }
    })
})

//kicks off an asynch. IO operation much like calling request in nodejs did
//  -- we dont have access to the data right away, instead we provide a function and the function will run at some point
//  in future when the data is available
// apply then method on the return value from fetch & provide to it the callback function
// then method is a part of much bigger API (promises)
    
})

