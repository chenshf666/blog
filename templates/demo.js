/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
	if(numRows == 1) return s;
    var all = 2 * numRows - 2;
    var S = "";
    for(var i = 0; i < numRows; i++){
    	var first = i;
    	S += s[first];
    	var step1 = all - 2*i;
    	var step2 = 2*i;
    	while (first < s.length){
    		if(step1 > 0) {
    			first += step1;
    			if(first >= s.length)
    				break;
    			S += s[first];
    		}
    		if (step2 > 0) {
    			first += step2;
    			if(first >= s.length)
    				break;
    			S += s[first];
    		}
    	}
    	//console.log(S);
    }
    console.log(S);
    return S;
};

convert("LEETCODEISHIRING",2)