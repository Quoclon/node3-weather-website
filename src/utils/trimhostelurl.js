
const trimhostelurl = (hostel_url) => {
    //url = 'https://www.hostelworld.com/hosteldetails.php/HI-Nanaimo-Painted-Turtle-Guesthouse/Nanaimo/7805?dateFrom=2019-09-29&dateTo=2019-10-02&number_of_guests=2&sc_pos=1'
    url = hostel_url

    var regex = /[^\/]+$/;
    var strToMatch = "https://www.hostelworld.com/hosteldetails.php/HI-Nanaimo-Painted-Turtle-Guesthouse/Nanaimo/7805?dateFrom=2019-09-29&dateTo=2019-10-02&number_of_guests=2&sc_pos=1";
    var matched = regex.exec(strToMatch); 
    console.log(typeof matched[0])
    console.log(matched[0])
    
    var regex = /(.*?)\?/;
    var number = regex.exec(matched[0])

    console.log(number[1])
    
    return number[1]
}

trimhostelurl('https://www.hostelworld.com/hosteldetails.php/HI-Nanaimo-Painted-Turtle-Guesthouse/Nanaimo/7805?dateFrom=2019-09-29&dateTo=2019-10-02&number_of_guests=2&sc_pos=1')

module.exports = trimhostelurl