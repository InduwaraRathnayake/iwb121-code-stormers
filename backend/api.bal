import backend.bloodGlucoseAnalysisService as BGAS;
import backend.crpAnalysisService as CAS;
import backend.fbcAnalysisService as FAS;
import backend.lipidPanelAnalysisService as LPAS;
import backend.liverFunctionTestAnalysisService as LFTAS;
import backend.thyroidFunctionTestAnalysisService as TFAS;

import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

mysql:Client wellnessDB = check new (...databaseConfig);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"], // Your frontend's origin
        allowHeaders: ["Content-Type", "Authorization"], // Allow specific headers like Authorization if needed
        allowMethods: ["GET", "POST", "OPTIONS", "PUT"], // Add other methods you may use
        allowCredentials: true, // Enable if you are using cookies or other credentials
        maxAge: 3600 // Cache preflight response for 1 hour
    }
}

service /api on new http:Listener(9090) {

    // Resource to analyze blood glucose data
    resource function post analyzeBloodGlucose(http:Caller caller, BloodGlucoseData data) returns error? {

        // Call the analyzeBloodGlucose function to get the interpretations
        AnalysisResult[] interpretations = check BGAS:analyzeBloodGlucose(data);

        //return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    // Resource to analyze CRP data
    resource function post analyzeCRP(http:Caller caller, CRPData data) returns error? {
        // Call the analyzeCRP function to get the interpretations
        AnalysisResult[] interpretations = check CAS:analyzeCRP(data);

        // Return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    // Resource to analyze FBC data
    resource function post analyzeFBC(http:Caller caller, FBCData data) returns error? {
        // Call the analyzeFBC function to get the interpretations
        AnalysisResult[] interpretations = check FAS:analyzeFBC(data);

        // Return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    // Resource to analyze Lipid Panel data
    resource function post analyzeLipidPanel(http:Caller caller, LipidPanelData data) returns error? {
        // Call the analyzeLipidPanel function to get the interpretations
        AnalysisResult[] interpretations = check LPAS:analyzeLipidPanel(data);

        // Return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    // Resource to analyze LFT data
    resource function post analyzeLFT(http:Caller caller, LFTData data) returns error? {
        // Call the analyzeLFT function to get the interpretations
        AnalysisResult[] interpretations = check LFTAS:analyzeLFT(data);

        // Return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    // Resource to analyze TFT data
    resource function post analyzeTFT(http:Caller caller, TFTData data) returns error? {
        // Call the analyzeTFT function to get the interpretations
        AnalysisResult[] interpretations = check TFAS:analyzeTFT(data);

        // Return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    resource function get users() returns User[]|error {
        stream<User, sql:Error?> userStream = wellnessDB->query(`SELECT * FROM users`);
        return from var user in userStream
            select user;
    }

    resource function post signup(http:Caller caller, http:Request req) returns error? {
        json requestBody = check req.getJsonPayload();
        NewUser user = {
            username: (check requestBody.username).toString(),
            first_name: (check requestBody.first_name).toString(),
            last_name: (check requestBody.last_name).toString(),
            email: (check requestBody.email).toString(),
            password: (check requestBody.password).toString()
        };

        // Check if the username or email already exists
        stream<User, sql:Error?> userStream = wellnessDB->query(
        `SELECT * FROM users WHERE username = ${user.username} OR email = ${user.email}`
        );
        var userResult = check userStream.next();
        User? existingUser = userResult is record {|User value;|} ? userResult.value : ();

        if existingUser is User {
            if existingUser.username == user.username {
                // If a user with the same username exists, return an error message
                check sendJsonResponse(caller, STATUS_BAD_REQUEST, MSG_USERNAME_EXISTS);
            } else if existingUser.email == user.email {
                // If a user with the same email exists, return an error message
                check sendJsonResponse(caller, STATUS_BAD_REQUEST, MSG_EMAIL_EXISTS);
            }
        } else {

            byte[] hashedPassword = check hashPassword(user.password);
            byte[] encryptedPasswordHash = check encryptPasswordHash(hashedPassword);

            // Proceed with adding the new user
            var insertUser = check wellnessDB->execute(
            `INSERT INTO users(username, first_name, last_name, email, password) 
             VALUES (${user.username}, ${user.first_name}, ${user.last_name}, ${user.email}, ${encryptedPasswordHash})`
            );

            if (insertUser.affectedRowCount > 0) {
                check sendJsonResponse(caller, STATUS_OK, MSG_USER_ADDED_SUCCESS);
            } else {
                check sendJsonResponse(caller, STATUS_INTERNAL_SERVER_ERROR, MSG_USER_ADD_FAILED);
            }
        }
    }

    resource function post login(http:Caller caller, http:Request req) returns error? {
        json requestBody = check req.getJsonPayload();
        string email = (check requestBody.email).toString();
        string password = (check requestBody.password).toString(); // Check if the user exists

        stream<User, sql:Error?> userStream = wellnessDB->query(
        `SELECT * FROM users WHERE email = ${email}`
        );
        var userResult = check userStream.next();
        User? user = userResult is record {|User value;|} ? userResult.value : ();
        // Hash the entered password
        byte[] enteredPasswordHash = check hashPassword(password);

        if user is User {
            // Decrypt the password hash

            byte[] decryptedHash = check decryptPasswordHash(user.password);

            // Compare the entered password hash with the decrypted password hash
            if (enteredPasswordHash.toBase64() == decryptedHash.toBase64()) {
                // If the passwords match, return a success message
                check sendJsonResponse(caller, STATUS_OK, MSG_LOGIN_SUCCESS);
            } else {
                // If the passwords do not match, return an error message
                check sendJsonResponse(caller, STATUS_UNAUTHORIZED, MSG_LOGIN_FAILED);
            }
        } else {
            // If the user does not exist, return an error message
            check sendJsonResponse(caller, STATUS_UNAUTHORIZED, MSG_LOGIN_FAILED);
        }
    }

    //get user details by email
    resource function post userByEmail(http:Caller caller, http:Request req) returns error? {
        json requestBody = check req.getJsonPayload();
        string email = (check requestBody.email).toString();
        stream<User, sql:Error?> userStream = wellnessDB->query(
        `SELECT * FROM users WHERE email = ${email}`
        );
        var userResult = check userStream.next();
        User? user = userResult is record {|User value;|} ? userResult.value : ();
        if (user is ()) {
            check sendJsonResponse(caller, http:STATUS_NOT_FOUND, MSG_USER_NOT_FOUND);
        } else {
            http:Response res = new;
            res.setPayload(
                {
                    "username": user.username,
                    "firstName": user.first_name,
                    "lastName": user.last_name,
                    "email": user.email
                }
            );
            check caller->respond(res);
        }
    }

    //forgot password
    resource function post forgotPassword(http:Caller caller, http:Request req) returns error? {
        json requestBody = check req.getJsonPayload();
        string email = (check requestBody.email).toString();
        string newPassword = (check requestBody.password).toString();

        stream<User, sql:Error?> userStream = wellnessDB->query(
        `SELECT * FROM users WHERE email = ${email}`
        );
        var userResult = check userStream.next();
        User? user = userResult is record {|User value;|} ? userResult.value : ();
        if (user is ()) {
            check sendJsonResponse(caller, http:STATUS_NOT_FOUND, MSG_USER_NOT_FOUND);
        } else {
            // Generate a new password
            byte[] hashedPassword = check hashPassword(newPassword);
            byte[] encryptedPasswordHash = check encryptPasswordHash(hashedPassword);

            // Update the user's password
            var updatePassword = check wellnessDB->execute(
            `UPDATE users SET password = ${encryptedPasswordHash} WHERE email = ${email}`
            );

            if (updatePassword.affectedRowCount > 0) {
                // Send the new password to the user's email

                check sendJsonResponse(caller, STATUS_OK, MSG_PASSWORD_RESET_SUCCESS);
            } else {
                check sendJsonResponse(caller, STATUS_INTERNAL_SERVER_ERROR, MSG_PASSWORD_RESET_FAILED);
            }
        }
    }

    //change first name and last name
    resource function put changeName(http:Caller caller, http:Request req) returns error? {
        json requestBody = check req.getJsonPayload();
        string email = (check requestBody.email).toString();
        string firstName = (check requestBody.first_name).toString();
        string lastName = (check requestBody.last_name).toString();

        // Update the user's first name and last name
        var updateName = check wellnessDB->execute(
        `UPDATE users SET first_name = ${firstName}, last_name = ${lastName} WHERE email = ${email}`
        );

        if (updateName.affectedRowCount > 0) {
            check sendJsonResponse(caller, STATUS_OK, MSG_NAME_CHANGE_SUCCESS);
        } else {
            check sendJsonResponse(caller, STATUS_INTERNAL_SERVER_ERROR, MSG_NAME_CHANGE_FAILED);
        }
    }

}

