$(document).ready()
{ 

		help1 = ['#s1','#s2','#s3','#s4','#s5','#s6','#s7','#s8','#s9','#s10','#s11','#s12','#s13','#s14'];
		time = ['#time1','#time2',"#time3","#time4",'#time5','#time6','#time7','#time8','#time9','#time10','#time11','#time12','#time13','#time14'];
		sd = ['#C1','#C2','#C3','#C4','#C5','#C6','#C7','#C8','#C9','#C10','#C11','#C12','#C13','#C14'];
		dd = ['#D1','#D2','#D3','#D4','#D5','#D6','#D7','#D8','#D9','#D10','#D11','#D12','#D13','#D14']; 
		help = {0:"24",1:"25",2:"26",3:"27",4:"28",5:"29",6:"30",7:"31",8:"31",9:"31"};
        lil = ["#li1","#li2","#li3","#li4","#li5","#li6","#li7","#li8","#li9","#li10","#li11","#li12","#li13","#li14",];
		
		function ti(rasp,zapolnin,per)
		{
				function tizs(rasp,zapolnin,per)
				{
                        if (per == true) {var ra = rasp[zapolnin].t;} else {var ra = rasp[zapolnin].ot;}
						hou = "",min = "";
						var i = 0;
                        if (ra[0] == '*' && ra[1] == "*") {i+=2;}
						else if (ra[0] == "*"){i++;}
						while (ra[i] != ":")
						{hou += ra[i];i++;}
						i++;
						while (i != ra.length)
								{min += ra[i];i++;}
                        console.log(hou+" "+min);
				}
				
				var hel = 0;
				tizs(rasp,zapolnin,per);
				while(hel != help1.length)
					{
						var date = new Date(),houn = date.getHours(),minn = date.getMinutes();
						var ho = 0,mo = 0;
						hou = parseInt(hou);
						min = parseInt(min);
						if (hou >= 0 && hou <= 9) {if(houn >= 0 && houn <= 9){ho = parseInt(help[hou]) - parseInt(help[houn]);} else {ho = parseInt(help[hou]) - houn;}} else {ho = parseInt(hou) - houn;}
						if (ho > 0 && min - minn < 0){ho -=1;mo = (min+60) - minn;} else {mo = min - minn;}
                        if (ho <= 0 && mo < 0){$(time[hel]).css("background-color","#F8F8F2");$(time[hel]).text("----------");$(time[hel]).css("color","#C1BDBD");}
                        else if (ho == 0 && mo == 0) {$(time[hel]).css("background-color","#F71818");$(time[hel]).css("color","#FFF5F5");$(time[hel]).text("Сейчас");}
                        else if (ho == 0 && mo <= 10) {$(time[hel]).css("background-color","#F71818");$(time[hel]).css("color","#FFF5F5");$(time[hel]).text("Через: "+mo.toString()+" Мин");}
                        else if (ho == 0) {$(time[hel]).css("color","black");$(time[hel]).text("Через: "+mo.toString()+" Мин");$(time[hel]).css("background-color","#FFFFFF");}
                        else if (ho > 0 && mo == 0) {$(time[hel]).css("color","black");$(time[hel]).text("Через: "+ho.toString()+" ч ");}
                        else {$(time[hel]).text("Через: "+ho.toString()+" ч "+mo.toString()+" Мин");$(time[hel]).css("background-color","#FFFFFF");$(time[hel]).css("color","black");}
						hel++;
						zapolnin++;
                        if (per == false) {var xal = 2;} else {var xal = 1;}
                        if (zapolnin+2 == rasp.length+xal) {zapolnin = 0;}
						tizs(rasp,zapolnin,per);
					}
		}
		
		function cheak(rasp,zapolnin,per)
		{
				function ctiz(rasp,zapolnin)
				{
				        if (per == true) {var ra = rasp[zapolnin].t;} else {var ra = rasp[zapolnin].ot;}
						hou = "",min = "";
						var i = 0;
                        if (ra[0] == '*' && ra[1] == "*") {i+=2;}
						else if (ra[0] == "*"){i++;}
						while (ra[i] != ":")
								{hou += ra[i];i++;}
						i++;
						while (i != ra.length)
								{min += ra[i];i++;}
						
				}
				
				var end = false;
				ctiz(rasp,zapolnin);
				while (end != true)
						{
								var date = new Date(),houn = date.getHours(),minn = date.getMinutes();
								hou = parseInt(hou);
								min = parseInt(min);
								if (hou - houn < 0)
										{zapolnin++;ctiz(rasp,zapolnin);}
								else if (hou - houn == 0 && min - minn < 0)
										{zapolnin++;ctiz(rasp,zapolnin);}
								else {end = true;}
						}
				return zapolnin;
		}
		
		function zap (rasp,zapolnin,per)
		{
			var timeu = 20;
			function tiz(rasp,zapolnin)
				{
						if (per == true) {var ra = rasp[zapolnin].t;} else {var ra = rasp[zapolnin].ot;}
						hou = "",min = "";
						var i = 0;
                        if (ra[0] == "*" && ra[1] == "*") {i+=2;timeu = 50;}
						else if (ra[0] == "*"){i++;timeu = 50;} else {timeu = 20;}
						while (ra[i] != ":")
						{hou += ra[i];i++;}
						i++;
						while (i != ra.length)
								{min += ra[i];i++;}
						hour = parseInt(hou);
						mint = parseInt(min);
						mint += timeu;
						if (mint >= 60) {if (hour == 23){hour = 0;} else {hour += 1;} mint -= 60;}
                    
				}
				
				var hel = 0;
				tiz(rasp,zapolnin)
				while (hel != help1.length)
					{
                        if (per == true) {var ra = rasp[zapolnin].t;} else {var ra = rasp[zapolnin].ot;}
						$(sd[hel]).text(hou+':'+min);
                        if (ra[0] == "*" && ra[1] == '*') {$(lil[hel]).text(" от ст.метро 'Славянский бульвар'");}
                        else if (ra[0] == "*") {$(lil[hel]).text(" рейс до ст.метро 'Славянский бульвар'");} else 
                        if (per == false){$(lil[hel]).text(" рейс от станции 'Одинцово'");} else {$(lil[hel]).text(" рейс до станции 'Одинцово'");}
						if (mint >=0 && mint <= 9) {$(dd[hel]).text(hour.toString()+':'+"0"+mint.toString());}
							else {$(dd[hel]).text(hour.toString()+":"+mint.toString());}
						hel++;
						zapolnin++;
                        if (per == false) {var xal = 2;} else {var xal = 1;}
                        if (zapolnin+2 == rasp.length+xal) {zapolnin = 0;}
						tiz(rasp,zapolnin);
					}
				
		}
		
        var now = new Date();
        var day = now.getDay();
        if (day >= 1 && day <= 5 ) {url = 'exsel_m_f.xlsx';}
        else if (day == 6) {url = 'exsel_s.xlsx';} else {url = 'exsel_sa.xlsx';}
		var oReq = new XMLHttpRequest();
		oReq.open("GET", url , true);
		oReq.responseType = "arraybuffer";
		oReq.onload = function(e) 
		{
			var arraybuffer = oReq.response;

			var data = new Uint8Array(arraybuffer);
			var arr = new Array();
			for(var i = 0;i != data.length;++i) {arr[i] = String.fromCharCode(data[i]);}
			var bstr = arr.join("");

			var workbool = XLSX.read(bstr,{type:"binary"});

			var first_sheet_name = workbool.SheetNames[0];

			var worksheet = workbool.Sheets[first_sheet_name];
			var rasp = XLSX.utils.sheet_to_row_object_array(worksheet);
			
            var per = true;
            var zapolnin = 1;
            setInterval(function()
                        {
                 jQuery('button').bind('click',function ()
                    {
                        var id = $(this).attr('id');
                        if (id == 'ot') {per = true;}
                        else if (id == "do" ){per = false;}
                        zapolnin = cheak(rasp,zapolnin,per);
                        zap(rasp,zapolnin,per);
                 });
            },1000);
			zapolnin = cheak(rasp,zapolnin,per);
			var xl = zapolnin;
			zap(rasp,zapolnin,per);
			setInterval(function(){ti(rasp,xl,per);},100);
			
		}
		oReq.send();
		
}
