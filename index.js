const { LinkedList } = require('./linkedlist');


class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._slots = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key);
        
        if (this._slots[index] === undefined) {
            throw new Error('Key error');
        }
        return this._slots[index].get(key);
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        // if (loadRatio > HashMap.MAX_LOAD_RATIO) {
        //     this._resize(this._capacity * HashMap.SIZE_RATIO);
        // }

        const index = this._findSlot(key);
        
        if (!this._slots[index]) {
            const hashLink = new LinkedList();
            this.length++;
            this._slots[index] = hashLink;
            hashLink.insert(0, value, key);
        }
        else {
            let current = index.head;
            for (let i=0; i<index.length; i++){
                if (current.key===key){
                    return current.value = value
                } 
                current = current.next
            }
            const indexList = this._slots[index];
            indexList.insert(0, value, key)

        }
    }

    remove(key) {
        const index = this._findSlot(key);
        const slot = this._slots[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.deleted = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;
        return index;

        // for (let i=start; i<start + this._capacity; i++) {
        //     const index = i % this._capacity;
        //     const slot = this._slots[index];
        //     if (slot === undefined || (slot.key == key && !slot.deleted)) {
        //         return index;
        //     }
        // }
    }

    // _resize(size) {
    //     const oldSlots = this._slots;
    //     this._capacity = size;
    //     // Reset the length - it will get rebuilt as you add the items back
    //     this.length = 0;
    //     this._deleted = 0;
    //     this._slots = [];

    //     for (const slot of oldSlots) {
    //         if (slot !== undefined && !slot.deleted) {
    //             this.set(slot.key, slot.value);
    //         }
    //     }
    // }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;


// ----------------------------------------- //

// let myHash = new HashMap();
// myHash.set("Hobbit", "Bilbo")
// console.log(myHash.get("Hobbit"))
// myHash.set("Wizard", "Gandolf")
// console.log(myHash.get("Wizard"))
// myHash.set("Hobbit", "Frodo")
// console.log(myHash.get("Hobbit"))
// myHash.set("Human", "Aragon")
// console.log(myHash.get("Human"))
// myHash.set("Elf", "Legolas")
// console.log(myHash.get("Elf"))
// myHash.set("Maiar", "The Necromancer")
// console.log(myHash.get("Maiar"))
// myHash.set("RingBearer", "Gollum")
// console.log(myHash.get("RingBearer"))
// myHash.set("LadyOfLight", "Galadriel")
// console.log(myHash.get("LadyOfLight"))
// myHash.set("HalfElven", "Arwen")
// console.log(myHash.get("HalfElven"))
// myHash.set("Ent", "Treebeard")
// console.log(myHash.get("Ent"))
// myHash.set("Maiar", "Sauron")
// console.log(myHash.get("Maiar"))

// console.log('length:', myHash.length)
// let myList = new LinkedList; 

exports.HashMap = HashMap;