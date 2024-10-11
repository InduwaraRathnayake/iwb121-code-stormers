# Description.
#
# + fastingGlucose - fasting glucose level in mg/dL  
# + randomGlucose - random glucose level in mg/dL
# + hba1c - HbA1c level in percentage
public type BloodGlucoseData record {
    float fastingGlucose;
    float randomGlucose;
    float hba1c;
};

type AnalysisResult record {
    string text;
    string color;
};

# Description.
#
# + data - BloodGlucoseData record
# + return - AnalysisResult array or error
public isolated function analyzeBloodGlucose(BloodGlucoseData data) returns AnalysisResult[]|error  {
    AnalysisResult[] interpretations = [];
    
    // Fasting Glucose Interpretation
    if (data.fastingGlucose < 70.0) {
        interpretations.push({ 
            "text": "Fasting glucose is low, which can indicate:\n- Hypoglycemia: A condition where blood sugar levels drop too low.\n- Insulinoma: A rare tumor of the pancreas that secretes insulin.", 
            "color": "blue" 
        });
    } else if (data.fastingGlucose >= 70.0 && data.fastingGlucose <= 99.0) {
        interpretations.push({ "text": "Fasting glucose is normal, indicating healthy glucose metabolism.", "color": "green" });
    } else if (data.fastingGlucose >= 100.0 && data.fastingGlucose <= 125.0) {
        interpretations.push({ 
            "text": "Fasting glucose is elevated (Prediabetes): This condition is a warning sign for future diabetes.", 
            "color": "red" 
        });
    } else {
        interpretations.push({ "text": "Fasting glucose is high (Diabetes): This indicates that you may have diabetes.", "color": "red" });
    }

    // Random Glucose Interpretation
    if (data.randomGlucose < 140.0) {
        interpretations.push({ "text": "Random glucose is normal, suggesting good glucose regulation.", "color": "green" });
    } else if (data.randomGlucose >= 140.0 && data.randomGlucose <= 199.0) {
        interpretations.push({ 
            "text": "Random glucose indicates Prediabetes: Elevated glucose levels can increase the risk of developing type 2 diabetes.", 
            "color": "red" 
        });
    } else {
        interpretations.push({ "text": "Random glucose indicates Diabetes: Persistent high levels may require medical intervention.", "color": "red" });
    }

    // HbA1c Interpretation
    if (data.hba1c < 5.7) {
        interpretations.push({ "text": "HbA1c is normal, indicating well-controlled blood sugar levels.", "color": "green" });
    } else if (data.hba1c >= 5.7 && data.hba1c < 6.5) {
        interpretations.push({ 
            "text": "HbA1c indicates Prediabetes: This is an important marker for long-term blood sugar control.", 
            "color": "red" 
        });
    } else {
        interpretations.push({ 
            "text": "HbA1c indicates Diabetes: Levels above 6.5% suggest poor blood sugar control and potential complications.", 
            "color": "red" 
        });
    }

    return interpretations;
}