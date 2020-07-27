import {getParent, traverse} from "./tree-traversal";
import {
    formatDateInstances,
    clear,
    isEmpty as _isEmpty,
    isNotEmpty as _isNotEmpty
} from "./object-utils";

/**
 * Iterate trough the tree recursively, with the option of modifying every element
 *
 * @param tree
 *      modifiable tree
 * @param modifyHandler
 *      callback method that handles the modification
 * @param childrenProperty
 *      property that identifies the childrens of an objects
 *      (default is 'children')
 */
export const treeTraversal = (
    tree: any | any[],
    modifyHandler: (object: any) => any,
    childrenProperty?: string
) => clear(traverse(tree, modifyHandler, childrenProperty));

/**
 * Find the parent of an Object in the specified tree
 *
 * @param object
 * @param tree
 * @param currentIdentifier
 * @param parentIdentifier
 */
export const parentOf = (object: any, tree: any[], currentIdentifier?: string, parentIdentifier?: string) => getParent(object, tree, currentIdentifier, parentIdentifier);

/**
 * Clears the given object with removing all the empty properties
 *
 * @param object
 */
export const clearObject = (object: any) => clear(object);

/**
 * Checks wether the parameter object is empty or not
 * with lodash methods: isNil, isEmpty, isDate && isNaN etc.
 *
 * @param object
 */
export const isNotEmpty = (object: any) => _isNotEmpty(object);

/**
 * Negate of 'isNotEmpty'
 *
 * @param object
 */
export const isEmpty = (object: any) => _isEmpty(object);

/**
 * Formatting Date type instances in every depth
 *
 * @param object
 * @param format
 */
export const formatDateProperties = (object: any, format?: string) => formatDateInstances(object, format);
