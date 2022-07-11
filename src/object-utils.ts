import {
    isArray as _isArray,
    isBoolean as _isBoolean,
    isDate as _isDate,
    isEmpty as _isEmpty,
    isNil as _isNil,
    isNumber as _isNumber,
    isPlainObject as _isPlainObject,
    keys as _keys,
    transform as _transform,
} from 'lodash';
// @ts-ignore
import * as momentImported from 'moment';
const moment = momentImported;

export function formatDateInstances(object: any, format?: string): any {
    let result = object;
    if (_isPlainObject(object)) {
        result = _transform(object, (acc: any, value, key) => {
            acc[key] = formatDateInstances(value);
            if (value instanceof Date) {
                acc[key] = moment(value).format(format);
            }
        }, {});
    }
    return result;
}

export function clear(jsonObject: any): any {
    const newJson: any = {};
    _keys(jsonObject).forEach((key: string) => {
        const currentVal = jsonObject[key];
        if (isNotEmpty(currentVal)) {
            if (_isPlainObject(currentVal)) {
                const tempVal = clear(currentVal);
                if (isNotEmpty(tempVal)) {
                    newJson[key] = tempVal;
                }
            } else if (_isArray(currentVal)) {
                newJson[key] = [];
                currentVal.forEach((item: any) => {
                    if (!_isPlainObject(item)) {
                        newJson[key].push(item);
                    } else {
                        newJson[key].push(clear(item));
                    }
                });
            } else {
                newJson[key] = currentVal;
            }
        }
    });
    return newJson;
}

export function isNotEmpty(value: any): boolean {
    return (!_isNil(value)
        && (!_isEmpty(value)
            || (_isDate(value) && !isNaN((value as Date).getTime()))
            || _isBoolean(value) || _isNumber(value)
        ));
}

export function isEmpty(value: any): boolean {
    return !isNotEmpty(value);
}

export function _formatObject(object: any, actual: any) {
    return _transform(object, (acc: any, value, key) => {
        acc[key] = actual(object, key, value);
    }, {});
}
