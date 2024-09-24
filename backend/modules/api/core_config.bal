import ballerina/http;

// Export the CORS config to be used in other files
public final http:CorsConfig corsConfig = {
    allowOrigins: ["*"],  // Allow all origins for development
    allowHeaders: ["Content-Type"],
    allowMethods: ["GET", "POST", "OPTIONS"]
};



 
