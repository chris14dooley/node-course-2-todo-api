const expect=require('expect');
const request=require('supertest');
const {app}=require('./../server');
const {Todo}=require('./../models/todo');
const {ObjectID}=require('mongodb');

const todos=[{
  _id:new ObjectID(),
  text:'ONE test todo'
},{
  _id:new ObjectID(),
  text:'TWO test todo'
}];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>done());
});

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
