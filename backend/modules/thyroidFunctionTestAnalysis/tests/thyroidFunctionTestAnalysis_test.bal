import ballerina/io;
import ballerina/test;

// Before Suite Function

@test:BeforeSuite
function beforeSuiteFunc() {
    io:println("Starting TFT Analysis Tests");
}

// Test function for normal TFT values

@test:Config {}
function testNormalTFTValues() returns error? {
    TFTData data = {
        tsh: 2.0,
        t3: 1.5,
        t4: 8.0
    };
    AnalysisResult[] result = check analyzeTFT(data);
    test:assertEquals(result[0].text, "TSH is normal (0.4 - 4.0 mIU/L): Healthy thyroid function.");
    test:assertEquals(result[1].text, "T3 is normal (0.8 - 2.0 ng/mL): Healthy thyroid function.");
    test:assertEquals(result[2].text, "T4 is normal (4.5 - 12.0 µg/dL): Healthy thyroid function.");
}

// Test function for low TFT values

@test:Config {}
function testLowTFTValues() returns error? {
    TFTData data = {
        tsh: 0.2,
        t3: 0.5,
        t4: 3.5
    };
    AnalysisResult[] result = check analyzeTFT(data);
    test:assertEquals(result[0].text, "TSH is low (Less than 0.4 mIU/L): Possible hyperthyroidism.");
    test:assertEquals(result[1].text, "T3 is low (Less than 0.8 ng/mL): Possible hypothyroidism.");
    test:assertEquals(result[2].text, "T4 is low (Less than 4.5 µg/dL): Possible hypothyroidism.");
}

// Test function for high TFT values

@test:Config {}
function testHighTFTValues() returns error? {
    TFTData data = {
        tsh: 5.5,
        t3: 2.5,
        t4: 13.0
    };
    AnalysisResult[] result = check analyzeTFT(data);
    test:assertEquals(result[0].text, "TSH is high (More than 4.0 mIU/L): Possible hypothyroidism.");
    test:assertEquals(result[1].text, "T3 is high (More than 2.0 ng/mL): Possible hyperthyroidism.");
    test:assertEquals(result[2].text, "T4 is high (More than 12.0 µg/dL): Possible hyperthyroidism.");
}

// After Suite Function

@test:AfterSuite
function afterSuiteFunc() {
    io:println("Completed TFT Analysis Tests");
}
