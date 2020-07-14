import {traverse} from "./tree-traversal";
import {removeEmptyProperties} from "./object-utils";

export const treeTraversal = (
    tree: any | any[],
    modifyHandler: (object: any) => any,
    childrenProperty?: string
) => removeEmptyProperties(traverse(tree, modifyHandler, childrenProperty));
