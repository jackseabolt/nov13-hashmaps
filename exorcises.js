const { HashMap } = require('./index');

function coantainsKey(hTable, key){
    for(let i=0; i<hTable.hashTable.length; i++){
        if(hTable.get(key)){
            return true;
        }
    }
    return false;
}

function PermutationString(string){
    let oddChar = false;
    let hm = new HashMap();
    for(let i=0;i<string.length;i++){
        if(coantainsKey(hm,string[i])){
            let value = hm.get(string[i])
            hm.set(string[i],(value+1))
        }
       else{
            hm.set(string[i],1);
       }
    }
     for (let i = 0; i < hm.hashTable.length; i++){ 
       for (let keys in hm.hashTable[i]){
            if (hm.hashTable[i][keys] & 1){
                if (oddChar){
                    return false;
                } 
	    oddChar = true;
            }
        }  
     }
        
    //  displayHashMapKeys(hm);
     return true;;
}

function mainPalindromString(){
    //console.log(PermutationString('madam'));
    console.log('cllic: '+PermutationString('cllic'));
    console.log('aaxxis '+PermutationString('aaxxis'));
    console.log('caabl '+PermutationString('caabl'));
}

mainPalindromString();
