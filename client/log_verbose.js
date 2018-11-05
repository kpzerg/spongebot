function log_v(message) {
    var dt = new Date()
    var date = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
    var time = dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();

    console.log(date+' '+time+' '+message)
}
