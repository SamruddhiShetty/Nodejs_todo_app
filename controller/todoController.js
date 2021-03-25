var mongoose=require('mongoose');

var bodyParser=require('body-parser');


//connect to the database
mongoose.connect('mongodb+srv://test:test@todo.ixtqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


//create a schema

var todoSchema=new mongoose.Schema({
  item:String
});

var Todo=mongoose.model('Todo', todoSchema);


//var data=[{item: 'get milk'}, {item: 'walk dog'}, {item: 'code'}];

var urlencodeParser=bodyParser.urlencoded({extend:false});

module.exports=function(app){
  app.get('/todo', function(req, res){
    //get data from MongoDb and pass it to view
    Todo.find({}, function(err, data){
      if (err) throw(err);
      res.render('todo', {todos:data});
    });

  });

  app.post('/todo', urlencodeParser, function(req, res){
    //read the item from view and add it to MongoDb
    var newTodo=Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    //delete the requested item from the mondoDb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
}
