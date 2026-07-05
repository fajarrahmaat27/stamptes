let result = [];

for (let i = 100; i >= 1; i--) {
    
    let isPrima = true;
    
    if (i <= 1) {
        isPrima = false;
    } else {
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrima = false;
                break;
            }
        }
    }

    if (isPrima === true) {
        continue;
    }

    if (i % 15 === 0) {
        result.push("FooBar");
    } 
    else if (i % 3 === 0) {
        result.push("Foo");
    } 
    else if (i % 5 === 0) {
        result.push("Bar");
    } 
    else {
        result.push(i);
    }
}

console.log(result.join(", "));