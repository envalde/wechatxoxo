const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const redis = require('redis');

// Create new redis database client -> if you need other connection options, please specify here
const redisClient = redis.createClient();

/**
 *Function to print out errors
 *
 * @param {*} err
 * @returns
 */
function consoleError(err){
    if (err) {
        console.error(err);
        return;
    }
}

// Set post key
redisClient.get('next_post_id', (error, result) => {
    consoleError(error);
    if (result == null) {
        redisClient.set('next_post_id','0',redis.print);  
    }else{
        console.log('Post ID Counter: ' + result);
    }
});

app.get('/', (req, res) => {
    res.send('It works!');
});



io.on('connection', socket => {
    console.log('a user connected');
    
    redisClient.keys('post:*',(err,posts)=>{
        consoleError(err);
        posts.forEach(postKey => {
            redisClient.hgetall(postKey,(err,post)=>{
                post['id'] = postKey;
                io.emit('post',JSON.stringify(post));
                console.log(post);
            });
        });
    });

    socket.on('post', postAsJson => {
        const post = JSON.parse(postAsJson);
        console.log(post);
        redisClient.incr('next_post_id',(err, res) =>{
            const postId = 'post:'+res;
            console.log(postId);
            redisClient.hmset(postId,post);
        });
        // Send Post to everyone
        io.emit('post', JSON.stringify(post));
    });


    //like a post
    socket.on('likePost', postId =>{
        
    });


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
