const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const url = '/weather?address='
    let location = search.value
    messageOne.textContent = 'Loading...'
    //messageTwo.textContent = ''

    fetch(url+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
                console.log(data.error)
            } else {
                //messageOne.textContent = data[0].notes
                //console.log(data[0].notes)

                for (var i = 0; i < data.length; i++) {
                    var review = data[i];
                    var ul = document.getElementById("friendsList");
                    var li = document.createElement('li');
                    li.appendChild(document.createTextNode(review.notes));
                    ul.appendChild(li);
                }


                //messageTwo.textContent = data.forecast
                //console.log(data.location)
                //console.log(data.forecast)
            }
        })
    })
})