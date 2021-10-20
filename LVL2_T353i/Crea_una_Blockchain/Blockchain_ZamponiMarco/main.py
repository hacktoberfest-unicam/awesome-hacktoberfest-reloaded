from block import *

root = None
head = None

def print_blockchain(block):
    while block is not None:
        print(block)
        block = block.next


def add_block(block, data):
    if block is None:
        new_block = Block(data, None)
        return new_block
    else:
        new_block = Block(data, block)
        block.next = new_block
        return new_block


def accept_input(msg):
    return input(msg)


while True:
    inp = accept_input("\tl: list\n\tc [data]: create\nSelect your operation: ")

    tokens = inp.split(" ")
    if len(tokens) == 0:
        continue

    op = tokens[0][0]
    if op == 'c':
        if len(tokens) < 2:
            continue
        head = add_block(head, tokens[1])
        if root is None:
            root = head
        print('\nBlock added with success!\n')
    elif op == 'l':
        print_blockchain(root)
    else:
        continue

