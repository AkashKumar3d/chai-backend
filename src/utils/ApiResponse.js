
// ye Apiresponse create kiya hai server se response send karane ke liye utils constructor
class ApiResponse  {
    constructor(statusCode,data , message="Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success =statusCode < 400
    }
}