function handleNotFound(req, res, next) {
    // res.status(404);

    // if (req.accepts('json')) {
    //     res.json({
    //         status: '404 Error',
    //         responseText: 'Page Not Found , Enter Valid Route',
    //         method : req.method,
    //         end_point : req.url
    //     });
    //     return;
    // }
    // res.type('txt').send('Not found');

    res.status(404).send({
        code: 404,
        message: "Not Found",
        method:req.method,
        end_point:req.url
      });
}

function handleServerError(err, req, res, next) {
    // res.status(500).send({
    //     status: '500 Error',
    //     responseText: 'Sorry  , Some thing went wrong',
    //     Err: err
    // })

    res.status(500).send({
        code: 500,
        message: "Internal Server Error",
        Error: err,
      });
}
module.exports = {
    handleNotFound,
    handleServerError
}