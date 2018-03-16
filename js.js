$(document).ready()
{ 
		TimeCase = ['#s1','#s2','#s3','#s4','#s5','#s6','#s7','#s8','#s9','#s10','#s11','#s12','#s13','#s14'];
		time = ['#time1','#time2',"#time3","#time4",'#time5','#time6','#time7','#time8','#time9','#time10','#time11','#time12','#time13','#time14'];
		TimeFist = ['#C1','#C2','#C3','#C4','#C5','#C6','#C7','#C8','#C9','#C10','#C11','#C12','#C13','#C14'];
		TimeSecond = ['#D1','#D2','#D3','#D4','#D5','#D6','#D7','#D8','#D9','#D10','#D11','#D12','#D13','#D14']; 
		TimeTranslet = {0:"24",1:"25",2:"26",3:"27",4:"28",5:"29",6:"30",7:"31",8:"32",9:"33"};
        TitleTravel = ["#li1","#li2","#li3","#li4","#li5","#li6","#li7","#li8","#li9","#li10","#li11","#li12","#li13","#li14",];
        
        function elect(x1,x2)
        {
            $("#Screen2").append('<iframe id="elke" frameborder="1"sandbox="allow-forms"src="https://rasp.yandex.ru/informers/search/?fromId='+x1+'&amp;toId='+x2+'&amp;size=25&amp;color=1&amp;type=suburban"></iframe>');
            $('#choises').text("Расписание готово");
        }
        
        function TimeHelper (rasp,zapolnin,ChosTravel)
        {
                    var PointTime;
                    var TimeSched;
                    if (ChosTravel == true) 
                    {
                        PointTime = rasp[zapolnin].t;
                    } else 
                        {
                            PointTime = rasp[zapolnin].ot;
                        }
                    if (PointTime == "")
                        {
                            TimeSched = 20145;
                            return TimeHelper;
                        }
                    var HelpPer = PointTime.split(':');
                    if (HelpPer[0][0] == "*")
                        {
                            var HelpStr = HelpPer[0].split('*');
                            HelpPer[0] = HelpStr[1];
                        }
                    if (parseInt(HelpPer[0]) >= 0 && parseInt(HelpPer[0]) <= 9)
                        {
                            TimeSched = parseInt(TimeTranslet[parseInt(HelpPer[0])])*60 + parseInt(HelpPer[1]);
                        }
                    else
                        {
                            TimeSched = parseInt(HelpPer[0])*60 + parseInt(HelpPer[1]);
                        }
                    return TimeSched;
        }
    
		function ti(rasp,zapolnin,ChosTravel)
		{
            var i = 0;
            while(i != TimeCase.length)
                {
                    var TimeSched = TimeHelper(rasp,zapolnin,ChosTravel);
                    if (TimeSched > 1440)
                        {
                            TimeSched-= 1440;
                        }
                    var TimeNow = new Date().getHours() *60+new Date().getMinutes();
                    var TimeNeed = TimeSched - TimeNow;
                    if (TimeNeed < 0)
                        {
                            $(time[i]).text("");
                            $(time[i]).css("color","black");
                            $(TimeCase[i]).css("opacity","0.5");
                        }
                    else if (TimeNeed == 0)
                        {
                            $(time[i]).css("color","#F71818");
                            $(time[i]).text("Сейчас");
                            $(TimeCase[i]).css("opacity","1");
                        }
                    else if (TimeNeed <= 10)
                        {
                            $(time[i]).css("color","#F71818");
                            $(time[i]).text(TimeNeed+" мин");
                            $(TimeCase[i]).css("opacity","1");
                        }
                    else
                        {
                            var Min = TimeNeed % 60;
                            var Hour = (TimeNeed - Min)/60;
                            $(TimeCase[i]).css("opacity","1");
                            if (Hour == 0)
                                {
                                    $(time[i]).text(Min.toString()+" мин");
                                    $(time[i]).css("color","black");
                                }
                            else
                                {
                                    $(time[i]).text(Hour.toString()+' ч '+Min.toString()+" мин");
                                    $(time[i]).css("color","black");
                                }
                        }
                    i++;
                    zapolnin++;
                }
		}
    
		function FindTime(rasp,zapolnin,ChosTravel)
		{		
				var End = false;
				while (End != true)
						{
                            var TimeSched = TimeHelper(rasp,zapolnin,ChosTravel);
                            if(TimeSched == 20145) 
                                {
                                    End = true;
                                    zapolnin = 0;
                                    continue;
                                }
                            var TimeNow = new Date().getHours() * 60 + new Date().getMinutes();
                            if (TimeSched > 1440)
                                {
                                    TimeSched -= 1440;
                                }
                            if (TimeSched - TimeNow < 0)
                                    {
                                        var helpInt = (TimeSched - TimeNow)
                                        if (helpInt >= -15)
                                            {
                                                End = true;
                                            }
                                        else
                                            {
                                                zapolnin++;  
                                            }
                                    }
                            else {End = true;}
						}
				return zapolnin;
		}
		
		function TimePlace (rasp,zapolnin,ChosTravel)
		{
			var timeu = 20;				
            var i = 0;
            while (i != TimeCase.length)
                {
                    var PointTime;
                    var Find = false;
                    if (ChosTravel == true) {PointTime = rasp[zapolnin].t;} else {PointTime = rasp[zapolnin].ot;}
                    if (PointTime == ""){zapolnin = 0;continue;}
                    var HelpPer = PointTime.split(':');
                    if (HelpPer[0][0] == "*")
                        {
                            Find = true;
                            var HelpStr = HelpPer[0].split('*');
                            HelpPer[0] = HelpStr[1];
                        }
                    var Hour = HelpPer[0];
                    var Min = HelpPer[1];
                    
                    var TimeSched;
                    if (parseInt(Hour) >= 0 && parseInt(Hour) <= 9)
                        {
                            TimeSched = TimeTranslet[parseInt(Hour)]*60 + parseInt(Min);
                        }
                    else
                        {
                            TimeSched = parseInt(Hour)*60 + parseInt(Min);
                        }
                    TimeSched += timeu;
                    var Min1 = TimeSched % 60;
                    var Hour1 = (TimeSched - Min1) / 60;
                    if (Min1 >= 0 && Min1 <= 9){Min1 = "0" + Min1;}
                    $(TimeSecond[i]).text(Hour1+':'+Min1);
                    $(TimeFist[i]).text(Hour+':'+Min);
                    if (Find == true && ChosTravel == false) 
                        {
                            $(TitleTravel[i]).text('от ст.метро "Славянский бульвар"');
                        }
                    else if (Find == true && ChosTravel == true) 
                        {
                            $(TitleTravel[i]).text('рейс до ст.метро "Славянский бульвар"');
                        } 
                    else if (ChosTravel == false)
                        {
                            $(TitleTravel[i]).text('рейс от станции "Одинцово"');
                        } else 
                            {
                                $(TitleTravel[i]).text('рейс до станции "Одинцово"');
                            }
                    i++;
                    zapolnin++;
                }
				
		}
    
		// Main part;
        var DayToday = new Date().getDay();
        if (DayToday >= 1 && DayToday <= 5 ) {URL = 'exsel_m_f.xlsx';}
        else if (DayToday == 6) {URL = 'exsel_s.xlsx';} else {URL = 'exsel_sa.xlsx';}
		var oReq = new XMLHttpRequest();
		oReq.open("GET", URL , true);
		oReq.responseType = "arraybuffer";
        // function pars
		oReq.onload = function(e) 
		{
			var arraybuffer = oReq.response;

			var data = new Uint8Array(arraybuffer);
			var arr = new Array();
			for(var i = 0;i != data.length;++i) 
                {
                    arr[i] = String.fromCharCode(data[i]);
                }
			
            var bstr = arr.join("");

			var workbool = XLSX.read(bstr,{type:"binary"});

			var first_sheet_name = workbool.SheetNames[0];

			var worksheet = workbool.Sheets[first_sheet_name];
			var rasp = XLSX.utils.sheet_to_row_object_array(worksheet);
			
            // MainCod
            var ChosTravel = true;
            var poslet = true;
            var HelpBool = true;
            var zapolnin = 0;
            var CheackBool = true;
            zapolnin = FindTime(rasp,zapolnin,ChosTravel);
            TimePlace(rasp,zapolnin,ChosTravel);
            
            $('#ot').css("border","1px solid red");
            jQuery('.buus').bind('click',function ()
                {
                    zapolnin = 0;
                    if($(this).attr('id') == "do")
                        {
                            $('#ot').css("border","0");
                            $('#do').css("border","1px solid red");
                            ChosTravel = false;
                            if (HelpBool == true && CheackBool == true)
                                {
                                    x2 = 's9600721';
                                    $('#choises').text("Выберите станцию отправления (До Одинцово)");
                                }
                        } else 
                            {
                                $('#do').css("border","0");
                                $('#ot').css("border","1px solid red");
                                ChosTravel = true;
                                if (HelpBool == true && CheackBool == true)
                                {
                                    x1 = 's9600721';
                                    $('#choises').text("Выберите станцию прибытия (От Одинцово)");
                                }
                            }
                    zapolnin = FindTime(rasp,zapolnin,ChosTravel);
                    TimePlace(rasp,zapolnin,ChosTravel);
                });
                        $('.elc').bind('click',function ()
                            {
                                if (ChosTravel == true)
                                    {
                                        x1 = "s9600721";
                                        x2 = $(this).attr('id');
                                        CheackBool = false;
                                    } else 
                                        {
                                            x2 = 's9600721';
                                            x1 = $(this).attr('id');
                                            CheackBool = false;
                                        }
                                $(".non").remove();
                                elect(x1,x2);
                            });
			setInterval(function(){ti(rasp,zapolnin,ChosTravel);},100);
		}
		oReq.send();	
}
