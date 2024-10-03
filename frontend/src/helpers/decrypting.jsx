// //decrypting the hash using SHA-256 algorithm
// const decryptHash = async (hash) => {
//     const decoder = new TextDecoder();
//     const decrypted = decoder.decode(hash).toString();
//     return decrypted;
// };

// export default decryptHash;

import CryptoJS from 'crypto-js';

const decryptHash = (ciphertext, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to string
};

export default decryptHash;