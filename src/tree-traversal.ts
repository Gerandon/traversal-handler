import {
    keys as _keys,
    isArray as _isArray,
    cloneDeep as _cloneDeep,
    clone as _clone,
    find as _find,
} from 'lodash';

export function traverse(tree: any | any[],
                         modifyHandler: (object: any) => any,
                         inputModifyLeafRight?: (object: any) => any,
                         childrenProp: string = 'children') {
    const tempTree = _cloneDeep(tree);
    tree.forEach((object: any) => {
        const childArray = _keys(object).map(key => object[key]).find(_isArray);
        const modifiedObject = modifyHandler ? modifyHandler(object) : (inputModifyLeafRight ? inputModifyLeafRight(object) : object);
        // Bypass immutable assignment
        _keys(object).forEach((key) => {
            if (modifiedObject) {
                object[key] = modifiedObject[key];
            } else {
                object[key] = null;
            }
        });
        const continueRecursion =
            modifiedObject && (!modifiedObject.hasOwnProperty('breakRecursion') || !modifiedObject.breakRecursion);
        if (childArray && childArray.length && continueRecursion) {
            object[childrenProp] = traverse(childArray, modifyHandler, inputModifyLeafRight, childrenProp);
        }
    });
    return tree;
}

export function getParent(current: any, tree: any | any[], identifier: string = 'id', parentIdentifier: string = 'parentId') {
    let parent: any = null;
    if (current.parentId) {
        traverse(tree, (income) => {
            const incomeClone = _clone(income);
            if (current[parentIdentifier] === income[identifier]) {
                parent = incomeClone;
                incomeClone.breakRecursion = true;
            }
            return incomeClone;
        });
    }
    return parent;
}
