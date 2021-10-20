#!/usr/bin/env python3

import socket
from time import sleep

HOST = '127.0.0.1'  # The server's hostname or IP address
PORT = 65432        # The port used by the server
possibilities = ("sasso", "carta", "forbice")
player1Pick = ""


def askAndCheckInput():
    choice = input("scegli un oggetto tra " + str(possibilities))
    while choice not in possibilities:
        choice = input("scegli un oggetto tra " + str(possibilities))
    return choice


with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    player1Pick = askAndCheckInput()
    s.sendall(bytes(player1Pick, encoding="ascii"))
    while True:
        reply = s.recv(1024)
        if not reply:
            break
