var Docker = require('dockerode');
var child = require('child_process');

var docker = new Docker();
var CONTAINER_NAME = 'fb-db';

//Teardown
process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    cleanup(process.exit);
});

function startmysql(callback) {
    docker.createContainer({
        Image: 'mysql:8',
        name: CONTAINER_NAME,
        Env: ['MYSQL_ROOT_PASSWORD=fbdev'],
        HostConfig: {
            PortBindings: {
                "3306/tcp": [{
                    HostPort: "3306"
                }]
            }
        }
    }, function(err, container) {
        container.start(function(err, data) {
            if (callback) {
                callback();
            }
        });
    });
}

function cleanup(callback) {
    var container = docker.getContainer(CONTAINER_NAME);
    container.stop(function(err, data) {
        container.remove(function(err, data) {
            if (callback) {
                callback();
            }
        });
    });
}

function startDocker(callback) {
    console.log("Downloading mysql docker container, please wait...");
    docker.pull('mysql:8', function(err, stream) {
        docker.modem.followProgress(stream, onFinished, onProgress);

        function onFinished(err, output) {
            //output is an array with output json parsed objects
            if (err !== null) {
                console.error("Docker pull failed with error:");
                console.error(err);
            }
            else {
                console.log("MySQL container was downloaded!");
                console.log("Stopping and cleaning up any old instances...");
                cleanup(function() {
                    startmysql(function() {
                        if (callback) {
                            callback();
                        }
                    });
                });
            }
        }

        function onProgress(event) {}
    });
}

function startApp(callback) {
    var proc = child.fork('src/app.js');
    process.on('error', function(err) {
        if (callback) {
            callback();
        };
    });
    process.on('exit', function(err) {
        if (callback) {
            callback();
        };
    });
}

startDocker(function() {
    console.log("hello!");
    process.env['FBDEV'] = true;
    startApp(function() {
        cleanup(process.exit);
    })
});
