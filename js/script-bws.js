// JavaScript Document
	var urlserver = "";
		//	alert(window.location.hostname);
	if( window.location.hostname == '119.59.116.129' )
	{
			urlserver = "http://119.59.116.129/~smportal/admin/";
	}
	else if( location.hostname == 'www.baanwebsite.com')
	{
		urlserver = "http://www.baanwebsite.com/customer/smportal/newdesign/admin/";
	}
	else
	{
		urlserver = "http://"+window.location.hostname+"/baanwebsite/customer/smportal-new/admin/";
	}	
		;
	$("#title").load(urlserver+"include/title.html");  	  		
	/*$("#footer").load(urlserver+"include/footer.html"); 
	 $("#leftmenu").load("../include/header-left-menu.html");  
	$("#right-menu-mb").load(urlserver+"include/right-menu-mb.html");  */
	
 	  
	/***************************** ***********************/
 