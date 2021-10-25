import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static java.nio.charset.StandardCharsets.UTF_8;

public class Block {
    private String hash;
    private final String data;
    private final long timeStamp;
    private int nonce;
    private Block nextBlock;
    private Block previousBlock;

    public Block(String data, Block previousBlock, long timeStamp) {
        this.nextBlock = null;
        this.previousBlock = previousBlock;
        this.data = data;
        this.timeStamp = timeStamp;
        this.hash = calculateBlockHash();
    }

    private String calculateBlockHash() {
        String dataToHash;
        if(previousBlock != null)
            dataToHash = timeStamp + data + nonce + previousBlock.hash;
        else dataToHash = timeStamp + data + nonce;
        MessageDigest digest;
        byte[] bytes = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
            bytes = digest.digest(dataToHash.getBytes(UTF_8));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        StringBuilder buffer = new StringBuilder();
        for (byte b : bytes) {
            buffer.append(String.format("%02x", b));
        }
        return buffer.toString();
    }

    public void mineBlock(int prefix) {
        String prefixString = new String(new char[prefix]).replace('\0', '0');
        while (!hash.substring(0, prefix).equals(prefixString)) {
            nonce++;
            this.hash = calculateBlockHash();
        }
    }

    public void setNextBlock(Block nextBlock){
        this.nextBlock = nextBlock;
    }

    public void setPreviousBlock(Block previousBlock){
        this.previousBlock = previousBlock;
    }

    public Block getNextBlock(){
        return this.nextBlock;
    }

    @Override
    public String toString() {
        return "Block{" +
                "hash='" + hash + '\'' +
                ", data='" + data + '\'' +
                ", timeStamp=" + timeStamp +
                ", nextBlock=" + nextBlock +
                '}';
    }

}