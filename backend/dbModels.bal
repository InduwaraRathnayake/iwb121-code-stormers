import ballerina/http;

type DatabaseConfig record {|
    string host;
    string user;
    string password;
    string database;
    int port;
|};

configurable DatabaseConfig databaseConfig = ?;

type User record {|
    readonly int id;
    string username;
    string first_name;
    string last_name;
    string email;
    string password;
|};

type NewUser record {|
    string username;
    string first_name;
    string last_name;
    string email;
    string password;
|};

const int STATUS_OK = 200;
const int STATUS_BAD_REQUEST = 400;
const int STATUS_INTERNAL_SERVER_ERROR = 500;

const string MSG_USERNAME_EXISTS = "Username already exists";
const string MSG_EMAIL_EXISTS = "Email already exists";
const string MSG_USER_ADDED_SUCCESS = "User added successfully";
const string MSG_USER_ADD_FAILED = "Failed to add user";


public function sendJsonResponse(http:Caller caller, int status, string message) returns error? {
    http:Response res = new;
    json response = {message: message, status: status};
    res.setJsonPayload(response);
    check caller->respond(res);
}
