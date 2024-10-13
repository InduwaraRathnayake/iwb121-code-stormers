public isolated function calculateBMI(float height, float weight) returns float {
    return weight / ((height / 100) * (height / 100));
}

public isolated function categorizeBMI(float bmi) returns string {
    if (bmi < 18.5) {
        return "Underweight - Your body is less than the normal recommended weight. You need to eat more nutritious food with adequate exercises.";
    } else if (bmi >= 18.5 && bmi <= 22.9) {
        return "Normal weight - Your weight is within the normal recommended weight. Maintain your weight with adequate exercises.";
    } else if (bmi >= 23.0 && bmi <= 24.9) {
        return "Risk to overweight - Your weight is within the normal recommended weight. Try to bring it down with more exercises and correct dietary practices.";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        return "Overweight - Your weight is more than the normal recommended weight. Bring it down with more exercises and correct dietary practices.";
    } else {
        return "Obesity - Your weight is very much higher than the normal recommended weight and is a risk factor for many other diseases like diabetes and heart disease.";
    }
}