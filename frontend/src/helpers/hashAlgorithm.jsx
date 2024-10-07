// export default hashAlgorithm;
import CryptoJS from 'crypto-js';

const encryptString = (input, secretKey) => {
    return CryptoJS.AES.encrypt(input, secretKey).toString();
};

export default encryptString;


