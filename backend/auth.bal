import ballerina/crypto;

// Function to hash the password using SHA-512
isolated function hashPassword(string password) returns byte[]|error {
    byte[] passwordBytes = password.toBytes();
    return crypto:hashSha512(passwordBytes);
}

// Function to encrypt the hashed password using RSA
isolated function encryptPasswordHash(byte[] hashedPassword) returns byte[]|error {
    crypto:PublicKey publicKey = check decodePublicKey();
    return crypto:encryptRsaEcb(hashedPassword, publicKey);
}

// Function to obtain the RSA private key from a key file
isolated function decodePrivateKey() returns crypto:PrivateKey|error {
    string keyFile = "resources/private.key";
    crypto:PrivateKey privateKey = check crypto:decodeRsaPrivateKeyFromKeyFile(keyFile, "wellnessipss");
    return privateKey;
}


// Function to decrypt the encrypted hash using the private key
isolated function decryptPasswordHash(byte[] encryptedHash) returns byte[]|error {
    crypto:PrivateKey privateKey = check decodePrivateKey();
    return check crypto:decryptRsaEcb(encryptedHash, privateKey);
}

// Function to obtain the RSA public key from a certificate file
isolated function decodePublicKey() returns crypto:PublicKey|error {
    string certFile = "resources/public.crt";
    crypto:PublicKey publicKey = check crypto:decodeRsaPublicKeyFromCertFile(certFile);
    return publicKey;
}

// Define HTTP status codes
const int STATUS_UNAUTHORIZED = 401;
const string MSG_LOGIN_SUCCESS = "Login successful";
const string MSG_LOGIN_FAILED = "Login failed : Invalid email or password";
const string MSG_USER_NOT_FOUND = "User not found";
const string MSG_PASSWORD_RESET_SUCCESS = "Password reset successful";
const string MSG_PASSWORD_RESET_FAILED = "Password reset failed";
const string MSG_NAME_CHANGE_SUCCESS = "Name changed successfully";
const string MSG_NAME_CHANGE_FAILED = "Failed to change name";
const string MSG_USER_DELETE_SUCCESS = "User deleted successfully";
const string MSG_USER_DELETE_FAILED = "Failed to delete user";
