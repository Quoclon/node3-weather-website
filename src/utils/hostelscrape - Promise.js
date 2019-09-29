const request = require('request')
const rp = require('request-promise')


const hostelscrape1 = (number, page, callback) => {

        let url = 'https://www.hostelworld.com/properties/' + encodeURI(number) + '/reviews?' + 'sort=' + 'newest' + '&allLanguages=' + 'false' + '&page=' + page + '&monthCount=' + '36'
        //console.log(url)

        request({url, json: true}, (error, response) => {
            //console.log(response.body)
            if(error){
                return callback("Error received from request to website", undefined)
            } 
            else if (!response.body.reviews){
                return callback("Response from website was empty", undefined)
            } else{       
                callback(undefined, {
                    body: response.body,
                    reviews: response.body.reviews
                })
            }
        })
    }

 async function hostelscrape(number, page) {
    
    let dataArray = []
    let newarray = []
    let finalarray = []

    for(i=1; i<4; i++){
        try {
            let a = await rp({url:'https://www.hostelworld.com/properties/' + encodeURI(number) + '/reviews?' + 'sort=' + 'newest' + '&allLanguages=' + 'false' + '&page=' + String(i) + '&monthCount=' + '36', json:true})
            //console.log(a.reviews)
            dataArray.push({
                reviews: a.reviews
            })
         } catch (e) {
            console.error(e)
         }  
    }
    
    let body = dataArray[0].reviews

    return body
    
    //console.log(dataArray[0].reviews[0].notes)
    //dataArray[0].forEach((data) => console.log(data.notes))
    //console.log('Data Array: ' + dataArray[0].notes)
} 

// hostelscrape('40564', '1')


module.exports = hostelscrape