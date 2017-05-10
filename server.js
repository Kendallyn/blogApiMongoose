app.get('/posts', (req, res) => {
    BlogPost.find().exec()
        .then(posts => {
            res.json(posts: posts.map(post => post.apiRepr()))
        });
})

.catch(err => {
    console.error(err);
    res.status(500).json({
        error: 'Internal server error'
    });
});

app.get('/posts/:id', (req, res) => {
            BlogPost.findById(req.params.id).exec().then(post => res.json(post.apiRepr()))
                .catch(err => {
                    console.error(err);
                    res.status(500).json({
                        error: 'Internal server error'
                    });
                });

            app.post('/posts', (req, res) => {
                        const requiredFields = ['title', 'content', 'author'];
                        for (let i = 0; i < requiredFields.length, i++) {
                            const field = requiredFields[i];
                            if (!(field in req.body)) {
                                const message = `Missing \`${field}\` in request body`
                                console.error(message);
                                return res.status(400).send(message);
                            }
                        }
                        BlogPost.create({
                                title: req.body.title,
                                content: req.body.content,
                                author: req.body.author
                            })
                            .then(blogPost => res.status(201).json(blogPost.apiRepr()))
                            .catch(err => {
                                res.status(500).json({
                                    error: 'Internal server error'
                                });
                            });
                        app.put('/post/:id', (req, res) => {
                            if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
                                res.status(400).json({
                                    error: 'Request path id and request body id values must match'
                                });
                            }
                            const updated = {};
                            const updateableFields = ['title', 'content', 'author'];
                            updateableFields.forEach(field => {
                                if (field in req.body) {
                                    updated[field] = req.body[field];
                                }
                            });

                            BlogPost.findByIdAndUpdate(req.params.id {
                                    $set: updated
                                }, {
                                    new: true
                                }).exec()
                                .then(updatedPost => res.status(201).json(updatedPost.apiRepr()))
                                .catch(err => res.status(500).json({
                                    message: 'Internal server error'
                                }));
                        });
                        app.delete('/posts/', (req, res) {
                                BlogPost.findByIdAndRemove(req.params.id).exec().then(console.log(`Deleted blog post with id \`${req.params.ID}\``); res.status(204).end();
                                });
                        });
