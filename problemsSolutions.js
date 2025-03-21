// Caesar Cipher Encoding and Decoding
function shiftText(txt, num, mode = true) {
    let ans = "";
    let move = mode ? num : -num;
    for (let i = 0; i < txt.length; i++) {
        let char = txt[i];
        if (char.match(/[a-z]/i)) {
            let ascii = txt.charCodeAt(i);
            let base = ascii >= 65 && ascii <= 90 ? 65 : 97;
            char = String.fromCharCode(((ascii - base + move + 26) % 26) + base);
        }
        ans += char;
    }
    return ans;
}
console.log(shiftText("HELLO", 3, true));
console.log(shiftText("KHOOR", 3, false));

// Convert number into Indian currency format
function indianMoney(n) {
    let split = n.toString().split(".");
    let num = split[0];
    let end = num.slice(-3);
    let start = num.slice(0, -3);
    start = start.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return start + (start ? "," : "") + end + (split[1] ? "." + split[1] : "");
}
console.log(indianMoney(123456.7891));
console.log(indianMoney(10000000));

// Combining two lists
function mixLists(a, b) {
    let lst = [...a, ...b].sort((x, y) => x.positions[0] - y.positions[0]);
    let out = [];
    for (let i = 0; i < lst.length; i++) {
        let now = lst[i];
        if (out.length && out[out.length - 1].positions[1] >= now.positions[0] + (now.positions[1] - now.positions[0]) / 2) {
            out[out.length - 1].values.push(...now.values);
        } else {
            out.push({ positions: now.positions, values: [...now.values] });
        }
    }
    return out;
}
console.log(mixLists(
    [{ positions: [0, 4], values: [1, 2] }, { positions: [5, 9], values: [3, 4] }],
    [{ positions: [2, 6], values: [5, 6] }, { positions: [7, 10], values: [7, 8] }]
));

// Minimizing Loss
function smallLoss(nums) {
    let min = Infinity, buy = -1, sell = -1;
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            let loss = nums[i] - nums[j];
            if (loss > 0 && loss < min) {
                min = loss;
                buy = i + 1;
                sell = j + 1;
            }
        }
    }
    return { buy, sell, loss: min };
}
console.log(smallLoss([20, 15, 7, 2, 13]));
console.log(smallLoss([50, 40, 30, 20, 10]));
