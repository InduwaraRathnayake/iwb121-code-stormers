import ballerina/io;
import ballerina/test;

@test:BeforeSuite
function beforeSuiteFunc() {
    io:println("Starting LFT analysis tests...");
}

// Test functions for normalLFT values
@test:Config {}
function testLFTNormal() returns error? {
    LFTData normalData = { alt: 30.0, ast: 35.0, alp: 100.0, bilirubin: 0.8 };
    AnalysisResult[] results = check analyzeLFT(normalData);

    test:assertEquals(results[0].text, "ALT is normal (Less than 40 U/L): Healthy liver function.");
    test:assertEquals(results[1].text, "AST is normal (Less than 40 U/L): Healthy liver function.");
    test:assertEquals(results[2].text, "ALP is normal (Less than 120 U/L): Healthy liver and bone function.");
    test:assertEquals(results[3].text, "Bilirubin is normal (Less than 1.2 mg/dL): Healthy liver function.");
}

// Test functions for elevated LFT values
@test:Config {}
function testLFTElevated() returns error? {
    LFTData elevatedData = { alt: 50.0, ast: 45.0, alp: 130.0, bilirubin: 1.5 };
    AnalysisResult[] results = check analyzeLFT(elevatedData);

    test:assertEquals(results[0].text, "ALT is elevated (40 U/L and above): Possible liver damage or inflammation.");
    test:assertEquals(results[1].text, "AST is elevated (40 U/L and above): Possible liver damage or disease.");
    test:assertEquals(results[2].text, "ALP is elevated (120 U/L and above): Possible bile duct obstruction or liver disease.");
    test:assertEquals(results[3].text, "Bilirubin is elevated (1.2 mg/dL and above): Possible liver disease or bile duct obstruction.");
}

@test:AfterSuite
function afterSuiteFunc() {
    io:println("Completed LFT analysis tests.");
}
