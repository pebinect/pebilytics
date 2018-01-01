function responseMessage(status,message,data){
    var response = {};
    response.STATUS = status;
    response.MESSAGE = message;
    response.DATA = data;
    return response;
}

module.exports = {
    ResponseMessage:responseMessage
}