// backend/models/bloodGlucoseModel.bal

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
    float hdl; // High-Density Lipoprotein
    float ldl; // Low-Density Lipoprotein
};

// Define the data model for LFT input
type LFTData record {
    float alt;      // Alanine Aminotransferase
    float ast;      // Aspartate Aminotransferase
    float alp;      // Alkaline Phosphatase
    float bilirubin; // Total Bilirubin
};

// Define the data model for TFT input
type TFTData record {
    float tsh; // Thyroid Stimulating Hormone
    float t3;  // Triiodothyronine
    float t4;  // Thyroxine
};