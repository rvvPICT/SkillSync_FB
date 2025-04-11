dependencies to install:

npm install jsonwebtoken
npm install bcryptjs
npm install @react-native-async-storage/async-storage
npx expo install @react-native-firebase/app
npm install socket.io

# HTTP Status Codes Guide for REST APIs

## 📌 Overview
HTTP status codes are used in REST APIs to indicate the success or failure of a request. This guide provides a structured explanation of different status codes and when to use them.

---

## 📌 Categories of HTTP Status Codes
| **Category** | **Range** | **Purpose** |
|------------|---------|-----------|
| **1xx Informational** | `100-199` | The request is received and understood, but further processing is needed. |
| **2xx Success** | `200-299` | The request was successful. |
| **3xx Redirection** | `300-399` | Further action is needed to complete the request. |
| **4xx Client Errors** | `400-499` | The request contains bad syntax or cannot be fulfilled by the client. |
| **5xx Server Errors** | `500-599` | The server encountered an error while processing the request. |

---

## 📌 1xx - Informational Responses
| **Status Code** | **Meaning** | **Usage Example** |
|--------------|------------|-----------------|
| `100 Continue` | The request is fine, continue sending data. | When sending large data in chunks. |
| `101 Switching Protocols` | The server is switching to a new protocol. | Upgrading from HTTP 1.1 to WebSockets. |

---

## 📌 2xx - Success Responses
| **Status Code** | **Meaning** | **Usage Example** |
|--------------|------------|-----------------|
| `200 OK` | Request was successful. | GET request for a user profile. |
| `201 Created` | A new resource was successfully created. | When a new user or project is registered. |
| `202 Accepted` | The request is accepted but still being processed. | Asynchronous operations like background tasks. |
| `204 No Content` | The request was successful but returns no data. | DELETE request for removing a user. |

---

## 📌 3xx - Redirection Responses
| **Status Code** | **Meaning** | **Usage Example** |
|--------------|------------|-----------------|
| `301 Moved Permanently` | The resource has been permanently moved. | Redirecting old API URLs to new endpoints. |
| `302 Found` | Temporary redirection to a different URL. | Login redirects (e.g., OAuth). |
| `304 Not Modified` | The resource hasn’t changed. | When using caching mechanisms. |

---

## 📌 4xx - Client Errors
| **Status Code** | **Meaning** | **Usage Example** |
|--------------|------------|-----------------|
| `400 Bad Request` | The request is invalid or malformed. | Missing required fields in a signup form. |
| `401 Unauthorized` | Authentication is required but not provided. | No JWT token in the request header. |
| `403 Forbidden` | The user is authenticated but lacks permission. | User tries to access an admin-only page. |
| `404 Not Found` | The requested resource does not exist. | Accessing `/api/user/9999` when user ID 9999 doesn't exist. |
| `405 Method Not Allowed` | The HTTP method is not supported for this endpoint. | Sending a `PUT` request to a `GET`-only API. |
| `409 Conflict` | Conflict with the current state of the resource. | Registering an email that is already in use. |
| `422 Unprocessable Entity` | The request is well-formed but contains invalid data. | Submitting a weak password during signup. |

---

## 📌 5xx - Server Errors
| **Status Code** | **Meaning** | **Usage Example** |
|--------------|------------|-----------------|
| `500 Internal Server Error` | A generic server-side error. | Unexpected database failure. |
| `502 Bad Gateway` | The server received an invalid response from an upstream server. | When a microservice API is down. |
| `503 Service Unavailable` | The server is down or overloaded. | Server undergoing maintenance. |
| `504 Gateway Timeout` | The request took too long to get a response. | A slow database query or API timeout. |

---

## 📌 Best Practices for REST API Responses
### ✔️ Successful Responses (`2xx`)
- `200 OK` → Standard response for successful GET requests.
- `201 Created` → After successfully creating a new resource.
- `204 No Content` → When deleting a resource.

### ❌ Client Errors (`4xx`)
- `400 Bad Request` → When the request contains bad or missing data.
- `401 Unauthorized` → When authentication credentials are missing or incorrect.
- `403 Forbidden` → When a user is authenticated but not allowed to access a resource.
- `404 Not Found` → When the requested resource doesn’t exist.
- `409 Conflict` → When there is a conflict with existing data.

### ⚠️ Server Errors (`5xx`)
- `500 Internal Server Error` → When something unexpected goes wrong.
- `503 Service Unavailable` → When the server is temporarily unavailable.

---

## 📌 Example Error Handling Middleware in Express
```js
export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500; // Default to 500 Internal Server Error
    let message = err.message || "Internal Server Error";

    if (err.name === "ValidationError") {
        statusCode = 400; // Bad request when validation fails
        message = "Invalid input data.";
    }

    if (err.name === "CastError") {
        statusCode = 404; // Resource not found when ID is incorrect
        message = "Resource not found.";
    }

    if (err.code === 11000) {
        statusCode = 409; // Conflict when duplicate entries occur
        message = "Duplicate entry detected.";
    }

    res.status(statusCode).json({
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
```

---

## 📌 Summary Table
| **Status Code** | **When to Use?** |
|--------------|--------------------------------------|
| **200 OK** | Successful response (GET request). |
| **201 Created** | When a new resource is successfully created. |
| **204 No Content** | When successfully deleting a resource. |
| **400 Bad Request** | When the request contains bad or missing data. |
| **401 Unauthorized** | When authentication credentials are missing or incorrect. |
| **403 Forbidden** | When a user is authenticated but not allowed to access a resource. |
| **404 Not Found** | When the requested resource doesn’t exist. |
| **409 Conflict** | When there is a conflict with existing data. |
| **500 Internal Server Error** | When an unexpected server error occurs. |

---

## 🚀 Conclusion
- **Use `4xx` errors when the client is at fault** (invalid input, missing authentication, etc.).
- **Use `5xx` errors when the server is at fault** (internal failures, crashes, timeouts).
- **Stick to REST API standards** to make your API predictable and easier to debug.

Let me know if you need further clarification! 🚀🔥

