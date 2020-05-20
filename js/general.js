//Accordion 
function customAccordion($this){
	$this.each(function(){
		if($this.hasClass("expand")){
			$this.removeClass("expand").find(">.panel-content").slideUp();
		}else{
			$this.siblings(".panel-wrapper").removeClass("expand").find(">.panel-content").slideUp();
			$this.addClass("expand").find(">.panel-content").slideDown();
		}
	});
}

//tab
function customTab($this) {
	$this.closest(".tab-wrapper").find(".tab-content > div").each(function(){
		var $tabContent = $(this);
		if($tabContent.attr("data-content") == $this.attr("data-attr")){
			$tabContent.fadeIn("slow");
			$this.closest("li").siblings("li").find("a").removeClass("active-tab");
			$this.addClass("active-tab");
		}else{
			$tabContent.fadeOut("fast");
		}
	});
}

//Modal
function customModal(action) {
	if ( action == open ) {
		// var $modalContent = $(this);
		// $modalContent.fadeIn();
		// $(".overlay").fadeIn();
	}
	
}

function customGallery(action, $this) {
	if ( action == open ) {
		$(".image-popup").fadeIn();
		$(".overlay").fadeIn();
		var $hrefLink = $this.attr("href");
		$(".image-popup").append("<img src='"+$hrefLink+"'/>");
	}
	else if ( action == close) {
		$(".image-popup").fadeOut(300,function(){
			$(".image-popup img").remove();
		});
		$(".overlay").fadeOut();
	}
}


$(document).ready(function(){
	$("a[href='#']").click(function(e){
		e.preventDefault();
	});

	//Accordion function Call
	$(".panel-wrapper > .panel-header").click(function(){
		var $this = $(this).closest(".panel-wrapper");
		customAccordion($this);
		if($this.find('.owl-carousel').length > 0) {
			$('.owl-carousel').owlCarousel({
			    loop:true,
			    margin:10,
			    nav:true,
			    responsive:{
			        0:{
			            items:1
			        },
			        600:{
			            items:3
			        },
			        1000:{
			            items:5
			        }
			    }
			});
		}
	});

	//Menu
	$(".hamburger-icon").click(function(){
		$("html").toggleClass("open-menu").removeClass("open-sub-menu");
	});

	//Mobile Menu
	if($(window).width() < 768 ) {
		$(".navigation > ul > li").each(function(){
			if($(this).find(">ul").length > 0){
				$(this).append("<span class='caret'></span>");
			}
		});
		$(".navigation .caret").click(function(){
			$("html").toggleClass("open-sub-menu");
		});
	}

	//tab
	$(".tab-wrapper .tab-content > div:first-child").fadeIn();
	$(".tab-wrapper li a").click(function(){
		var $this = $(this);
		customTab($this);
	});

	//Modal
	$(".modal-btn").click(function(){
		var $this = $(this);
		$(".modal-wrap").each(function(){
			var $modalContent = $(this);
			if($modalContent.attr("data-modal") == $this.attr("data-modal-link")){
				$modalContent.fadeIn();
				$(".overlay").fadeIn();
			}else {
				$modalContent.fadeOut();
			}
		});
	});

	//Close button
	$(".close-btn").click(function(){
		$(this).closest(".modal-wrap").fadeOut();
		$(".overlay").fadeOut();
	})

	//Image Popup
	$(".image-grid > a").click(function(e){
		e.preventDefault();
		var $this = $(this);
		customGallery(open,$this);
	});

	$(".gallery-close").click(function(){
		customGallery(close);
	});

	$(".action-button a").click(function(){
		var $imagePopupSrc = $(this).closest(".image-popup").find(">img").attr("src");
		var $imageGridSrc = $(".image-grid>a>img").attr("src");
	});

})