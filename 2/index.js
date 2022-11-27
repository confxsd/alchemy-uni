const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    // TODO: add transaction to mempool
    mempool.push(transaction)
}

function mine() {

    let i = 0, mpLen = mempool.length
    let transactions = []
    
    while(i++ < mpLen) {
        transactions.push(mempool.pop())
        if (i >= MAX_TRANSACTIONS) break
    }
    // TODO: mine a block


    const block =  {
        id : blocks.length,
        transactions,
        nonce: 0
    }
    
    let n = 0
    while(true) {
        block.nonce = n++
        const str = JSON.stringify(block)

        const hash = SHA256(str)
        const int = BigInt(`0x${hash}`)

        if (int < TARGET_DIFFICULTY) {
            block.hash = hash
            break
        }

    }
    
    blocks.push(block)

}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};