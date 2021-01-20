var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var foo = [
    {
        "id": "100",
        "text": "eggs"
    },
    {
        "id": "101",
        "text": "butter"
    },
    {
        "id": "102",
        "text": "milk"
    },
    {
        "id": "103",
        "text": "toast"
    }
];


app.get('/foo', (req, res) => {
    res.send(foo);
});

app.post('/foo', (req,res) => {
    var fooBody = req.body;
    if (!fooBody || fooBody.text === "") {
        res.status(500).send({error: "Foo Body must have text"});
    } else {
        foo.push(fooBody);
        res.status(200).send(foo); }
});

app.put('/foo/:fooId', (req, res)=> {
    var newText = req.body.text;
    if (!newText || newText==="") {
        res.status(500).send({error:"Must provide text"});
    }
    else {
        var objectFound = false;
        for (var x=0; x<foo.length; x++) {
            var ing = foo[x];
            if (ing.id === req.params.fooId) {
                foo[x].text = newText;
                objectFound = true;
                break;
            }
        }
        if (!objectFound) {
            res.status(500).send({error:"fooID not found"})
        }
        else {
            res.send(foo);
        }
    }
});



app.listen(3000, () => {
    console.log("Server running on port 3000 !!!");
});
