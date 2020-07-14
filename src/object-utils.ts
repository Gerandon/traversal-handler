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
import moment = require("moment");

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
        if (isNotEmpty(jsonObject[key])) {
            if (_isPlainObject(jsonObject[key])) {
                newJson[key] = clear(jsonObject[key]);
            } else if (_isArray(jsonObject[key])) {
                newJson[key] = [];
                jsonObject[key].forEach((item: any) => {
                    if (!_isPlainObject(item)) {
                        newJson[key].push(item);
                    } else {
                        newJson[key].push(clear(item));
                    }
                });
            } else {
                newJson[key] = jsonObject[key];
            }
        }
    });
    return newJson;
}

function isNotEmpty(value: any): boolean {
    return (!_isNil(value)
        && (!_isEmpty(value)
            || (_isDate(value) && !isNaN((value as Date).getTime()))
            || _isBoolean(value) || _isNumber(value)
        ));
}

function isEmpty(value: any): boolean {
    return !isNotEmpty(value);
}
