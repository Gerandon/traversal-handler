import {
    keys as _keys,
    isArray as _isArray,
} from 'lodash';

export function traverse(tree: any | any[], modifyHandler: (object: any) => any, childrenProp: string = 'children') {
    if (_isArray(tree)) {
        tree.forEach((object) => {
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
            if (childArray && childArray.length) {
                object[childrenProp] = traverse(childArray, modifyHandler, childrenProp);
            }
        });
    }
    return tree;
}
