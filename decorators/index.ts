
export * from 'nuxt-property-decorator'

import cloneDeep from 'lodash/cloneDeep';




interface IReset <T> {
    reset() : void;
    fill(values : Partial<T>)
}


export function Resettable<T extends object>(value : T) : T & IReset<T>{
    const defaultValue = cloneDeep(value);
    const returnValue = cloneDeep(value);

    Object.defineProperty(returnValue, 'reset', {
        enumerable: false,
        writable: false,
        value: function () {
            for(const prop in returnValue){
                if(returnValue.hasOwnProperty(prop)){
                    returnValue[prop] = cloneDeep(defaultValue[prop]);
                }
            }
        }
    });

    Object.defineProperty(returnValue, 'fill', {
        enumerable: false,
        writable: false,
        value: function (newValues : Partial<T>) {
            for(const prop in newValues){
                if(newValues.hasOwnProperty(prop)) {
                    returnValue[prop] = newValues[prop];
                }
            }
        }
    });

    //@ts-ignore
    return returnValue;
}

export class TwoWayEnum {

    private keys = {};
    private values = [];

    constructor(elements) {
        for(let i=0; i < elements.length; i++){
            this.values.push(elements[i]);
            this.keys[elements[i]] = i;
        }
    }

    get(value: any) {
        if(this.values[value] !== undefined) return this.values[value];
        if(this.keys[value] !== undefined) return this.keys[value];
        return undefined;
    }

}
