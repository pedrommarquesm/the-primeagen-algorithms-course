function search(curr: BinaryNode<number> | null, needle: number): boolean {
    // base case: end of the tree, no more child nodes
    if (!curr) return false;

    if (curr.value === needle) return true;

    // right side of the tree
    if (curr.value < needle) {
        return search(curr.right, needle);
    }

    return search(curr.left, needle);
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}
