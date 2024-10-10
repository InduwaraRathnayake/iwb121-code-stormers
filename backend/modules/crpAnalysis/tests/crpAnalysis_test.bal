import ballerina/io;
import ballerina/test;

// Before Suite Function

@test:BeforeSuite
function beforeSuiteFunc() {
    io:println("Starting CRP Analysis Tests");
}

// Test function for normal CRP levels

@test:Config {}
function testNormalCRPLevel() returns error? {
    CRPData data = {
        crpLevel: 0.5
    };
    AnalysisResult[] result = check analyzeCRP(data);
    test:assertEquals(result[0].text, "CRP level is normal (Less than 1 mg/L): Indicates low risk for cardiovascular disease.");
    test:assertEquals(result[0].color, "green");
}

// Test function for mildly elevated CRP levels

@test:Config {}
function testMildlyElevatedCRPLevel() returns error? {
    CRPData data = {
        crpLevel: 2.0
    };
    AnalysisResult[] result = check analyzeCRP(data);
    test:assertEquals(result[0].text, "CRP level is mildly elevated (1-3 mg/L): May indicate a moderate risk for cardiovascular disease.");
    test:assertEquals(result[0].color, "red");
}

// Test function for high CRP levels

@test:Config {}
function testHighCRPLevel() returns error? {
    CRPData data = {
        crpLevel: 4.0
    };
    AnalysisResult[] result = check analyzeCRP(data);
    test:assertEquals(result[0].text, "CRP level is high (Greater than 3 mg/L): Indicates a higher risk for cardiovascular disease and possible inflammation in the body. Further evaluation is recommended.");
    test:assertEquals(result[0].color, "red");
}

// After Suite Function

@test:AfterSuite
function afterSuiteFunc() {
    io:println("Completed CRP Analysis Tests");
}
