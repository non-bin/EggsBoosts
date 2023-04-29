module.exports = {
  simpleRecursive: function(arr, callback, n = 5, out = []) {
    console.log(out);

    if (n > 0) {
      for(var i = 0; i < arr.length; i++) {
        this.simpleRecursive(arr, callback, n-1, out.push(arr[i]));
      }
    }
  }
}
