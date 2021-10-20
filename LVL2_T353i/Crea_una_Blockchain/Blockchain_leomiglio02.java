import java.util.Date;

public class Blockchain_leomiglio02 {
    private Block_leomiglio02[] blocks = new Block_leomiglio02[100];
    private int actualBlock = 0;

    public Blockchain_leomiglio02(Block_leomiglio02 b) {
        addBlock(b);
    }

    public void addBlock(Block_leomiglio02 b){
        if(b==null)
            throw new NullPointerException("Block is null");
        
        //se non c'è spazio raddoppiamo la dimensione dell'array creandone un'altro grande il doppio e copiando i valor
        if(actualBlock == blocks.length-1){
            Block_leomiglio02[] newBlocks = new Block_leomiglio02[blocks.length*2];
            for(int i=0;i<newBlocks.length;i++)
                newBlocks[i] = blocks[i];
            blocks=newBlocks;
        }

        blocks[actualBlock]=b;// aggiungiamo b
        if(actualBlock>0){// esiste un blocco precedente quindi salviamo il blocco precedente e successivo dei rispettivi valori
            blocks[actualBlock-1].setSuccessivo(b);
            blocks[actualBlock].setPrecedente(blocks[actualBlock-1]);
        }

        actualBlock++;
    }
    public static void main(String[] args) {
        Block_leomiglio02 b1= new Block_leomiglio02("Questo è il primo blocco", new Date(System.currentTimeMillis()));
        Blockchain_leomiglio02 blockchain = new Blockchain_leomiglio02(b1);
        Block_leomiglio02 b2= new Block_leomiglio02("Questo è il secondo blocco", new Date(System.currentTimeMillis()));
        blockchain.addBlock(b2)
    }
}