// backend/services/bloodGlucoseService.bal

function analyzeBloodGlucose(BloodGlucoseData data) returns AnalysisResult[]|error  {
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
            "color": "orange" 
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
            "color": "orange" 
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
            "color": "orange" 
        });
    } else {
        interpretations.push({ 
            "text": "HbA1c indicates Diabetes: Levels above 6.5% suggest poor blood sugar control and potential complications.", 
            "color": "red" 
        });
    }

    return interpretations; // Return the analysis results as JSON
}