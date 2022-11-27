const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

function hashMessage(message) {
    const hash = keccak256(utf8ToBytes(message)); 
    return hash
}

async function signMessage(msg) {
    const publicKey = secp.getPublicKey(PRIVATE_KEY);
    //const msgHash = await secp.utils.sha256(msg)
    const msgHash = hashMessage(msg)

    const signature = await secp.sign(msgHash, PRIVATE_KEY, { recovered: true});

    return signature
}

async function recoverKey(message, signature, recoveryBit) {
    return secp.recoverPublicKey(
        hashMessage(message),
        signature,
        recoveryBit
    )
}

function getAddress(publicKey) {
    const fByte = publicKey.slice(0,1)
    const rest = keccak256(publicKey.slice(1))

    return rest.slice(-20)
}