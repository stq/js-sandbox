angular.module('app', [])
    .run(['$rootScope', function($rootScope) {
        $rootScope._ = _;
    }])
    .config(["$logProvider", function($logProvider) {
        $logProvider.debugEnabled(true);
    }])
    .controller('app', ['$scope', '$http', function($scope, $http) {

        //since it's not an angularish promise we need manually tell to run digest
        Promise.prototype.decorate(function(){
            $scope.$apply();
        });

        $scope.example = {
            init: function() {
                Hypervisor.createSandbox({
                    src: [
                        "../test/3rdparty/lib/pnglib.js",
                        "../test/3rdparty/img-gen.js"
                    ]
                }).then(function(sandbox) {
                    $scope.sandbox = sandbox;
                });
            },
            run: function() {
                $http.get("img-params.json")
                    .then(function(rs) {
                        $scope.sandbox.buildImg(256, rs.data.seed, rs.data.scale)
                            .then(function(img) {
                                $scope.example.image = img;
                            });
                    });
            }
        };

        $scope.format = function(f) {
            return f.toString().replace(/\n {16}/g, "\n").replace(/^.*\r\n/, "").replace(/.*$/, "");
        };


        function initTest(opts) {
            return Hypervisor.createSandbox(opts)
        }

        $scope.testResults = {};

        $scope.test = {
            access: function(sandbox) {
                return sandbox.access().then(function(rs) {
                    $scope.testResults.access = rs;
                });
            },
            steal: function(sandbox) {
                return sandbox.xhrget("http://google.com").then(function(rs) {
                    $scope.testResults.steal = 'Failed';
                }, function(){
                    $scope.testResults.steal = 'Passed';
                });
            },

            loop: function(sandbox){
                return sandbox.loop().then(function(rs) {
                    $scope.testResults.loop = 'Failed';
                    $scope.$apply();
                }, function(err){
                    $scope.testResults.loop = err == 'timeout' ? 'Passed' : 'Failed';
                });
            }
        };

        $scope.runTests = function() {
            var opts = {
                src: [
                    "../test/3rdparty/unsafe.js"
                ]
            };
            initTest(opts).then(function(sandbox) {
                return $scope.test.access(sandbox);
            });
            initTest(opts).then(function(sandbox) {
                return $scope.test.steal(sandbox);
            });

            opts = _.clone(opts);
            opts.timeout = 1000;
            initTest(opts).then(function(sandbox) {
                return $scope.test.loop(sandbox);
            });
            opts.src.push('../test/3rdparty/long-init.js');
            initTest(opts).then(function(sandbox) {
                $scope.testResults.longInit = 'Failed';
            }, function(err){
                $scope.testResults.longInit = err == 'timeout' ? 'Passed' : 'Failed';
            });
        };

    }]);