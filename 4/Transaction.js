class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs
        this.outputUTXOs = outputUTXOs
    }
    execute() {
        if (this.inputUTXOs.find(u => u.spent === true)) 
            throw Error("already spent")
        
        const totInput = this.inputUTXOs.reduce((acc, curr) => acc + curr.amount,  0)
        const totOutput = this.outputUTXOs.reduce((acc, curr) => acc + curr.amount,  0)

        if (totInput < totOutput)
            throw Error("is less than the total value of the outputs")

        this.inputUTXOs.forEach(u => u.spent = true)
        this.outputUTXOs.forEach(u => u.spent = true)

        this.fee = totInput - totOutput
    }
}

module.exports = Transaction;