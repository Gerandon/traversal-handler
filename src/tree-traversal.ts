import {
    keys as _keys,
    isArray as _isArray,
    cloneDeep as _cloneDeep,
    clone as _clone,
    find as _find,
} from 'lodash';

export function traverse(tree: any | any[], modifyHandler: (object: any) => any, childrenProp: string = 'children') {
    const tempTree = _cloneDeep(tree);
    tempTree.forEach((object: any) => {
        const childArray = _find(_keys(object).map(key => object[key]), _isArray);
        const modifiedObject = modifyHandler(object);
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
        if (childArray && childArray.length && modifiedObject && continueRecursion) {
            object[childrenProp] = traverse(childArray, modifyHandler, childrenProp);
        }
    });
    return tempTree;
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
