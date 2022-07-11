# Traversal handler
This package is just a simple handler for objects (eg. complex objects or trees) traversal.

##### This package depends on `lodash`.
## TreeTraversal usage example
##### TreeTraversal is a method for modifying tree elements with a recursive traversal.

With the `treeTraversal` method, we could traverse across the `treeList` input parameter,
with the possibility of modifying every element as we want them to be.

There is an example (below) for changing the `name` property of every element (and their child elements) to 'Test'.

In the example, i'm using lodash `clone` method for the current object of the recursion, but it's not necessary
```ts
import { treeTraversal } from 'traversal-handler';

treeTraversal(treeList, (current) => {
    const tempObject = _clone(current);
    tempObject.name = 'TEST';
    return tempObject;
});
```

In version `1.0.4` the traversal method input `tree` parameter works like a reference, so it just overrides the given Object, unlike the current (`> 1.0.5`) version, where the method works with a new, pure instance of the tree, so the usage now works like:
```ts
const modifiedTree = treeTraversal(treeList, (current) => {
    const tempObject = _clone(current);
    tempObject.name = 'TEST';
    return tempObject;
});
```
Where the `modifiedTree` instance holds the updated version of the input parameter

#### With returning `null` inside the `modifyHandler` callback method, you are able to remove the current  leaf.

There is an option for finding a specific Object's parent inside our tree. `parentOf` method iterates recursively across the given tree and finds the parent of our object, with breaking the recursion after completion.

#### From version 1.1.x
In version 1.1.x, you have the option, to give the `treeTraversal` method a third (`inputModifyHandler`) and fourth (`childrenProp`) parameter.
For instance, imagine having a `modify` method outside your class, that you want to pass to the handler (named `inputModifyHandler`) with the local callback method. Now you can do this as well, with the third parameter.
The fourth parameter is a `string` type parameter (`childrenProp`) for redefining the children property name (It is still `children` in default).

## Object utils
In this package, there are a few methods, that help cleanin or modifying objects easily, without defining complex logic.
<table>
    <thead>
        <th>Method</th>
        <th>Functionality</th>
    </thead>
    <tbody>
        <tr>
            <td>clearObject</td>
            <td>A simple method for cleaning your object. That means, this function recursively goes across all the properties of the given object and removes it's empty properties. (eg. null, undefined, empty array etc.)</td>
        </tr>
        <tr>
            <td>isNotEmpty</td>
            <td>Determine wether an object is empty or not, with checking it's type, value etc. (with lodash)</td>
        </tr>
        <tr>
            <td>isEmpty</td>
            <td>The opposite (with a simple negate) of 'isNotEmpty'</td>
        </tr>
        <tr>
            <td>formatDateProperties</td>
            <td>A method that helps formatting Date type plain objects in any depth, with a specific format</td>
        </tr>
        <tr>
            <td>formatObject</td>
            <td>Helps formatting an object in a way like reduce does that to array, with making access for keys, values and concrete object runtime</td>
        </tr>
    </tbody>
</table>
