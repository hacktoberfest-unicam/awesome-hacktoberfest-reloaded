import socket
import threading

SERVER = '127.0.0.1'
PORT = 63541
FORMAT = 'utf-8'
ADDR = (SERVER, PORT)
DISCONNECT_MSG = '!exit'
DISCONNECT_CLIENT = '!close'
HEADER = 128
c = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


# funzione che chiude il client
def handle_close_client():
    print("Spegnimento client in corso")
    c.close()
    exit()


# funzione che gestisce i messaggi in arrivo
def handle_message():
    msg_length = c.recv(HEADER).decode(FORMAT)
    if msg_length:
        msg_length = int(msg_length)
        msg = c.recv(msg_length).decode(FORMAT)
        if msg == DISCONNECT_CLIENT:
            print(f"[{ADDR}] {msg}")
            handle_close_client()
        print(f"{msg}")


# funzione che gestisce i messaggi in uscita
def handle_send_message():
    test = input()
    send(test)


# funzione che invia un messaggio
def send(msg):
    message = msg.encode(FORMAT)
    msg_length = len(message)
    send_length = str(msg_length).encode(FORMAT)
    send_length += b' ' * (HEADER - len(send_length))
    c.send(send_length)
    c.send(message)


# funzione che gestisce il client e i suoi comportamenti
def handle_client():
    print(f"Sei connesso al server {SERVER} per interrompere la connessione [!exit]")
    while True:
        thread = threading.Thread(target=handle_send_message)
        thread.start()
        handle_message()


def main():
    c.connect(ADDR)
    handle_client()


if __name__ == "__main__":
    main()
