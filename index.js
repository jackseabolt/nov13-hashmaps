class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this.hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }
    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;
        let slot = this.hashTable[index];
        if (!slot) {
            return this.hashTable[index] = {key};
        }
        if (slot.key == key) 
            return slot;
        while (slot.next) {
            slot = slot.next;
            if (slot.key == key) 
                return slot;
        }
        return slot.next = {key};
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i=0; i<string.length; i++) {
        //Bitwise left shift with 5 0s - this would be similar to
        //hash*31, 31 being the decent prime number
        //but bit shifting is a faster way to do this
        //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure has is unsigned - meaning non-negtive number
        return hash >>> 0;
    }
     _resize(size) {
        const oldSlots = this.hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this.hashTable = [];

        for (let i=0; i<oldSlots.length; i++)
            for (let slot = oldSlots[i]; slot; slot = slot.next) {
                if (!slot.deleted)
                    //copy to a new array
                    this.set(slot.key, slot.value);
            }
                
    }

    set(key, value){
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        const index = this._findSlot(key);
        if (index.deleted !== false) 
            this.length++;
        index.value = value;
        index.deleted = false;
    }

    remove(key){
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        const slot = this._findSlot(key);
        if (slot.deleted) 
            throw new Error('Key error');
        slot.deleted = true;
        this.length--;
        this._deleted++;
    }
  
    get(key) {
        const slot = this._findSlot(key);
        if (slot.deleted) 
            throw new Error('Key error');
        return slot.value;
    }
    //Enumerate all valid keys in the map and save them to an array
    //this way you don't have to access the HashMap members
    keys() {
        const ret = [];
        for (let i = 0; i < this.hashTable.length; ++i)
            for (let slot = this.hashTable[i]; slot; slot = slot.next)
                if (!slot.deleted)
                    ret.push(slot.key);
        return ret;
    }
}


HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;


// ----------------------------------------- //
/*
let myHash = new HashMap();
myHash.set("Hobbit", "Bilbo")
// console.log(myHash.get("Hobbit"))
myHash.set("Wizard", "Gandolf")
// console.log(myHash.get("Wizard"))
myHash.set("Hobbit", "Frodo")
// console.log(myHash.get("Hobbit"))
myHash.set("Human", "Aragon")
// console.log(myHash.get("Human"))
myHash.set("Elf", "Legolas")
// console.log(myHash.get("Elf"))
myHash.set("Maiar", "The Necromancer")
// console.log(myHash.get("Maiar"))
myHash.set("RingBearer", "Gollum")
// console.log(myHash.get("RingBearer"))
myHash.set("LadyOfLight", "Galadriel")
// console.log(myHash.get("LadyOfLight"))
myHash.set("HalfElven", "Arwen")
// console.log(myHash.get("HalfElven"))
myHash.set("Ent", "Treebeard")
// console.log(myHash.get("Ent"))
myHash.set("Maiar", "Sauron")
console.log(myHash.get("Maiar"))

console.log('length:', myHash.length)
*/
exports.HashMap = HashMap;