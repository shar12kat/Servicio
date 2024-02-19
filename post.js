router.post('/', async (req,res) => {
    //Para la respuesta del post en consola:
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        res.json({messaje:error});
    }

});

