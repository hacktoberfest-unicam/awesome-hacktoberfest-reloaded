import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;


public class Client {

    private static int PORT = 9991;
    private Socket socket;
    private BufferedReader in;
    private PrintWriter out;

    private GameGrid grid;

    public Client(String serverAddress) throws Exception {

        grid = new GameGrid();
        socket = new Socket(serverAddress, PORT);
        in = new BufferedReader(new InputStreamReader(
                socket.getInputStream()));
        out = new PrintWriter(socket.getOutputStream(), true);
    }

    public void play() throws Exception {
        String response;
        try {
            response = in.readLine();
            if (response.startsWith("WELCOME")) {
                char mark = response.charAt(8);
            }
            while (true) {
                response = in.readLine();
                if (response.startsWith("OPPONENT_MOVED")) {
                    int loc = Integer.parseInt(response.substring(15));
                    grid.getGrid()[loc][loc] = 'X';
                } else if (response.startsWith("VICTORY")) {
                    System.out.println("You win");
                    break;
                } else if (response.startsWith("DEFEAT")) {
                    System.out.println("You lose");
                    break;
                } else if (response.startsWith("TIE")) {
                    System.out.println("You tied");
                    break;
                } else if (response.startsWith("MESSAGE")) {
                    System.out.println(response.substring(8));
                }
            }
            out.println("QUIT");
        }
        finally {
            socket.close();
        }
    }

    public static void main(String[] args) throws Exception {
        while (true) {
            String serverAddress = (args.length == 0) ? "localhost" : args[1];
            Client client = new Client(serverAddress);
            client.play();
        }
    }
}