
// Elm goes there ^
(function(){
    var stdin = process.stdin;
    var fs    = require('fs');
    var worker = Elm.worker(Elm.Main
                            , {responses: null }
                           );
    var handle = function(request) {
        // Debugging:
        // console.log("Bleh: %j", request);
        switch(request.ctor) {
        case 'Put':
            process.stdout.write(request.val);
            break;
        case 'Get':
            stdin.resume();
            break;
        case 'Exit':
            process.exit(request.val);
            break;
        case 'WriteFile':
            fs.writeFileSync(request.file, request.content);
            break;
        }
    }
    var handler = function(reqs) {
        for (var i = 0; i < reqs.length; i++) {
            handle(reqs[i]);
        }
        if (reqs.length > 0 && reqs[reqs.length - 1].ctor !== 'Get') {
            worker.ports.responses.send("");
        }
    }
    worker.ports.requests.subscribe(handler);
    
    // Read
    stdin.on('data', function(chunk) {
        //console.log('Got' + chunk);
        stdin.pause();
        worker.ports.responses.send(chunk.toString());
    })

    // Start msg
    worker.ports.responses.send(null);
})();
} // Close the callback
// Run!
jsdom.env('<p>bleh</p>', [], callback);