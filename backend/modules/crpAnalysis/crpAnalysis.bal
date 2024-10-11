# Description.
#
# + crpLevel - C-reactive protein level
public type CRPData record {
    float crpLevel;
};

type AnalysisResult record {
    string text;
    string color;
};


# Description.
#
# + data - CRPData record
# + return - AnalysisResult array or error
public isolated function analyzeCRP(CRPData data) returns AnalysisResult[]|error {
    AnalysisResult[] interpretations = [];

    // Interpret CRP levels
    if (data.crpLevel < 1.0) {
        interpretations.push({ 
            "text": "CRP level is normal (Less than 1 mg/L): Indicates low risk for cardiovascular disease.", 
            "color": "green" 
        });
    } else if (data.crpLevel >= 1.0 && data.crpLevel <= 3.0) {
        interpretations.push({ 
            "text": "CRP level is mildly elevated (1-3 mg/L): May indicate a moderate risk for cardiovascular disease.", 
            "color": "red" 
        });
    } else {
        interpretations.push({ 
            "text": "CRP level is high (Greater than 3 mg/L): Indicates a higher risk for cardiovascular disease and possible inflammation in the body. Further evaluation is recommended.", 
            "color": "red" 
        });
    }

    return interpretations;
}