$(document).ready()
{ 
		TimeCase = ['#s1','#s2','#s3','#s4','#s5','#s6','#s7','#s8','#s9','#s10','#s11','#s12','#s13','#s14'];
		time = ['#time1','#time2',"#time3","#time4",'#time5','#time6','#time7','#time8','#time9','#time10','#time11','#time12','#time13','#time14'];
		TimeFist = ['#C1','#C2','#C3','#C4','#C5','#C6','#C7','#C8','#C9','#C10','#C11','#C12','#C13','#C14'];
		TimeSecond = ['#D1','#D2','#D3','#D4','#D5','#D6','#D7','#D8','#D9','#D10','#D11','#D12','#D13','#D14']; 
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
                    if (PointTime == undefined)
                        {
                            return undefined;
                        }
                    else
                        {
                            var HelpPer = PointTime.split(':');
                        }
                    if (HelpPer[0][0] == "*")
                        {
                            var HelpStr = HelpPer[0].split('*');
                            HelpPer[0] = HelpStr[1];
                        }
                    TimeSched = parseInt(HelpPer[0])*60 + parseInt(HelpPer[1]);
                    return TimeSched;
        }
    
		function ti(rasp,zapolnin,ChosTravel)
		{
            var i = 0;
            var BoolCheack = true;
            while(i != TimeCase.length)
                {
                    var TimeNow;
                    TimeNow = new Date().getHours() *60+new Date().getMinutes();
                    var TimeSched = TimeHelper(rasp,zapolnin,ChosTravel);
                    if (TimeSched == undefined)
                        {
                            zapolnin = 0;
                            var TimeSched = TimeHelper(rasp,zapolnin,ChosTravel);
                        }
                    var TimeNeed = TimeSched - TimeNow;
                    if (TimeNeed < 0)
                        {
                            if (TimeNeed >= -60)
                                {
                                    $(time[i]).text("");
                                    $(time[i]).css("color","black");
                                    $(TimeCase[i]).css("opacity","0.5");
                                }
                            else
                                {
                                    var Times = (1440 - TimeNow) + TimeSched;
                                    var Min = Times % 60;
                                    var Hour = (Times - Min)/60;
                                    $(TimeCase[i]).css("opacity","1");
                                    if (Hour == 0)
                                        {
                                            $(time[i]).text(Min.toString()+" мин");
                                            $(time[i]).css("color","black");
                                        }
                                    else
                                        {
                                            if(Hour >= 9 && BoolCheack == true)
                                                {
                                                    $(TimeCase[i]).css("opacity","0.7");
                                                    $(time[i]).text("");
                                                    BoolCheack = false;
                                                }
                                            else if (BoolCheack == false)
                                                {
                                                    $(TimeCase[i]).css("opacity","0.001");
                                                }
                                            else
                                                {
                                                    $(time[i]).text(Hour.toString()+' ч '+Min.toString()+" мин");
                                                    $(time[i]).css("color","black");
                                                }
                                        }
                                }
                            
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
                                    if(Hour >= 10)
                                        {
                                            $(TimeCase[i]).css("opacity","0.7");
                                        }
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
                            if(TimeSched == undefined) 
                                {
                                    zapolnin = 0;
                                    continue;
                                }
                            var TimeNow = new Date().getHours() * 60 + new Date().getMinutes();
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
            var One = true;
            while (i != TimeCase.length)
                {
                    var PointTime;
                    var Find = false;
                    if (ChosTravel == true)
                        {PointTime = rasp[zapolnin].t;} 
                    else 
                        {PointTime = rasp[zapolnin].ot;}
                    if (PointTime != undefined)
                        { var HelpPer = PointTime.split(':');}
                    else
                        { 
                            var DayTodays = new Date().getDay();
                            if(DayTodays >= 1 && DayTodays <= 5)
                                {
                                    zapolnin = 0;
                                    continue;
                                }
                            else
                                {
                                    if (One == true)
                                        {
                                            $(TitleTravel[i]).text('Рейсы закончились, приходите после 0:00');
                                            One = false;
                                            i++;
                                            continue;
                                        }
                                    else
                                        {
                                            $(TitleTravel[i]).text('');
                                            $(TimeCase[i]).css("opacity","0")
                                            i++;
                                            continue;
                                        }
                                    
                                }
                        }
                    if (HelpPer[0][0] == "*")
                        {
                            Find = true;
                            var HelpStr = HelpPer[0].split('*');
                            HelpPer[0] = HelpStr[1];
                        }
                    var Hour = HelpPer[0];
                    var Min = HelpPer[1];
                    
                    var TimeSched = parseInt(HelpPer[0])*60 +parseInt(HelpPer[1]);
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
        var Pere;
        var Parsers = new XMLHttpRequest();
		Parsers.open("GET", URL , true);
		Parsers.responseType = "arraybuffer";
		Parsers.onload = function(e) 
		{
			var arraybuffer = Parsers.response;

			var data = new Uint8Array(arraybuffer);
			var arr = new Array();
			for(var i = 0;i != data.length;++i) 
                {
                    arr[i] = String.fromCharCode(data[i]);
                }
			
            var bstr = arr.join("");
			var workbool = XLSX.read(bstr,{type:"binary"});
			var rasp = XLSX.utils.sheet_to_row_object_array(workbool.Sheets[workbool.SheetNames[0]]);
            // --------------
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
			setInterval(function(){ti(rasp,zapolnin,ChosTravel);},500);
		}
        Parsers.send();
}
