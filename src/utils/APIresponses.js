class APIresponses {
    constructor(statusCode, data, message = 'SUCCESS'){
        this.statusCode = statusCode,
        this.data = data,
        this.message = message,
        this.success = statusCode < 400 // Since whenever the API response is success we always have statusCode less then 400
    }
}

export { APIresponses }


// Ranges of statusCode
/*
    1. Informational responses (100 – 199)
    2. Successful responses (200 – 299)
    3. Redirection messages (300 – 399)
    4. Client error responses (400 – 499)
    5. Server error responses (500 – 599)
*/