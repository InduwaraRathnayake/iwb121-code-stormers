import ballerina/test;
import ballerina/io;

@test:BeforeSuite
function beforeSuiteFunc() {
    io:println("BMI Calculator Tests");
}

@test:Config {}
function testCalculateBMI() {
    float height = 170.0;
    float weight = 70.0;
    float expectedBMI = 24.221453287197235;

    float result = calculateBMI(height, weight);
    test:assertEquals(result, expectedBMI, msg = "Expected BMI does not match the result");
}

@test:Config {}
function testCategorizeBMI() {
    float bmiUnderweight = 17.0;
    float bmiNormal = 21.0;
    float bmiRiskToOverweight = 24.0;
    float bmiOverweight = 27.0;
    float bmiObesity = 32.0;

    string resultUnderweight = categorizeBMI(bmiUnderweight);
    string resultNormal = categorizeBMI(bmiNormal);
    string resultRiskToOverweight = categorizeBMI(bmiRiskToOverweight);
    string resultOverweight = categorizeBMI(bmiOverweight);
    string resultObesity = categorizeBMI(bmiObesity);

    test:assertEquals(resultUnderweight, "Underweight - Your body is less than the normal recommended weight. You need to eat more nutritious food with adequate exercises.", msg = "Underweight category mismatch");
    test:assertEquals(resultNormal, "Normal weight - Your weight is within the normal recommended weight. Maintain your weight with adequate exercises.", msg = "Normal weight category mismatch");
    test:assertEquals(resultRiskToOverweight, "Risk to overweight - Your weight is within the normal recommended weight. Try to bring it down with more exercises and correct dietary practices.", msg = "Risk to overweight category mismatch");
    test:assertEquals(resultOverweight, "Overweight - Your weight is more than the normal recommended weight. Bring it down with more exercises and correct dietary practices.", msg = "Overweight category mismatch");
    test:assertEquals(resultObesity, "Obesity - Your weight is very much higher than the normal recommended weight and is a risk factor for many other diseases like diabetes and heart disease.", msg = "Obesity category mismatch");
}

@test:AfterSuite
function afterSuiteFunc() {
    io:println("Completed BMI Calculator Tests");
}