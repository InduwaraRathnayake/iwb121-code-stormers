# Description.
#
# + tsh - thyroid-stimulating hormone level
# + t3 - triiodothyronine level
# + t4 - thyroxine level
public 
type TFTData record {
    float tsh; 
    float t3;  
    float t4;  
};

type AnalysisResult record {
    string text;
    string color;
};

# Description.
#
# + data - TFTData record
# + return - AnalysisResult array or error
public isolated function analyzeTFT(TFTData data) returns AnalysisResult[]|error {
    AnalysisResult[] interpretations = [];

    // TSH Interpretation
    if (data.tsh < 0.4) {
        interpretations.push({ 
            "text": "TSH is low (Less than 0.4 mIU/L): Possible hyperthyroidism.", 
            "color": "blue" 
        });
    } else if (data.tsh >= 0.4 && data.tsh <= 4.0) {
        interpretations.push({ 
            "text": "TSH is normal (0.4 - 4.0 mIU/L): Healthy thyroid function.", 
            "color": "green" 
        });
    } else {
        interpretations.push({ 
            "text": "TSH is high (More than 4.0 mIU/L): Possible hypothyroidism.", 
            "color": "red" 
        });
    }

    // T3 Interpretation
    if (data.t3 < 0.8) {
        interpretations.push({ 
            "text": "T3 is low (Less than 0.8 ng/mL): Possible hypothyroidism.", 
            "color": "blue" 
        });
    } else if (data.t3 >= 0.8 && data.t3 <= 2.0) {
        interpretations.push({ 
            "text": "T3 is normal (0.8 - 2.0 ng/mL): Healthy thyroid function.", 
            "color": "green" 
        });
    } else {
        interpretations.push({ 
            "text": "T3 is high (More than 2.0 ng/mL): Possible hyperthyroidism.", 
            "color": "red" 
        });
    }

    // T4 Interpretation
    if (data.t4 < 4.5) {
        interpretations.push({ 
            "text": "T4 is low (Less than 4.5 µg/dL): Possible hypothyroidism.", 
            "color": "blue" 
        });
    } else if (data.t4 >= 4.5 && data.t4 <= 12.0) {
        interpretations.push({ 
            "text": "T4 is normal (4.5 - 12.0 µg/dL): Healthy thyroid function.", 
            "color": "green" 
        });
    } else {
        interpretations.push({ 
            "text": "T4 is high (More than 12.0 µg/dL): Possible hyperthyroidism.", 
            "color": "red" 
        });
    }

    return interpretations; 
}