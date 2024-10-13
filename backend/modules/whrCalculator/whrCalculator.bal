public isolated function calculateWHR(float waist, float hip) returns float {
    return waist / hip;
}

public isolated function categorizeWHR(float ratio, string gender) returns string {
    if (gender == "female") {
        if (ratio < 0.80) {
            return "Low Risk - You have a lower risk of heart disease and other health complications. Continue maintaining a healthy lifestyle with a balanced diet and regular exercise.";
        } else if (ratio >= 0.80 && ratio < 0.85) {
            return "Moderate Risk - You have a moderate risk of developing conditions like cardiovascular disease and diabetes. Incorporate moderate exercise and maintain a healthy, balanced diet to prevent further fat accumulation.";
        } else {
            return "High Risk - You have a higher risk of developing obesity-related conditions, including heart disease, type 2 diabetes, and stroke. Focus on weight loss through a structured diet and regular cardiovascular + resistance training. Seek medical advice.";
        }
    } else {
        if (ratio < 0.90) {
            return "Low Risk - You have a lower risk of heart disease and other health complications. Continue maintaining a healthy lifestyle with a balanced diet and regular exercise.";
        } else if (ratio >= 0.90 && ratio < 1.00) {
            return "Moderate Risk - You have a moderate risk of developing conditions like cardiovascular disease and diabetes. Incorporate moderate exercise and maintain a healthy, balanced diet to prevent further fat accumulation.";
        } else {
            return "High Risk - You have a higher risk of developing obesity-related conditions, including heart disease, type 2 diabetes, and stroke. Focus on weight loss through a structured diet and regular cardiovascular + resistance training. Seek medical advice.";
        }
    }
}