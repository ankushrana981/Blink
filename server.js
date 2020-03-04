var exp = require('express');
var app = exp();
app.use(exp.static(__dirname + '/dist/'));
app.listen(4181);
console.log(`Server running at http://localhost:4181/`);
