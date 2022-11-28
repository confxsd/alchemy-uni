const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [ new Block("here") ];
    }

    addBlock(block) {
        const lastBlock = this.chain[this.chain.length - 1]
        block.previousHash = lastBlock.toHash()
        
        this.chain.push(block)
    }

    isValid() {
        let cLen = this.chain.length
        let i = cLen

        while(i-- > 2) {
            let c = this.chain[i - 1]
            let p = this.chain[i - 2]
            if (c.previousHash.toString() !== p.toHash().toString()) 
                return false
        }

        return true
    }
}

module.exports = Blockchain;