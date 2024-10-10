// Define the data model for LFT input
public type LFTData record {
    float alt;      // Alanine Aminotransferase
    float ast;      // Aspartate Aminotransferase
    float alp;      // Alkaline Phosphatase
    float bilirubin; // Total Bilirubin
};

type AnalysisResult record {
    string text;
    string color;
};

public isolated function analyzeLFT(LFTData data) returns AnalysisResult[]|error {
    AnalysisResult[] interpretations = [];

    // ALT Interpretation
    if (data.alt < 40.0) {
        interpretations.push({ 
            "text": "ALT is normal (Less than 40 U/L): Healthy liver function.", 
            "color": "green" 
        });
    } else {
        interpretations.push({ 
            "text": "ALT is elevated (40 U/L and above): Possible liver damage or inflammation.", 
            "color": "red" 
        });
    }

    // AST Interpretation
    if (data.ast < 40.0) {
        interpretations.push({ 
            "text": "AST is normal (Less than 40 U/L): Healthy liver function.", 
            "color": "green" 
        });
    } else {
        interpretations.push({ 
            "text": "AST is elevated (40 U/L and above): Possible liver damage or disease.", 
            "color": "red" 
        });
    }

    // ALP Interpretation
    if (data.alp < 120.0) {
        interpretations.push({ 
            "text": "ALP is normal (Less than 120 U/L): Healthy liver and bone function.", 
            "color": "green" 
        });
    } else {
        interpretations.push({ 
            "text": "ALP is elevated (120 U/L and above): Possible bile duct obstruction or liver disease.", 
            "color": "red" 
        });
    }

    // Bilirubin Interpretation
    if (data.bilirubin < 1.2) {
        interpretations.push({ 
            "text": "Bilirubin is normal (Less than 1.2 mg/dL): Healthy liver function.", 
            "color": "green"
        });
    } else {
        interpretations.push({ 
            "text": "Bilirubin is elevated (1.2 mg/dL and above): Possible liver disease or bile duct obstruction.", 
            "color": "red"
        });
    }

    return interpretations; // Return the analysis results as JSON
}