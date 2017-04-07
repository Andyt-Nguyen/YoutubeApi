$(document).on('click', function(e){
		e.preventDefault();
		console.log(this);
		$('.youtube').YouTubeModal({autoplay:0, width:640, height:480})
});
