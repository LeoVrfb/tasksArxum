// I choosed to use reduce here ! Cause the function is supposed to return a SINGLE result which is what reduce does...
// But of course there are probably better ways. My function is way too long, but when you choose a way,
// It's good to go until the end of your idea I think :)

function solution(S) {
    const result = S.split('').reduce((acc, char) => {
        if (char !== acc.currentBlock) {
            // If the next letter is different from the current one,
            // it means we have reached the end of a 'block', so we create a new one.
            // Reset the current block.
            acc.currentBlock = char;
            acc.blocksResult.push({ block: char, originalOrder: acc.blocksResult.length });

        } else {
            // Add the identical letter to the existing block.
            const lastIndex = acc.blocksResult.length - 1;
            acc.blocksResult[lastIndex].block += char;
        }

        return acc;

    }, { currentBlock: '', blocksResult: [] });

    for (let i = 0; i < result.blocksResult.length - 2; i++) {
        if (
            result.blocksResult[i].block.length >= 1 &&
            result.blocksResult[i + 1].block.length === 1 &&
            result.blocksResult[i + 2].block.length >= 1
        ) {
            result.blocksResult.splice(i + 1, 1);
        }
    }

    // Merge strings with the same initial letter
    for (let i = 0; i < result.blocksResult.length - 1; i++) {
        const currentBlock = result.blocksResult[i];
        const nextBlock = result.blocksResult[i + 1];
        if (currentBlock.block.charAt(0) === nextBlock.block.charAt(0)) {
            currentBlock.block += nextBlock.block;
            result.blocksResult.splice(i + 1, 1);
            i--;
        }
    }

    // Here is another condition but it's not working. I was tryin to merge every letters that are the same wherever they are in the array of string. Not working for the last example tho...

    // for (let i = 0; i < result.blocksResult.length - 1; i++) {
    //   const currentBlock = result.blocksResult[i];
    //   for (let j = 0; j < result.blocksResult.length; j++) {
    //     if (i !== j) {
    //       const otherBlock = result.blocksResult[j];
    //       if (otherBlock.block.includes(currentBlock.block.charAt(0))) {
    //         currentBlock.block += otherBlock.block;
    //         result.blocksResult.splice(j, 1);
    //         j--;
    //       }
    //     }
    //   }
    // }

    while (result.blocksResult.length > 3) {
        result.blocksResult.sort((a, b) => b.block.length - a.block.length || a.originalOrder - b.originalOrder);
        result.blocksResult.pop(); // Remove the shortest block until there are only 3
    }


    // Concatenate all the character strings contained in blocksResult
    const sortedBlocks = result.blocksResult.sort((a, b) => a.originalOrder - b.originalOrder); //Using originalOrder to make them at the right place again !
    const concatenatedResult = sortedBlocks.map(obj => obj.block).join('');

    return concatenatedResult.length
}

console.log(solution("aabacbba")); // Résultat attendu : "aaacbb", "aaabba", "aabbba"
console.log(solution("aabxbaba")); // Résultat attendu : "aabbaa", "aabbba"
console.log(solution("xxxyxxyyyxyyy")); // Résultat attendu : "xxxxxyyyyyy"
console.log(solution("atheaxbtheb")); // Résultat attendu : "aaxbb"