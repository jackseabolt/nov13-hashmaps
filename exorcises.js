const { HashMap } = require('./index');

function isPalindrome(string) {
    let myHash = new HashMap();

    for (let i = 0; i < string.length; i++) {
        myHash.set(string[i], 1)
    }
    let oddCounter = 0;

    for (let i = 0; i < string.length; i++) {
        let currentLetterList = myHash.get(string[i])
        console.log(myHash.get(string[i]));
        if (currentLetterList.length % 2 !== 0) {
            oddCounter++
            
        }
    }
    if (oddCounter > 1) {
        return false
    }
    return true;
}

console.log(isPalindrome('racecar'));
//aabbaac
