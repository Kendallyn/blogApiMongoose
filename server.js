app.get('/posts', (req, res) => {
    BlogPost.find().exec().then(posts => {
            res.json(posts: posts.map(post => post.apiRepr()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Internal server error'
            });
        });
});

app.get('/posts/:id', (req, res) => {
    BlogPost.findById(req.params.id).exec().then(post => res.json(post.apiRepr()))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        })
})
