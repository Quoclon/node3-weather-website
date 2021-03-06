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
    
    let reviewArray = []
   

    for(i = 1; i <= page; i++){
        try {
            let a = await rp({url:'https://www.hostelworld.com/properties/' + encodeURI(number) + '/reviews?' + 'sort=' + 'newest' + '&allLanguages=' + 'false' + '&page=' + String(i) + '&monthCount=' + '36', json:true})

            //console.log(a.reviews)
            for(x=0; x<a.reviews.length;x++){
                //console.log(a.reviews[x].notes)
                // reviewArray.push({
                //     notes: a.reviews[x].notes
                // })
                reviewArray.push(i + ' - ' + x + ' - ' + a.reviews[x].notes)
            }
            
            
            //console.log(a.reviews)
            // dataArray.push({
            //     reviews: a.reviews
            // })
         } catch (e) {
            console.error(e)
         }  
    }
    
    console.log(reviewArray)
    return(reviewArray)

    //return dataArray[0].reviews
} 


// hostelscrape('40564', 1)

// let hostelNumber = '270304'
// hostelscrape(hostelNumber, callback => {
//     console.log('true')
// })

module.exports = hostelscrape