import java.sql.Timestamp;
import java.util.ArrayList;


public class Block {
    private Timestamp timestamp;
    private Object data;
    private int previousHash;
    private int hash;
    ArrayList<Block> chain = new ArrayList<Block>();
    private static boolean isFirst = true;

    public Block(Timestamp timestamp, Object data) {
        if (!isFirst) throw new IllegalArgumentException("Non è il primo block");
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = 0;
        hash = hashCode();
        chain.add(this);
        isFirst = false;
    }

    public Block(Timestamp timestamp, Object data, int previousHash) {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        hash = hashCode();
        int temp = chain.size() - 1;
        chain.add(this);
    }

    public int getHash() {
        return hash;
    }
    private Block getLastBlock() {
        return chain.get(chain.size() - 1);
    }
    @Override
    public int hashCode() {
        int temp = 17;
        temp = 31 * temp + timestamp.hashCode();
        temp = 31 * temp + data.hashCode();
        return temp;
    }

    public boolean isValidBlock(Block previousBlock) {
        return (previousHash == previousBlock.hash);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Block)) return false;
        Block block = (Block) o;
        return timestamp.equals(block.timestamp) && data.equals(block.data);
    }
}
