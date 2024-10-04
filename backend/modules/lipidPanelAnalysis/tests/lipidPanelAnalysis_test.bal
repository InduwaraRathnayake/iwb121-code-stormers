import ballerina/io;
import ballerina/test;

// Before Suite Function
@test:BeforeSuite
function beforeSuiteFunc() {
    io:println("Starting Lipid Panel Analysis Tests");
}

// Test function for normal Lipid Panel values
@test:Config {}
function testNormalLipidPanelValues() returns error?{
    LipidPanelData data = {
        cholesterol: 180.0,
        triglycerides: 120.0,
        hdl: 65.0,
        ldl: 95.0
    };
    AnalysisResult[] result = check analyzeLipidPanel(data);
    test:assertEquals(result[0].text, "Total Cholesterol is normal (Less than 200 mg/dL): Good heart health.");
    test:assertEquals(result[1].text, "Triglycerides are normal (Less than 150 mg/dL).");
    test:assertEquals(result[2].text, "HDL (Good Cholesterol) is high (60 mg/dL and above): Protective against heart disease.");
    test:assertEquals(result[3].text, "LDL (Bad Cholesterol) is optimal (Less than 100 mg/dL).");
}

// Test function for borderline Lipid Panel values
@test:Config {}
function testBorderlineLipidPanelValues() returns error? {
    LipidPanelData data = {
        cholesterol: 210.0,
        triglycerides: 160.0,
        hdl: 45.0,
        ldl: 130.0
    };
    AnalysisResult[] result = check analyzeLipidPanel(data);
    test:assertEquals(result[0].text, "Total Cholesterol is borderline high (200-239 mg/dL): Risk for heart disease may be present.");
    test:assertEquals(result[1].text, "Triglycerides are borderline high (150-199 mg/dL).");
    test:assertEquals(result[2].text, "HDL (Good Cholesterol) is acceptable (40-60 mg/dL).");
    test:assertEquals(result[3].text, "LDL (Bad Cholesterol) is borderline high (130-159 mg/dL).");
}

// Test function for high Lipid Panel values
@test:Config {}
function testHighLipidPanelValues() returns error? {
    LipidPanelData data = {
        cholesterol: 250.0,
        triglycerides: 220.0,
        hdl: 35.0,
        ldl: 180.0
    };
    AnalysisResult[] result = check analyzeLipidPanel(data);
    test:assertEquals(result[0].text, "Total Cholesterol is high (240 mg/dL and above): Increased risk for heart disease.");
    test:assertEquals(result[1].text, "Triglycerides are high (200 mg/dL and above).");
    test:assertEquals(result[2].text, "HDL (Good Cholesterol) is low (Less than 40 mg/dL): Risk factor for heart disease.");
    test:assertEquals(result[3].text, "LDL (Bad Cholesterol) is high (160-189 mg/dL).");
}

// After Suite Function
@test:AfterSuite
function afterSuiteFunc() {
    io:println("Completed Lipid Panel Analysis Tests");
}
