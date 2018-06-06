angular.module("app", []).component("videouploader",{
    templateUrl: 'uploader.html',
    controller: videouploadController    
});

function videouploadController($scope){      
   
    $scope.message = '';    
    var urll = 'https://upload.wistia.com/?api_password=263c57e8030b43716767c5a50ed25bf86b03977f814637a12599c0418e7d8f0b';
    
    $scope.cssprogress = { 'width' : '0%', background : '#ff7400'};    
  
    angular.element('#fileupload').fileupload({                        
        url : urll,        
        add: function (e, data) {                               
            data.submit();
        },
        start: function(e){            
            $scope.cssprogress = {'width' : '0%', background : '#ff7400'};                        
            $scope.message = 'Uploading file...';         
            $scope.$apply();
        },
        progress: function (e, data) {          
            var progress = parseInt(data.loaded / data.total * 100, 10);            
            $scope.cssprogress = {'width' : progress + '%', background : 'blue'};
            $scope.$apply();
        },
        done: function (e, data) {                                                                
            $scope.cssprogress = {'width' : '100%', background : 'green'};       
            var container = angular.element(document.querySelector('#video-container'));
            container.append('<div class="wistia_embed wistia_async_' + data.result.hashed_id + ' video-item"></div>');            
            $scope.message = 'Your video has been uploaded!';
            $scope.$apply();            
        },
        fail: function(e, data){                        
            $scope.cssprogress = {'width' : '100%', background : 'red'};
            $scope.message = 'An error has occurred: "' + data.errorThrown + '".' + ' Please check uploaded videos limit.';
            $scope.$apply();
        }
    });  
}