
import './App.css';

export function generator(arr){

    function shuffleArray (arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      }
    
      function* sampleArray (arr) {
        // Start out shuffling the array so it's in random order:
        shuffleArray(arr);
        // I want to keep track of which index I'm at. Once `n` reaches
        // `arr.length`, I know it's time to shuffle the array again:
        let n = 0;
      
        // Just loop infinitely:
        while (true) {
          // Here is where I shuffle -- the counter goes back to zero at this point.
          if (n === arr.length) {
            shuffleArray(arr);
            n = 0;
          }
          // And I just spit out whatever is at index `n` in the shuffled array:
          yield arr[n];
          // Then move to the next index:
          n++
        }
      }
      const entryGenerator = sampleArray(arr)
     
      return entryGenerator;

}

export function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}
