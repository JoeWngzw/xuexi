


var dobb = document.getElementsByTagName('li');
	console.log(dobb);
	for (var i = 0; i < dobb.length; i++) {
		dobb[i].onclick = function(){
			for (var j = 0; j < dobb.length; j++) {
				dobb[j].className='';
				if(this.value == dobb[j].value){
				this.className = 'active';
				}
		}

		}
    }
	
