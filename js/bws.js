$(function(){
	
	//$('.form-box').tabs();	
	
// Editor	
	tinymce.init({
		selector: ".textarea",
		theme: "modern",
		language : 'th_TH',
		menubar: true,
		font_formats: "Andale Mono=andale mono,times;"+
				"Arial=arial,helvetica,sans-serif;"+
				"Arial Black=arial black,avant garde;"+
				"Book Antiqua=book antiqua,palatino;"+
				"Comic Sans MS=comic sans ms,sans-serif;"+
				"Courier New=courier new,courier;"+
				"Georgia=georgia,palatino;"+
				"Helvetica=helvetica;"+
				"Impact=impact,chicago;"+
				"Symbol=symbol;"+
				"Tahoma=tahoma,arial,helvetica,sans-serif;"+
				"Terminal=terminal,monaco;"+
				"Times New Roman=times new roman,times;"+
				"Trebuchet MS=trebuchet ms,geneva;"+
				"Verdana=verdana,geneva;"+
				"Webdings=webdings;"+
				"Wingdings=wingdings,zapf dingbats;"+
				"supermarket=supermarket",
			fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt",
		plugins: [
			"advlist autolink lists link image charmap print preview hr anchor pagebreak",
			"searchreplace wordcount visualblocks visualchars code fullscreen",
			"insertdatetime media nonbreaking save table contextmenu directionality",
			"emoticons template paste textcolor colorpicker textpattern imagetools image"
		],
		toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |  ",
		toolbar2: "preview media | forecolor backcolor | fontselect fontsizeselect | image link ",
		image_advtab: true,	
		style_formats : [
			{title : 'Line height 20px', selector : 'p,div,h1,h2,h3,h4,h5,h6', styles: {lineHeight: '20px'}},
			{title : 'Line height 25px', selector : 'p,div,h1,h2,h3,h4,h5,h6', styles: {lineHeight: '25px'}},
			{title : 'Line height 30px', selector : 'p,div,h1,h2,h3,h4,h5,h6', styles: {lineHeight: '30px'}},
			{title : 'Line height 35px', selector : 'p,div,h1,h2,h3,h4,h5,h6', styles: {lineHeight: '35px'}},
		 {title : 'Line height 40px', selector : 'p,div,h1,h2,h3,h4,h5,h6', styles: {lineHeight: '40px'}}
		]
	});
	
//Select
	$('.selected-option').click(function(){
		var $input = $(this).find('.input-option');
		$input.focus();
	});

//Show // Hide WIDGET	
	$('.show-hide-widget').click(function(){
		var widgetInbox = $(this).parents('.widget-tool').siblings('.widget-inbox');
		if(widgetInbox.css('display')=='block')
		{
			widgetInbox.hide();
			$(this).removeClass('fa-caret-up').addClass('fa-caret-down');
		}
		else
		{
			widgetInbox.show();
			$(this).removeClass('fa-caret-down').addClass('fa-caret-up');
		}
	});
	
//SUBMIT
/*		$('.bt-save').click(function(){
		
	if($(".maincate:checked").length==0){ // ถ้าไม่มีการเลือก checkbox ใดๆ เลย    
            alert("กรุณาเลือกหมวดหมู่");    
            return false;       
        }    
		
		if($('input[name="name_th"]').val()=="")
		{
			alert("กรุณากรอกชื่อด้วยค่ะ");
			$('input[name="name_th"]').focus();
			return false;
		}
		$('#Form1').submit();
	});
	*/

//ADD PRODUCT CATE
	$('.add-cate').click(function(){
		var cateBox = $(this).parent('.widget-select').next('.widget-inbox-cate');
		var addCateBox =cateBox.next('.add-cate-box');
		if(cateBox.css('display')=='block')
		{
			cateBox.hide();
			addCateBox.hide();
		}
		else
		{
			cateBox.show();
			addCateBox.show();
		}
	});
	
//MAINCATE
	$('.maincate').change(function(){
		var mainID = $(this).attr('data-main');
		
		if($(this).is(":checked") == false)
		{
			$(".sub1-"+mainID).prop('checked', false);
		}
	});	
		
//SUBCATE
	$('.subcate').change(function(){
		var mainID = $(this).attr('data-main');
		
		if($(this).is(":checked") == true)
		{
			$("#main-"+mainID+"").prop('checked', true);
		}
	});	

	
//script Browes files Images
	//var $fileImages =$('.browes-image');
	// $('.add-img').click(function(){
	// 	$('input[name="add_image[]"]').click()
	// });
	// $('input[name="add_image[]"]').change(function(){
	// 	show_image(this);
	// });

//script Browes files Images
	var $fileImages =$('.browes-image2');
	$('.add-img2').click(function(){
		$('input[name="add_image2[]"]').click()
	});
	$('input[name="add_image2[]"]').change(function(){
		show_image2(this);
	});

//script Browes files Images
	var $fileImages =$('.browes-image3');
	$('.add-img3').click(function(){
		$('input[name="add_image3[]"]').click()
	});
	$('input[name="add_image3[]"]').change(function(){
		show_image3(this);
	});


//script Browes files PDF
	$('.add-pdf').click(function(){
		$('input[name="file_array1"]').click()
	});
	$('input[name="file_array1"]').change(function(){
		show_PDF(this);
	});	
	
	$('.add-pdf_en').click(function(){
		$('input[name="file_arrayen1"]').click()
	});
	$('input[name="file_arrayen1"]').change(function(){
		show_PDFEN(this);
	});	
	
	
	
	/*function show_image(inputFile) {
		if(inputFile.files && inputFile.files[0]) {
			
			$('.add-img').parent().find('.review-pic').remove();
			for($i=0;$i<inputFile.files.length;$i++){
				var reader_file = new FileReader();
				reader_file.onload = function (e) {
					$('.add-img').find('img').remove()
					$('.add-img').append("<img src='"+e.target.result+"' width='100%'/>");
					$('.add-img').find('.text').text("เปลี่ยนรูป")
					$('.add-img').css({"padding-top":0, "padding-bottom":0}).find('img').attr('src', e.target.result).removeClass('hidden').width('100%').siblings('span').hide();
				};
				reader_file.readAsDataURL(inputFile.files[$i]);
			
			}
		}
	}*/

	function show_image(inputFile) {
    if(inputFile.files && inputFile.files[0]) {
		
	if(inputFile.files[0].size>"3936256")
		{
			alert("ไฟล์ภาพขนาดใหญ่เกินไป กรุณาลองใหม่อีกครั้งค่ะ");
			return false;
		}
		
		$('.add-img').parent().find('.review-pic').remove();
		for($i=0;$i<inputFile.files.length;$i++){
			var reader_file = new FileReader();
			reader_file.onload = function (e) {
				$('.add-img').after("<div class='review-pic'><img src='"+e.target.result+"'/></div>");
				$('.add-img').find('.text').text("   เปลี่ยนรูป")
				//$('.add-img').css({"padding-top":0, "padding-bottom":0}).find('img').attr('src', e.target.result).removeClass('hidden').width('100%').siblings('span').hide();
			};
			reader_file.readAsDataURL(inputFile.files[$i]);
		
		}
    }
}
	function show_image2(inputFile) {
    if(inputFile.files && inputFile.files[0]) {
		
	if(inputFile.files[0].size>"3936256")
		{
			alert("ไฟล์ภาพขนาดใหญ่เกินไป กรุณาลองใหม่อีกครั้งค่ะ");
			return false;
		}
		
		$('.add-img2').parent().find('.review-pic2').remove();
		for($i=0;$i<inputFile.files.length;$i++){
			var reader_file = new FileReader();
			reader_file.onload = function (e) {
				$('.add-img2').after("<div class='review-pic2'><img src='"+e.target.result+"'/></div>");
				$('.add-img2').find('.text').text("   เปลี่ยนรูป")
				//$('.add-img').css({"padding-top":0, "padding-bottom":0}).find('img').attr('src', e.target.result).removeClass('hidden').width('100%').siblings('span').hide();
			};
			reader_file.readAsDataURL(inputFile.files[$i]);
		
		}
    }
}

	function show_image3(inputFile) {
    if(inputFile.files && inputFile.files[0]) {
		
	if(inputFile.files[0].size>"3936256")
		{
			alert("ไฟล์ภาพขนาดใหญ่เกินไป กรุณาลองใหม่อีกครั้งค่ะ");
			return false;
		}
		
		$('.add-img3').parent().find('.review-pic3').remove();
		for($i=0;$i<inputFile.files.length;$i++){
			var reader_file = new FileReader();
			reader_file.onload = function (e) {
				$('.add-img3').after("<div class='review-pic3'><img src='"+e.target.result+"'/></div>");
				$('.add-img3').find('.text').text("เปลี่ยนรูป")
				//$('.add-img').css({"padding-top":0, "padding-bottom":0}).find('img').attr('src', e.target.result).removeClass('hidden').width('100%').siblings('span').hide();
			};
			reader_file.readAsDataURL(inputFile.files[$i]);
		
		}
    }
}

	function show_PDF(inputFile) {
		if(inputFile.files && inputFile.files[0]) {
			
//			if(inputFile.files[0].type=='application/pdf')
			if ( (inputFile.files[0].type=='application/pdf') || (inputFile.files[0].type=='application/msword') || (inputFile.files[0].type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'))
			{
				$('.add-pdf').find('.text').text(inputFile.files[0].name);
			}
			else
			{
//				alert("กรุณาเลือกไฟล์ .PDF เท่านั้น");
				alert("กรุณาเลือกไฟล์ .pdf .doc .docx เท่านั้น");
				return false;
			}
		}
	}

	function show_PDFEN(inputFile) {
		if(inputFile.files && inputFile.files[0]) {
			
			if(inputFile.files[0].type=='application/pdf')
			{
				$('.add-pdf_en').find('.text').text(inputFile.files[0].name);
			}
			else
			{
				alert("กรุณาเลือกไฟล์ .PDF เท่านั้น");
				return false;
			}
		}
	}
});

