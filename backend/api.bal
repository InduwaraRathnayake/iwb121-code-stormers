import backend.bloodGlucoseAnalysis as BAG;
import backend.crpAnalysis as CA;
import backend.fbcAnalysis as FA;
import backend.lipidPanelAnalysis as LPA;
import backend.liverFunctionTestAnalysis as LFTA;
import backend.thyroidFunctionTestAnalysis as TFA;

import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

final mysql:Client wellnessDB = check new (...databaseConfig);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
        allowCredentials: true,
        maxAge: 3600
    }
}

service /api on new http:Listener(9090) {

    // Resource to analyze blood glucose data
    isolated resource function post analyzeBloodGlucose(http:Caller caller, BloodGlucoseData data) returns error? {

        AnalysisResult[] interpretations = check BAG:analyzeBloodGlucose(data);

        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    // Resource to analyze CRP data
    isolated resource function post analyzeCRP(http:Caller caller, CRPData data) returns error? {
        AnalysisResult[] interpretations = check CA:analyzeCRP(data);

        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    // Resource to analyze FBC data
    isolated resource function post analyzeFBC(http:Caller caller, FBCData data) returns error? {
        AnalysisResult[] interpretations = check FA:analyzeFBC(data);

        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    // Resource to analyze Lipid Panel data
    isolated resource function post analyzeLipidPanel(http:Caller caller, LipidPanelData data) returns error? {
        AnalysisResult[] interpretations = check LPA:analyzeLipidPanel(data);

        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    // Resource to analyze LFT data
    isolated resource function post analyzeLFT(http:Caller caller, LFTData data) returns error? {
        AnalysisResult[] interpretations = check LFTA:analyzeLFT(data);

        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    // Resource to analyze TFT data
    isolated resource function post analyzeTFT(http:Caller caller, TFTData data) returns error? {
        AnalysisResult[] interpretations = check TFA:analyzeTFT(data);

        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

    isolated resource function post signup(http:Caller caller, http:Request req) returns error? {
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
                check sendJsonResponse(caller, STATUS_BAD_REQUEST, MSG_USERNAME_EXISTS);
            } else if existingUser.email == user.email {
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

    isolated resource function post login(http:Caller caller, http:Request req) returns error? {
        json requestBody = check req.getJsonPayload();
        string email = (check requestBody.email).toString();
        string password = (check requestBody.password).toString();

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

            if (enteredPasswordHash.toBase64() == decryptedHash.toBase64()) {
                check sendJsonResponse(caller, STATUS_OK, MSG_LOGIN_SUCCESS);
            } else {
                check sendJsonResponse(caller, STATUS_UNAUTHORIZED, MSG_LOGIN_FAILED);
            }
        } else {
            check sendJsonResponse(caller, STATUS_UNAUTHORIZED, MSG_LOGIN_FAILED);
        }
    }

    isolated resource function get users() returns User[]|error {
        stream<User, sql:Error?> userStream = wellnessDB->query(`SELECT * FROM users`);
        return from var user in userStream
            select user;
    }

    //get user details by email
    isolated resource function post userByEmail(http:Caller caller, http:Request req) returns error? {
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
    isolated resource function post forgotPassword(http:Caller caller, http:Request req) returns error? {
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
                check sendJsonResponse(caller, STATUS_OK, MSG_PASSWORD_RESET_SUCCESS);
            } else {
                check sendJsonResponse(caller, STATUS_INTERNAL_SERVER_ERROR, MSG_PASSWORD_RESET_FAILED);
            }
        }
    }

    //change first name and last name
    isolated resource function put changeName(http:Caller caller, http:Request req) returns error? {
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

    //delete user
    isolated resource function delete deleteUser(http:Caller caller, http:Request req) returns error? {
        json requestBody = check req.getJsonPayload();
        string email = (check requestBody.email).toString();

        var deleteUser = check wellnessDB->execute(
        `DELETE FROM users WHERE email = ${email}`
        );

        if (deleteUser.affectedRowCount > 0) {
            check sendJsonResponse(caller, STATUS_OK, MSG_USER_DELETE_SUCCESS);
        } else {
            check sendJsonResponse(caller, STATUS_INTERNAL_SERVER_ERROR, MSG_USER_DELETE_FAILED);
        }
    }

    //contact us
    isolated resource function post contactUs(http:Caller caller, http:Request req) returns error? {
        json requestBody = check req.getJsonPayload();
        string subject = (check requestBody.subject).toString();
        string firstName = (check requestBody.firstName).toString();
        string lastName = (check requestBody.lastName).toString();
        string mobileNo = (check requestBody.mobileNo).toString();
        string email = (check requestBody.email).toString();
        string message = (check requestBody.message).toString();

        var insertData = check wellnessDB->execute(
        `INSERT INTO contact_form(subject, first_name, last_name, mobile_no, email, message) 
         VALUES (${subject}, ${firstName}, ${lastName}, ${mobileNo}, ${email}, ${message})`
        );

        if (insertData.affectedRowCount > 0) {
            check sendJsonResponse(caller, STATUS_OK, "Message sent successfully");
        } else {
            check sendJsonResponse(caller, STATUS_INTERNAL_SERVER_ERROR, "Failed to send message");
        }
    }

}

