/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const User = require('../models/user');
const Attendance = require('../models/attendance');
const app = require('../app');
const mongoose = require("mongoose");
const supertest = require("supertest");
beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/test1",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });

  test("POST /user/posts", async () => {
    const postt = await User.create({ username: "new username", email: "new email",password: "new password" });
         await supertest(app).post("/user/signup")
      .send(postt)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      //.expect( "\"email\" must be a valid email")

      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body.username).toEqual();
        expect(response.body.email).toEqual(postt.email);
        expect(response.body.password).toEqual(postt.password);

      });
  
  });

  
   
 
  
 let token;
beforeAll((done) => {
    supertest(app)
      .post('/user/login')
      .send({
        email: "harii@gmail.com",
        password: "hari",
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });

    test('It responds with JSON', () => {//findAlluser
      return supertest(app)
      .get("/user/findAll")
      .set('Authorization', `Bearer ${token}`)

        .then((response) => {
          expect(response.statusCode).toEqual(200);

        });
    });
    test("GET /:id", async () => {//findByid
      const post = await User.create({ username: "meeraa", email: "meeraa@gmail.com",password: "meeraa" });
    
      await supertest(app).get("/user/getuser/" + post.id)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

        .then((response) => {
          expect(response.body._id).toBe(post.id);
          expect(response.body.username).toBe(post.username);
          expect(response.body.email).toBe(post.email);
          expect(response.body.password).toBe(post.password);
  
  
        });
    });
   
    test("DELETE /user/delete/:id", async () => {
      const post = await User.create({
        username: "meeraa",
        email: "meeraaa@gmail.com",
        password:"meeera "
      });
    
      await supertest(app)
        .delete("/user/delete/" + post.id)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        .then(async () => {
          expect(await User.findOne({ _id: post.id })).toBeFalsy();
          });
    });
    test("PATCH /user/update/:id", async () => {
      const post = await User.create({ username: "geetha", email: "geetha@gmail.com",password:"geetha" });
      const data = { username: "new username", email: "new email",password:"geetha" };
      await supertest(app).patch("/user/update/" + post.id)
      .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBe(post.id);
          expect(response.body.username).toBe(data.username);
          expect(response.body.email).toBe(data.email);
          expect(response.body.password).toBe(data.password);
  
        });
    });

    test("POST /Attendance/posts", async () => {
      const postt = await Attendance.create({ userid: " 611b98021e225406209976f1", date: "2021-07-04",entryTime: "3:00" , endTime:"7:00", att:"present"});
       
    console.log("djhjkhfk",postt);
      await supertest(app).post("/attendance/createAttendance")
        .send(postt)
        .expect('Content-Type', /json/)
  
        .then((response) => {
          expect(response.statusCode).toEqual(200);
        });
    
    });

    test("DELETE /attendance/delete/:id", async () => {
      const post = await Attendance.create({
         userid: "611b98021e225406209976f1",
          date: "2021-07-12",
          entryTime: "6:00" ,
           endTime:"7:00", 
           att:"present"});
    
      await supertest(app)
        .delete("/attendance/delete/" + post.id)
        .expect(200)
        .then(async () => {
          expect(await Attendance.findOne({ _id: post.id })).toBeTruthy();
          });
    });
   



    test("PATCH /Attendance/update/:id", async () => {
      const post = await Attendance.create({ userid: " 611b98021e225406209976f1", date:"2021-07-12T00:00:00.000Z",entryTime: "2:00" , endTime:"7:00", att:"absent"});
      const data = { userid: "new userid", date: "2021-07-12",entryTime: "new time" , endTime:"7:00", att:"absent"};
      await supertest(app).patch("/attendance/update/" + post.id)
      //.set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBe(post.id);
          expect(response.body.userid).toBe(data.userid);
          expect(response.body.entryTime).toBe(data.entryTime);
          expect(response.body.endTime).toBe(data.endTime);
          expect(response.body.att).toBe(data.att);


  
        });
    });
    test('find all attendance', () => {//findAlluser
      return supertest(app)
      .get("/attendance/findAllAttendance")
      //.set('Authorization', `Bearer ${token}`)

        .then((response) => {
          expect(response.statusCode).toEqual(200);

        });
    });
    test("GET /:id", async () => {//findByid
      const post = await Attendance.create({ userid: " 611b98021e225406209976f1", date:"2021-07-12",entryTime: "2:00" , endTime:"7:00", att:"absent"});
    
      await supertest(app).get("/attendance/findbyid/" + post.id)
     // .set('Authorization', `Bearer ${token}`)
      .expect(200)

        .then((response) => {
          expect(response.body._id).toBe(post.id);
          expect(response.body.userid).toBe(post.userid);
          expect(response.body.entryTime).toBe(post.entryTime);
          expect(response.body.endTime).toBe(post.endTime);
          expect(response.body.att).toBe(post.att);

  
        });
    });
   