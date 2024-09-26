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

mysql:Client wellnessDB = check new(...databaseConfig);


// Define the CORS configuration
@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowHeaders: ["Content-Type"],
        allowMethods: ["GET", "POST", "OPTIONS"]
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

    resource function post addUser(http:Caller caller, NewUser user) returns error? {
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
            // Proceed with adding the new user
            var insertUser = check wellnessDB->execute(
            `INSERT INTO users(username, first_name, last_name, email, password) 
             VALUES (${user.username}, ${user.first_name}, ${user.last_name}, ${user.email}, ${user.password})`
            );

            if (insertUser.affectedRowCount > 0) {
                check sendJsonResponse(caller, STATUS_OK, MSG_USER_ADDED_SUCCESS);
            } else {
                check sendJsonResponse(caller, STATUS_INTERNAL_SERVER_ERROR, MSG_USER_ADD_FAILED);
            }
        }
    }

}
