import ballerina/io;
import ballerina/test;


// Before Suite Function

@test:BeforeSuite
function beforeSuiteFunc() {
    io:println("Starting Blood Glucose Analysis Tests");
}

// Test function for normal blood glucose values

@test:Config {}
function testNormalBloodGlucose() returns error? {
    BloodGlucoseData data = {
        fastingGlucose: 85.0,
        randomGlucose: 120.0,
        hba1c: 5.5
    };
    AnalysisResult[] result = check analyzeBloodGlucose(data);
    test:assertEquals(result[0].text, "Fasting glucose is normal, indicating healthy glucose metabolism.");
    test:assertEquals(result[1].text, "Random glucose is normal, suggesting good glucose regulation.");
    test:assertEquals(result[2].text, "HbA1c is normal, indicating well-controlled blood sugar levels.");
}

// Negative Test function for diabetic values

@test:Config {}
function testDiabeticBloodGlucose() returns error? {
    BloodGlucoseData data = {
        fastingGlucose: 140.0,
        randomGlucose: 220.0,
        hba1c: 7.0
    };
    AnalysisResult[] result = check analyzeBloodGlucose(data);
    test:assertEquals(result[0].text, "Fasting glucose is high (Diabetes): This indicates that you may have diabetes.");
    test:assertEquals(result[1].text, "Random glucose indicates Diabetes: Persistent high levels may require medical intervention.");
    test:assertEquals(result[2].text, "HbA1c indicates Diabetes: Levels above 6.5% suggest poor blood sugar control and potential complications.");
}

// After Suite Function

@test:AfterSuite
function afterSuiteFunc() {
    io:println("Completed Blood Glucose Analysis Tests");
}
