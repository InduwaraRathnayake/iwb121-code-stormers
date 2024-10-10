// Define the data model for Lipid Panel input
public type LipidPanelData record {
    float cholesterol;
    float triglycerides;
    float hdl; // High-Density Lipoprotein
    float ldl; // Low-Density Lipoprotein
};

type AnalysisResult record {
    string text;
    string color;
};

public isolated function analyzeLipidPanel(LipidPanelData data) returns AnalysisResult[]|error {
    AnalysisResult[] interpretations = [];

    // Cholesterol Interpretation
    if (data.cholesterol < 200.0) {
        interpretations.push({ 
            "text": "Total Cholesterol is normal (Less than 200 mg/dL): Good heart health.", 
            "color": "green" 
        });
    } else if (data.cholesterol >= 200.0 && data.cholesterol <= 239.0) {
        interpretations.push({ 
            "text": "Total Cholesterol is borderline high (200-239 mg/dL): Risk for heart disease may be present.", 
            "color": "orange" 
        });
    } else {
        interpretations.push({ 
            "text": "Total Cholesterol is high (240 mg/dL and above): Increased risk for heart disease.", 
            "color": "red" 
        });
    }

    // Triglycerides Interpretation
    if (data.triglycerides < 150.0) {
        interpretations.push({ 
            "text": "Triglycerides are normal (Less than 150 mg/dL).", 
            "color": "green" 
        });
    } else if (data.triglycerides >= 150.0 && data.triglycerides < 199.0) {
        interpretations.push({ 
            "text": "Triglycerides are borderline high (150-199 mg/dL).", 
            "color": "orange" 
        });
    } else {
        interpretations.push({ 
            "text": "Triglycerides are high (200 mg/dL and above).", 
            "color": "red" 
        });
    }

    // HDL Interpretation
    if (data.hdl < 40.0) {
        interpretations.push({ 
            "text": "HDL (Good Cholesterol) is low (Less than 40 mg/dL): Risk factor for heart disease.", 
            "color": "red" 
        });
    } else if (data.hdl >= 40.0 && data.hdl < 60.0) {
        interpretations.push({ 
            "text": "HDL (Good Cholesterol) is acceptable (40-60 mg/dL).", 
            "color": "orange" 
        });
    } else {
        interpretations.push({ 
            "text": "HDL (Good Cholesterol) is high (60 mg/dL and above): Protective against heart disease.", 
            "color": "green" 
        });
    }

    // LDL Interpretation
    if (data.ldl < 100.0) {
        interpretations.push({ 
            "text": "LDL (Bad Cholesterol) is optimal (Less than 100 mg/dL).", 
            "color": "green" 
        });
    } else if (data.ldl >= 100.0 && data.ldl < 129.0) {
        interpretations.push({ 
            "text": "LDL (Bad Cholesterol) is near optimal (100-129 mg/dL).", 
            "color": "orange" 
        });
    } else if (data.ldl >= 130.0 && data.ldl < 159.0) {
        interpretations.push({ 
            "text": "LDL (Bad Cholesterol) is borderline high (130-159 mg/dL).", 
            "color": "orange" 
        });
    } else if (data.ldl >= 160.0 && data.ldl < 189.0) {
        interpretations.push({ 
            "text": "LDL (Bad Cholesterol) is high (160-189 mg/dL).", 
            "color": "red"
        });
    } else {
        interpretations.push({ 
            "text": "LDL (Bad Cholesterol) is very high (190 mg/dL and above): High risk for heart disease.", 
            color: "red"
        });
    }

    return interpretations; // Return the analysis results as JSON
}