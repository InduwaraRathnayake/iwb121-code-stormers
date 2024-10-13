import ballerina/test;
import ballerina/io;

@test:BeforeSuite
function beforeSuiteFunc() {
    io:println("WHR Calculator Tests");
}

@test:Config {}
function testCalculateWHR() {
    float waist = 80.0;
    float hip = 100.0;
    float expectedRatio = 0.80;

    float result = calculateWHR(waist, hip);
    test:assertEquals(result, expectedRatio, msg = "Expected WHR does not match the result");
}

@test:Config {}
function testCategorizeWHR() {
    float ratioLowRiskFemale = 0.75;
    float ratioModerateRiskFemale = 0.82;
    float ratioHighRiskFemale = 0.90;
    float ratioLowRiskMale = 0.85;
    float ratioModerateRiskMale = 0.95;
    float ratioHighRiskMale = 1.05;

    string resultLowRiskFemale = categorizeWHR(ratioLowRiskFemale, "female");
    string resultModerateRiskFemale = categorizeWHR(ratioModerateRiskFemale, "female");
    string resultHighRiskFemale = categorizeWHR(ratioHighRiskFemale, "female");
    string resultLowRiskMale = categorizeWHR(ratioLowRiskMale, "male");
    string resultModerateRiskMale = categorizeWHR(ratioModerateRiskMale, "male");
    string resultHighRiskMale = categorizeWHR(ratioHighRiskMale, "male");

    test:assertEquals(resultLowRiskFemale, "Low Risk - You have a lower risk of heart disease and other health complications. Continue maintaining a healthy lifestyle with a balanced diet and regular exercise.", msg = "Low risk category mismatch for female");
    test:assertEquals(resultModerateRiskFemale, "Moderate Risk - You have a moderate risk of developing conditions like cardiovascular disease and diabetes. Incorporate moderate exercise and maintain a healthy, balanced diet to prevent further fat accumulation.", msg = "Moderate risk category mismatch for female");
    test:assertEquals(resultHighRiskFemale, "High Risk - You have a higher risk of developing obesity-related conditions, including heart disease, type 2 diabetes, and stroke. Focus on weight loss through a structured diet and regular cardiovascular + resistance training. Seek medical advice.", msg = "High risk category mismatch for female");
    test:assertEquals(resultLowRiskMale, "Low Risk - You have a lower risk of heart disease and other health complications. Continue maintaining a healthy lifestyle with a balanced diet and regular exercise.", msg = "Low risk category mismatch for male");
    test:assertEquals(resultModerateRiskMale, "Moderate Risk - You have a moderate risk of developing conditions like cardiovascular disease and diabetes. Incorporate moderate exercise and maintain a healthy, balanced diet to prevent further fat accumulation.", msg = "Moderate risk category mismatch for male");
    test:assertEquals(resultHighRiskMale, "High Risk - You have a higher risk of developing obesity-related conditions, including heart disease, type 2 diabetes, and stroke. Focus on weight loss through a structured diet and regular cardiovascular + resistance training. Seek medical advice.", msg = "High risk category mismatch for male");
}

@test:AfterSuite
function afterSuiteFunc() {
    io:println("Completed WHR Calculator Tests");
}