import java.util.Date;

public class Blockchain {

    private Block chainHead;
    private Block currentLastBlock;
    private final int prefix;

    public Blockchain(int prefix){
        this.prefix = prefix;
        chainHead = null;
        currentLastBlock = null;
    }

    public void addBlock(Block blockToAdd){
        if(chainHead == null) {
            blockToAdd.mineBlock(this.prefix);
            this.chainHead = blockToAdd;
            currentLastBlock = blockToAdd;
            return;
        }
        blockToAdd.setPreviousBlock(currentLastBlock);
        currentLastBlock.setNextBlock(blockToAdd);
        blockToAdd.mineBlock(this.prefix);
        currentLastBlock = blockToAdd;
    }

    public void printBlockChain(){
        Block currentBlock = this.chainHead;
        while(currentBlock != null) {
            System.out.println(currentBlock);
            currentBlock = currentBlock.getNextBlock();
        }

    }

    public static void main(String[] args) {
        Blockchain blockchain = new Blockchain(3);
        blockchain.addBlock(new Block("Prova1", null, new Date().getTime()));
        blockchain.addBlock(new Block("Prova2", null, new Date().getTime()));
        blockchain.addBlock(new Block("Prova3", null, new Date().getTime()));
        blockchain.addBlock(new Block("Prova4", null, new Date().getTime()));
        blockchain.printBlockChain();
    }
}
