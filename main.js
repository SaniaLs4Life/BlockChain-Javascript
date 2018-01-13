const SHA256 = require('crypto-js/sha256');
class Block{
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}
class BlockChain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock(){
    return new Block(0, '01/01/2018', 'Genesis Block', '0');
  }
  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currenctBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];  

      if(currenctBlock.hash !== currenctBlock.calculateHash()){
        return false;
      }
      if(currenctBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }
    return true;
  }
}  

let epCoin = new BlockChain();
epCoin.addBlock(new Block(1, '01/01/2018', { amount : 4}));
epCoin.addBlock(new Block(1, '08/04/2018', { amount : 10}));

//console.log('Is BlockChain valid ? ' + hakanCoin.isChainValid());

console.log(JSON.stringify(epCoin, null ,4));