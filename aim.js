
/*
onStart
onSuccess
onFailure
onComplete
*/
AIM = {

	frame: function(c) {
		console.info('AIM.frame');
		var n = 'f' + Math.floor(Math.random() * 99999);
		var d = document.createElement('div');
		d.innerHTML = '<iframe style="display:none" src="about:blank" id="'+n+'" name="'+n+'" onload="AIM.loaded(\''+n+'\')"></iframe>';
		document.body.appendChild(d);
		var i = document.getElementById(n);
		if (c && typeof(c.onComplete) == 'function') {
			i.onComplete = c.onComplete;
		}

		if (c && typeof(c.onSuccess) == 'function') {
			i.onSuccess = c.onSuccess;
		}
		if (c && typeof(c.onFailure) == 'function') {
			i.onFailure = c.onFailure;
		}

		return n;
	},

	form: function(f, name) {
		console.info('AIM.form');
		f.setAttribute('target', name);
	},

	submit: function(f, c) {
		console.info('AIM.submit');
		AIM.form(f, AIM.frame(c));
		if (c && typeof(c.onStart) == 'function') {
			return c.onStart();
		} else {
			return true;
		}
	},

	loaded: function(id) {
		console.info('AIM.loaded');
		var i = document.getElementById(id);
		if (i.contentDocument) {
			var d = i.contentDocument;
		} else if (i.contentWindow) {
			var d = i.contentWindow.document;
		} else {
			var d = window.frames[id].document;
		}

		if (d.location.href == "about:blank") {
		console.info('bp.aim.blank');

			return false;
		}
		console.info('loaded done: '+d.location.href);

		//anadido verificado resultado
		//  ret = window.frames[id].document.getElementsByTagName('body')[0].innerHTML;

		ret = d.getElementsByTagName('body')[0].innerHTML;
 
		console.log('AIM.resultado: '+ret);
		if (ret.length) {
			var resultado = eval('('+ret+')');

			if (resultado && resultado.ok)  {
				console.log('AIM.onSuccess');
				if (typeof(i.onSuccess) == 'function') {
					i.onSuccess(resultado);
				}
			} else {
				console.log('AIM.onFailure');
				if (typeof(i.onFailure) == 'function') {
					i.onFailure(resultado);
				}
			//alert('Fichero no valido');
			}
		}

		//anadido verificado resultado


		if (typeof(i.onComplete) == 'function') {
			i.onComplete(d.body.innerHTML);
		}
	}

}

