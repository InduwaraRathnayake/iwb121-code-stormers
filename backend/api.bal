import ballerina/http;

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
        AnalysisResult[] interpretations = check analyzeBloodGlucose(data);

        //return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

        // Resource to analyze CRP data
    resource function post analyzeCRP(http:Caller caller, CRPData data) returns error? {
        // Call the analyzeCRP function to get the interpretations
        AnalysisResult[] interpretations = check analyzeCRP(data);

        // Return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

        // Resource to analyze FBC data
    resource function post analyzeFBC(http:Caller caller, FBCData data) returns error? {
        // Call the analyzeFBC function to get the interpretations
        AnalysisResult[] interpretations = check analyzeFBC(data);

        // Return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

        // Resource to analyze Lipid Panel data
    resource function post analyzeLipidPanel(http:Caller caller, LipidPanelData data) returns error? {
        // Call the analyzeLipidPanel function to get the interpretations
        AnalysisResult[] interpretations = check analyzeLipidPanel(data);

        // Return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

        // Resource to analyze LFT data
    resource function post analyzeLFT(http:Caller caller, LFTData data) returns error? {
        // Call the analyzeLFT function to get the interpretations
        AnalysisResult[] interpretations = check analyzeLFT(data);

        // Return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

        // Resource to analyze TFT data
    resource function post analyzeTFT(http:Caller caller, TFTData data) returns error? {
        // Call the analyzeTFT function to get the interpretations
        AnalysisResult[] interpretations = check analyzeTFT(data);

        // Return the interpretations as JSON
        http:Response res = new;
        res.setPayload(interpretations.toJson());
        check caller->respond(res);
    }

}