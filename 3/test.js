const Block = require('./Block');
const Blockchain = require('./Blockchain');
const assert = require('assert');
const SHA256 = require("crypto-js/sha256");

describe('Block', function() {
    it('should store a random name', function() {
        const randomName = 'randomName'
        assert.equal(randomName, new Block(randomName).data)
    });

    it('should hash some random data', function() {
        const randomEmail = 'randomEmail@email.com';
        const myHash = SHA256(randomEmail).toString();
        const yourHash = new Block(randomEmail).toHash().toString();
        assert.equal(myHash, yourHash);
    })
})

let blockchain;

describe('Blockchain', function() {
    before(() => {
        blockchain = new Blockchain();
    });

    it('should have an addBlock function', function() {
        assert.equal(typeof blockchain.addBlock, 'function');
    });

    describe('adding new blocks', function() {
        let block1;
        let block2;
        before(() => {
            block1 = new Block("Some data");
            block2 = new Block("Some other data");
            blockchain.addBlock(block1);
            blockchain.addBlock(block2);
        });

        it('should be a chain of three blocks', function() {
            assert.equal(blockchain.chain.length, 3);
        });

        it('should include block1 and block2', function () {
            assert(blockchain.chain.some((x) => x === block1), "Could not find block1. Remember to push the block argument in addBlock!")
            assert(blockchain.chain.some((x) => x === block2), "Could not find block1. Remember to push the block argument in addBlock!")
        });
    });
});

describe('Linking Blocks', function () {
    beforeEach(() => {
        blockchain = new Blockchain();
    });
    
    describe('adding a new block to our blockchain', function () {
        let genesisBlock;
        let block1;
        beforeEach(() => {
            genesisBlock = new Block(5);
            block1 = new Block(5);
            blockchain.addBlock(genesisBlock);
            blockchain.addBlock(block1);
        });

        it('should have a previousHash property equal to the previous blocks hash', function () {
            assert.equal(block1.previousHash.toString(), genesisBlock.toHash().toString());
        });

        describe('after changing the genesis block data', () => {
            let initialGenesisHash;
            let intiialBlock1Hash;
            beforeEach(() => {
                initialGenesisHash = genesisBlock.toHash().toString();
                intiialBlock1Hash = block1.toHash().toString();
                genesisBlock.data = 10;
            });

            it('should alter the genesis hash', () => {
                const newHash = genesisBlock.toHash().toString();
                assert.notEqual(initialGenesisHash, newHash, "Expected changing the genesis blocks data to change its hash calculation!");    
            });

            it('should alter the second blocks hash', () => {
                const newHash = genesisBlock.toHash().toString();
                assert.notEqual(intiialBlock1Hash, newHash, "Expected changing the genesis blocks data to change the second blocks hash calculation!");
            });
        });
    });
});


describe('Blockchain Validation', function() {
    let blockchain;
    beforeEach(() => {
      blockchain = new Blockchain();
      blockchain.addBlock(new Block("Dan"));
      blockchain.addBlock(new Block("Peter"));
      blockchain.addBlock(new Block("James"));
    });
    
    it('should be considered valid', function() {
      assert(blockchain.isValid());
    });
  
    describe('tampering with a previousHash', function() {
      beforeEach(() => {
        blockchain.chain[1].previousHash = SHA256("gibberish");
      });
  
      it('should not be considered valid', function() {
        assert(!blockchain.isValid());
      });
    });
    
    describe('tampering with data', function() {
      beforeEach(() => {
        blockchain.chain[0].data = "Something Else";
      });
  
      it('should not be considered valid', function() {
        assert(!blockchain.isValid());
      });
    });
  });
  