// class AppError extends Error {
//     constructor(message, statusCode) {
//         super(message);
//         this.statusCode = statusCode;
//         this.status = `${this.statusCode}`.startsWith("4")
//             ? "failure"
//             : "error";

//         Error.captureStackTrace(this, this.constructor);
//     }
// }

// module.exports = AppError;

class ClientError extends Error {
  constructor(msg, status) {
    super(msg);
    this.status = status;
    this.name = 'Client Error';
    // assert.Equal(status >= 400 && status < 500);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }
  }
}

class ServerError extends Error {
  constructor(msg, status) {
    super(msg);
    this.status = status;
    this.name = 'Client Error';
    // assert(status >= 500 && status < 600);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }
  }
}

module.exports = {
  ClientError,
  ServerError,
};
