const router = require('express').Router();

router.get('/new',(req,res)=>{
    res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });
})