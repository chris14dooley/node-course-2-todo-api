const expect=require('expect');
const request=require('supertest');
const {app}=require('./../server');
const {Todo}=require('./../models/todo');
const {ObjectID}=require('mongodb');
var {User}=require('./../models/user');
const {todos,populateTodos,users,populateUsers}=require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
      var text='THREE test todo';

      request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(3);
          expect(todos[0].text).toBe('ONE test todo');
          done();
        }).catch((e)=>done(e));
      });
  });

  it('should not create todo with an invalid body',(done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>done(e));
    });
  });

});

  describe('GET/todos',()=>{
    it('should get all Todos',(done)=>{
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
  });

describe('GET /todos/:id',()=>{
  it('Should return todo doc',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('it should return 404 if todo not found',(done)=>{
    //make sure you get a 404 back
    request(app)
    .get(`/todos/5a0f0699ebf58328d06dc9e7`)
    .expect(404)
    .end(done);
  });

  it('it should return 404 if todo not found',(done)=>{
    //make sure you get a 400 back for non Object ID's
    request(app)
    .get(`/todos/123}`)
    .expect(400)
    .end(done);
  });

});

describe('DELETE /todos/:id',()=>{
  it('should remove a todo',(done)=>{
    var hexid=todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexid}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexid);
    }).end((err,res)=>{
      if(err){
        return done(err);
      }
      Todo.findById(hexid).then((res)=>{
        expect(res).toNotExist();
        done();
      }).catch((e)=>done(e));
    });
  });

  it('should return a 404 if todo not found',(done)=>{
    var hexid=new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${hexid}`)
    .expect(404)
    .end(done);
  });

  it('should return a 404 if object ID invalid',(done)=>{
    request(app)
    .delete(`/todos/123}`)
    .expect(400)
    .end(done);
  });
});

describe('PATCH /todos/:id',()=>{

  it('should update the todo',(done)=>{
    //grab id of first item
      var hexid=todos[0]._id.toHexString();
      request(app)
      .patch(`/todos/${hexid}`)
      .send({
           "completed":true,
            "text":"Patch Test"
          })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe("Patch Test");
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      }).end(done);
    //update the text set completed=true
    //200
    //verifiy that the response body has text as same and completed=true and completed at is a number toBeA
  });

  it('should clear completedAt when todo is not completed',(done)=>{
    //grab id of second todo item
      var hexid=todos[1]._id.toHexString();
      request(app)
      .patch(`/todos/${hexid}`)
      .send({
	         "completed":false,
	          "text":"Patch Test 2"
          })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe("Patch Test 2");
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      }).end(done);
    //update text, set completed to false
    //200
    //expect that the response body has text has changed and completed now fase and completed at is null. toNotExist
  });

});

describe('GET /users/me',()=>{
  it('should return user if authenticate',(done)=>{
      request(app)
        .get('/users/me')
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
  });

  it('should return 404 if user not authenticate',(done)=>{
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res)=>{
          expect(res.body).toEqual({});
      })
      .end(done);
  });

});

describe('POST /users',()=>{
  it('should create a user',(done)=>{
    var email='blammy@gmail.com';
    var password='123456';

    request(app)
      .post('/users')
      .send({email,password})
      .expect(200)
      .expect((res)=>{
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err)=>{
        if(err){
          return done(err);
        }

        User.findOne({email}).then((user)=>{
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        })

      });
  });
  it('should return validation errors if request is invalid',(done)=>{
    var email='blammy';
    var password='1';

    request(app)
    .post('/users')
    .send({email,password})
    .expect(400)
    .end(done);
  });

  it('should should not create user if email is in use',(done)=>{
    var email='batman@gmail.com';
    var password='123456';

    request(app)
    .post('/users')
    .send({email,password})
    .expect(400)
    .end(done);
  });
});
