;(function () {
	// write your code!
	console.log("let's start!");
        var btn1 = document.querySelector('#btn');
        btn1.addEventListener('click', function () {
             console.log("Hello");s
            /*  scanCode();*/
        }, false);


        function scanCode(){
            window.WindVane.call('Scancode', 'scan', {}, function(e) {
                alert('success: ' + JSON.stringify(e));
            }, function(e) {
                alert('failure: ' + JSON.stringify(e));
    });
}
})();