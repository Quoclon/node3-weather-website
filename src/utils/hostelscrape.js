const request = require('request')

const hostelscrape = (number, callback) => {
    //console.log("Number: " + number)
    let url = 'https://www.hostelworld.com/properties/' + encodeURI(number) + '/reviews?' + 'sort=' + 'newest' + '&allLanguages=' + 'false' + '&page=' + '1' + '&monthCount=' + '36'
    console.log(url)

    request({url, json: true}, (error, response) => {
        //console.log(response.body)
        if(error){
            return callback("Error received from request to website", undefined)
        } 
        else if (!response.body.reviews){
            return callback("Response from website was empty", undefined)
        } else{
            console.log(response.body.reviews[0])
            callback(undefined, {
                body: response.body,
                reviews: response.body.reviews
            })
            //console.log(response.body)
        }
    })
}

// let hostelNumber = '270304'
// hostelscrape(hostelNumber, callback => {
//     console.log('true')
// })

module.exports = hostelscrape