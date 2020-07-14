import {
    isArray as _isArray,
    isPlainObject as _isPlainObject,
    transform as _transform,
    isNil as _isNil,
    isEmpty as _isEmpty,
    isDate as _isDate,
    isBoolean as _isBoolean,
    isNumber as _isNumber,
} from 'lodash';

export function removeEmptyProperties(cleanable: any): any {
    let result = cleanable;
    if (_isArray(cleanable)) {
        result = (cleanable as any[]).reduce((acc, item) => {
            const clonedProp = removeEmptyProperties(item);
            if (isNotEmpty(clonedProp)) {
                acc.push(clonedProp);
            }
            return acc;
        }, []);
    } else if (_isPlainObject(cleanable)) {
        result = _transform(
            cleanable,
            (acc: any, value, key) => {
                const clonedProp = removeEmptyProperties(value);
                if (isNotEmpty(clonedProp)) {
                    acc[key] = clonedProp;
                }
            },
            {}
        );
    }
    return result;
}

function isNotEmpty(value: any): boolean {
    return (!_isNil(value)
        && (!_isEmpty(value)
            || (_isDate(value) && !isNaN((value as Date).getTime()))
            || _isBoolean(value) || _isNumber(value)
        ));
}
