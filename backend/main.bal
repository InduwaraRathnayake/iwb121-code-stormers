import ballerina/http;
import core_config; // Import the corsConfig from core_config.bal
import corsConfig [as core_config];

// Apply CORS config to all resources
@http:ServiceConfig {
    cors: core_config.corsConfig
}
service /api on new http:Listener(8080) {

    resource function get greeting() returns json {
        return {message: "Hello Induwara!"};
    }

    resource function get farewell() returns json {
        return {message: "Goodbye Induwara!"};
    }

    resource function post data(map<anydata> payload) returns json {
        return {status: "Data received", data: payload.toJson()};
    }
}
