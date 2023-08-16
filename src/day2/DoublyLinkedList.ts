type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;

        this.length++;
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        // first point to the first element (the head)
        node.next = this.head;
        // second, point the (soon to be previous) head to the new node
        this.head.prev = node;
        // third and last, head now becomes the new node
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("idx bigger than list length");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;
        const curr = this.getAt(idx);

        const node: Node<T> = { value: item };

        node.next = curr;
        node.prev = curr?.prev;

        if (curr?.prev) {
            curr.prev = node;
        }
        if (node.prev) {
            node.prev.next = curr;
        }
    }

    append(item: T): void {
        this.length++;

        const node: Node<T> = { value: item };

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        if (this.tail) {
            this.tail.next = node;
            this.tail = node;
        }
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; i < this.length && curr; i++) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
        }
        if (!curr) {
            return undefined;
        }

        return this.removeNode(curr);
    }

    get(idx: number): T | undefined {
        const node = this.getAt(idx);
        return node?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);

        if (!node) return undefined;

        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.prev = node.next = undefined;
        return node.value;
    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }

        return curr;
    }
}
