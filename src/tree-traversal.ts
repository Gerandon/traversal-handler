import {
    keys as _keys,
    isArray as _isArray,
    cloneDeep as _cloneDeep,
} from 'lodash';

export function traverse(tree: any | any[], modifyHandler: (object: any) => any, childrenProp: string = 'children') {
    const tempTree = _cloneDeep(tree);
    tempTree.forEach((object: any) => {
        const childArray = _keys(object).map(key => object[key]).find(_isArray);
        const modifiedObject = modifyHandler(object);
        // Bypass immutable assignment
        _keys(object).forEach((key) => {
            if (modifiedObject) {
                object[key] = modifiedObject[key];
            } else {
                object[key] = null;
            }
        });
        if (childArray && childArray.length && modifiedObject) {
            object[childrenProp] = traverse(childArray, modifyHandler, childrenProp);
        }
    });
    return tempTree;
}
