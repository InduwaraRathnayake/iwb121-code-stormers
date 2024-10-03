// // hashing any string using SHA-256 algorithm
// const hashAlgorithm = async function hashString(input) {
//     // Convert the input string to a Uint8Array
//     const encoder = new TextEncoder();
//     const data = encoder.encode(input);
    
//     // Use the Web Crypto API to compute the SHA-256 hash
//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
//     // Convert the ArrayBuffer to a hex string
//     const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
//     const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // Convert bytes to hex
//     return hashHex;
// }

// export default hashAlgorithm;
import CryptoJS from 'crypto-js';

const encryptString = (input, secretKey) => {
    return CryptoJS.AES.encrypt(input, secretKey).toString();
};

export default encryptString;


