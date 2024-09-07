import express from 'express';
import bodyParser from 'body-parser';
const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

var posts=[];

app.get('/',(req,res)=>{
    res.render('home.ejs',{posts:posts});
})

app.post('/new',(req,res)=>{
    const post = {
        title:req.body.title,
        content: req.body.post
    };
    posts.push(post);
    res.redirect('/');
})

app.get('/about',(req,res)=>{
    res.render('about.ejs');
})

app.get('/add',(req,res)=>{
    res.render('add.ejs');
})

app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    res.render('post', { post: post });
})

app.post('/del/:id',(req,res)=>{
    posts.splice(req.params.id,1);
    res.redirect('/');
})

app.post('/edit/:id',(req,res)=>{
    console.log(req.params.id);
    res.render("edit",{id:req.params.id,cont:posts[req.params.id]});
})

app.post('/edit-new/:id',(req,res)=>{
    const postId = req.params.id;
    posts[postId].title = req.body.title;
    posts[postId].content = req.body.post;
    res.redirect("/");
})
app.listen(3000,()=>{
    console.log("running at 3000");
})