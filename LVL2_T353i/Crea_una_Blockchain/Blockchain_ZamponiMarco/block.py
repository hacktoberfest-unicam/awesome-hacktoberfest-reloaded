from datetime import datetime
import hashlib


class Block:

    def __init__(self, data: str, previous):
        self.data: str = data
        self.time = datetime.now()
        string = self.data + str(self.time)
        if previous is not None:
            string = string + previous.hash

        self.hash = hashlib.sha256(string.encode()).hexdigest()
        self.previous = previous
        self.next = None

    def __str__(self):
        return f"—————\n" \
               f"{self.time.strftime('%A %d-%m-%Y, %H:%M:%S')} \n" \
               f"Data:\n" \
               f"---\n" \
               f"\t{self.data}\n" \
               f"---\n" \
               f"Hash: {self.hash}\n" \
               f"————— "
