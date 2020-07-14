import {traverse} from "./treeTraversal";

export const treeTraversal = (tree: any | any[], modifyHandler: (object: any) => any) => traverse(tree, modifyHandler);
