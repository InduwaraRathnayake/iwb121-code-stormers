type BloodGlucoseData record {
    float fastingGlucose;
    float randomGlucose;
    float hba1c;
};

type AnalysisResult record {
    string text;
    string color;
};

// Define the data model for CRP input
type CRPData record {
    float crpLevel;
};

// Define the data model for FBC input
type FBCData record {
    float whiteBloodCells;
    float redBloodCells;
    float platelets;
    float hemoglobin;
};

// Define the data model for Lipid Panel input
type LipidPanelData record {
    float cholesterol;
    float triglycerides;
    float hdl; 
    float ldl; 
};

// Define the data model for LFT input
type LFTData record {
    float alt;      
    float ast;     
    float alp;     
    float bilirubin; 
};

// Define the data model for TFT input
type TFTData record {
    float tsh; 
    float t3;  
    float t4;  
};