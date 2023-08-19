export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if (this.length === 0) return -1;

        const out = this.data[0];

        // heapifyDown comparison is inclusive
        this.length--;
        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);

        return out;
    }

    // for deletion:
    // remove head, take last element, put into first position, then heapify down
    private heapifyDown(idx: number): void {
        if (idx >= this.length) return;

        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);
        // check end
        if (lIdx >= this.length || rIdx >= this.length) return;

        const lValue = this.data[lIdx];
        const rValue = this.data[rIdx];
        const v = this.data[idx];

        // right value is the smallest, and we are greater than the smallest
        if (lValue > rValue && v > rValue) {
            this.data[idx] = rValue;
            this.data[rIdx] = v;
            this.heapifyDown(rIdx);
        } else if (rValue > lValue && v > lValue) {
            this.data[idx] = lValue;
            this.data[lIdx] = v;
            this.heapifyDown(lIdx);
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) return;

        const pIdx = this.parent(idx);
        const parentV = this.data[pIdx];
        const v = this.data[idx];

        if (parentV > v) {
            // go up
            // swap with parent
            this.data[idx] = parentV;
            this.data[pIdx] = v;
            this.heapifyUp(pIdx);
        }
        return;
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }
    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }
}
