
// Define the data model for FBC input
public type FBCData record {
    float whiteBloodCells;
    float redBloodCells;
    float platelets;
    float hemoglobin;
};

type AnalysisResult record {
    string text;
    string color;
};

public function analyzeFBC(FBCData data) returns AnalysisResult[]|error {
    AnalysisResult[] interpretations = [];

    // WBC Interpretation
    if (data.whiteBloodCells < 4.5) {
        interpretations.push({ 
            "text": "White Blood Cell count is low, indicating potential issues such as:\n- Bone marrow disorders\n- Autoimmune diseases\n- Certain infections\n- Chronic fatigue", 
            "color": "blue" 
        });
    } else if (data.whiteBloodCells > 11.0) {
        interpretations.push({ 
            "text": "White Blood Cell count is high, suggesting possible conditions like:\n- Ongoing infections\n- Inflammation\n- Stress responses\n- Allergic reactions", 
            "color": "red" 
        });
    } else {
        interpretations.push({ "text": "White Blood Cell count is normal, indicating a healthy immune system.", "color": "green" });
    }

    // RBC Interpretation
    if (data.redBloodCells < 4.1) {
        interpretations.push({ 
            "text": "Red Blood Cell count is low, which could be due to:\n- Anemia\n- Blood loss\n- Nutritional deficiencies\n- Bone marrow issues", 
            "color": "blue" 
        });
    } else if (data.redBloodCells > 6.1) {
        interpretations.push({ 
            "text": "Red Blood Cell count is high, often related to:\n- Dehydration\n- Increased production due to low oxygen levels\n- Chronic lung diseases", 
            "color": "red" 
        });
    } else {
        interpretations.push({ "text": "Red Blood Cell count is normal, suggesting a balanced oxygen transport capacity.", "color": "green" });
    }

    // Hemoglobin Interpretation
    if (data.hemoglobin < 13.8) {
        interpretations.push({ 
            "text": "Hemoglobin level is low, which may lead to:\n- Fatigue\n- Weakness\n- Paleness\n- Symptoms related to iron deficiency", 
            "color": "blue" 
        });
    } else if (data.hemoglobin > 17.2) {
        interpretations.push({ 
            "text": "Hemoglobin level is high, which can result from:\n- Dehydration\n- Lung diseases\n- Heart diseases\n- Increased physical training", 
            "color": "red" 
        });
    } else {
        interpretations.push({ "text": "Hemoglobin level is normal, indicating effective oxygen transportation in the blood.", "color": "green" });
    }

    // Platelets Interpretation
    if (data.platelets < 150.0) {
        interpretations.push({ 
            "text": "Platelet count is low (Thrombocytopenia), possibly caused by:\n- Bone marrow disorders\n- Autoimmune diseases\n- Certain medications\n- Severe infections", 
            "color": "blue" 
        });
    } else if (data.platelets > 400.0) {
        interpretations.push({ 
            "text": "Platelet count is high (Thrombocytosis), which may indicate:\n- Bone marrow disorders\n- Chronic inflammatory conditions\n- Iron deficiency", 
            "color": "red" 
        });
    } else {
        interpretations.push({ text: "Platelet count is normal, indicating a healthy coagulation process.", color: "green" });
    }

    return interpretations; // Return the analysis results as JSON
}