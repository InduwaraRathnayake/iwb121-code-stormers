import ballerina/io;
import ballerina/test;

// Before Suite Function

@test:BeforeSuite
function beforeSuiteFunc() {
    io:println("Starting FBC Analysis Tests");
}

// Test function for normal FBC values

@test:Config {}
function testNormalFBCValues() returns error? {
    FBCData data = {
        whiteBloodCells: 7.0,
        redBloodCells: 5.0,
        platelets: 250.0,
        hemoglobin: 15.0
    };
    AnalysisResult[] result = check analyzeFBC(data);
    test:assertEquals(result[0].text, "White Blood Cell count is normal, indicating a healthy immune system.");
    test:assertEquals(result[1].text, "Red Blood Cell count is normal, suggesting a balanced oxygen transport capacity.");
    test:assertEquals(result[2].text, "Hemoglobin level is normal, indicating effective oxygen transportation in the blood.");
    test:assertEquals(result[3].text, "Platelet count is normal, indicating a healthy coagulation process.");
}

// Test function for low FBC values

@test:Config {}
function testLowFBCValues() returns error?{
    FBCData data = {
        whiteBloodCells: 3.5,
        redBloodCells: 3.8,
        platelets: 120.0,
        hemoglobin: 12.0
    };
    AnalysisResult[] result = check analyzeFBC(data);
    test:assertEquals(result[0].text, "White Blood Cell count is low, indicating potential issues such as:\n- Bone marrow disorders\n- Autoimmune diseases\n- Certain infections\n- Chronic fatigue");
    test:assertEquals(result[1].text, "Red Blood Cell count is low, which could be due to:\n- Anemia\n- Blood loss\n- Nutritional deficiencies\n- Bone marrow issues");
    test:assertEquals(result[2].text, "Hemoglobin level is low, which may lead to:\n- Fatigue\n- Weakness\n- Paleness\n- Symptoms related to iron deficiency");
    test:assertEquals(result[3].text, "Platelet count is low (Thrombocytopenia), possibly caused by:\n- Bone marrow disorders\n- Autoimmune diseases\n- Certain medications\n- Severe infections");
}

// Test function for high FBC values

@test:Config {}
function testHighFBCValues() returns error? {
    FBCData data = {
        whiteBloodCells: 12.5,
        redBloodCells: 6.5,
        platelets: 450.0,
        hemoglobin: 18.0
    };
    AnalysisResult[] result = check analyzeFBC(data);
    test:assertEquals(result[0].text, "White Blood Cell count is high, suggesting possible conditions like:\n- Ongoing infections\n- Inflammation\n- Stress responses\n- Allergic reactions");
    test:assertEquals(result[1].text, "Red Blood Cell count is high, often related to:\n- Dehydration\n- Increased production due to low oxygen levels\n- Chronic lung diseases");
    test:assertEquals(result[2].text, "Hemoglobin level is high, which can result from:\n- Dehydration\n- Lung diseases\n- Heart diseases\n- Increased physical training");
    test:assertEquals(result[3].text, "Platelet count is high (Thrombocytosis), which may indicate:\n- Bone marrow disorders\n- Chronic inflammatory conditions\n- Iron deficiency");
}

// After Suite Function

@test:AfterSuite
function afterSuiteFunc() {
    io:println("Completed FBC Analysis Tests");
}
