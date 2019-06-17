console.log('This is JS folder')




const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent = 'From JS'
weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    // if (!location) {
    //     console.log('Provide Location to get weather forecast!')
    //     return;
    // }

    fetch('/weather?address='+location).then( (Response) => {


        Response.json().then((data) => {
            if(data.error){
                console.log('Error occured')
                messageOne.textContent =data.error
            } else {
                console.log(data)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            
        })

    })

})
