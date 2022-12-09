export interface Tree {
  height: number;
  row: number;
  col: number;
  leftTree?: Tree;
  rightTree?: Tree;
  upTree?: Tree;
  downTree?: Tree;
  visible?: boolean;
  scenicScore?: number;
}

export const parseTreeMap = (values: string[]): Tree[][] => {
  const trees = values.map((treeRow, row) =>
    treeRow.split("").map((height, col) => ({
      height: +height,
      row,
      col,
    }))
  );

  populateTrees(trees);
  return trees;
};

const populateTrees = (trees: Tree[][]) => {
  let currentTree: Tree = trees[0][0];

  for (let row = 0; row < trees.length; row++) {
    for (let col = 0; col < trees[row].length; col++) {
      currentTree = trees[row][col];
      let blocker: Tree | undefined = trees[row][col - 1];
      while (blocker && currentTree.height > blocker.height) {
        blocker = blocker.leftTree;
      }
      currentTree.leftTree = blocker;

      blocker = trees[row - 1]?.[col];
      while (blocker && currentTree.height > blocker.height) {
        blocker = blocker.upTree;
      }
      currentTree.upTree = blocker;
    }
  }

  for (let row = trees.length - 1; row >= 0; row--) {
    for (let col = trees[row].length - 1; col >= 0; col--) {
      currentTree = trees[row][col];
      let blocker: Tree | undefined = trees[row][col + 1];
      while (blocker && currentTree.height > blocker.height) {
        blocker = blocker.rightTree;
      }
      currentTree.rightTree = blocker;

      blocker = trees[row + 1]?.[col];
      while (blocker && currentTree.height > blocker.height) {
        blocker = blocker.downTree;
      }
      currentTree.downTree = blocker;

      currentTree.visible = !(
        currentTree.leftTree &&
        currentTree.rightTree &&
        currentTree.upTree &&
        currentTree.downTree
      );

      currentTree.scenicScore =
        (currentTree.col - (currentTree.leftTree?.col || 0)) *
        (currentTree.row - (currentTree.upTree?.row || 0)) *
        ((currentTree.downTree?.row || trees.length - 1) - currentTree.row) *
        ((currentTree.rightTree?.col || trees[0].length - 1) - currentTree.col);
    }
  }
};
