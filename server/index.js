const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const redis = require("redis");


const dbname = "10-tweety";
// Create new redis database client -> if you need other connection options, please specify here
const redisClient = redis.createClient({
  url:
    "rediss://default:gai689ypykqx0fjj@dhbw-wwi-ndbk-do-user-883655-0.db.ondigitalocean.com:25061",
  tls: {}
});

/**
 *Function to print out errors
 *
 * @param {*} err
 * @returns
 */
function consoleError(err) {
  if (err) {
    console.error(err);
    return;
  }
}

// Set post key
redisClient.get("next_post_id", (error, result) => {
  consoleError(error);
  if (result == null) {
    redisClient.set("next_post_id", "0", redis.print);
  } else {
    console.log("Post ID Counter: " + result);
  }
});

app.get("/", (req, res) => {
  res.send("It works!");
});



io.on('connection', socket => {
  console.log('a user connected to tweety. Every Post from Redis Database will be published');

  redisClient.lrange(dbname, 0, -1, (err, PostJsonStrings) =>{
    consoleError(err);

    const objects = PostJsonStrings.map(string => JSON.parse(string));
    
    console.log('alle Posts werden weitergegeben');
    socket.emit('previous posts', JSON.stringify(objects));

  });



    socket.on('post', postJson => {
      //var postcounter = 0;
      console.log('versuche zu posten');

      const post = JSON.parse(postJson);
      redisClient.incr("next_post_id", (err, res) => {
        consoleError(err);

        post.id = res;
        redisClient.rpush(dbname, JSON.stringify(post));
        io.emit('post', JSON.stringify(post));
        console.log(post);
      });

    });

    socket.on('like', id => {
      console.log("Post mit der ID " +  id + "wurde geliket");
      redisClient.lrange(dbname, 0, -1, (err, postJson) => {
        consoleError(err);

        var objects = postJson.map(string => JSON.parse(string));
        var counter = 0;
        var index = 0;
        var likedpost;

      objects.forEach(Element =>{
        if (Element.id === id){
          index = counter;
          likedpost = Element;
          console.log(Element);
        }
        counter++;
      });

      likedpost.likeCount += 1;

      console.log(likedpost);
      redisClient.lset(dbname, index, JSON.stringify(likedpost));
      io.emit('previous posts', JSON.stringify(objects));
      console.log("daten wurden in der Datenbank gespeichert");
      });

    });

    socket.on('disconnect', () => {
      console.log('user disconnected from service');
    });

    


});


http.listen(3000, function() {
  console.log("listening on *:3000");
});
