$(document).ready(function () {
    var num = 20;
    init(num);
    var delay = 100;
    var classname;
    var sett;
    var iteration = 0;
    back = [];
    iteration = 0;
    var m;
    back[iteration] = [];
    back[iteration] = new Array(num * num).fill(0);
//create the grid 
    function init(num) {
        back = [];
        $("#previous").prop('disabled', true);
        var z = 0;
        for (var i = 0; i < num; i++)
        {	 //first step all zeros
            for (var j = 0; j < num; j++)
            {
                if (num == 20) {
                    classname = "cell" + 20;
                    var $btn = $('<div/>').attr({row: (i + 1), col: (j + 1), class: 'cell20', flag: 0, num: (z)});
                    $("#main").append($btn);
                    z++;
                } else if (num == 50)
                {
                    classname = "cell" + 50;
                    var $btn = $('<div/>').attr({row: (i + 1), col: (j + 1), class: 'cell50', flag: 0, num: (z)});
                    $("#main").append($btn);
                    z++;
                } else if (num == 100)
                {
                    classname = "cell" + 100;
                    var $btn = $('<div/>').attr({row: (i + 1), col: (j + 1), class: 'cell100', flag: 0, num: (z)});
                    $("#main").append($btn);
                    z++;
                }
            }
            var $br = $("<br/>")
            $("#main").append($br);
        }

        clickedcell();
    };
    function Run() {
        iteration++;
        if (iteration < 1)
        {
            $("#previous").prop('disabled', true);
        } else {
            $("#previous").prop('disabled', false);
        }

        if (($("#run").html()) == "Pasue")
        {
            $("#next").prop('disabled', true);
            $("#previous").prop('disabled', true);
        } else
        {
            $("#next").prop('disabled', false);
            $("#previous").prop('disabled', false);
        }
        var neb = [];
        var countInactive = 0;
        var countActive = 0;
        var changed_suqares = [];
        var changed_num = [];
        var flags = [];
        var ian = [];
        back[iteration] = [];
        //console.log(back);
        //console.log(back[ iteration-1].length);
        back[iteration] = [];
        back[iteration] = back[iteration - 1].slice(0, back[iteration - 1].length);

        $(".changed").each(function (i, e) {
            neb = getNighbours(this); //neighbour of changed
            countActive = 0;
            countInactive = 0;
            var inac = 0;
            $.each(neb, function (index, value) {
                inac = 0;
                if ($(value).attr("flag") == 0)
                {
                    countInactive++;
                    ian = getNighbours($(value));
                    inac = 0;
                    $.each(ian, function (i, v)
                    {
                        if ($(v).attr("flag") == 1)
                        {
                            inac++;
                        }
                    });
                    if (inac == 3)
                    {
                        changed_suqares.push($(value));
                        flags.push(1);
                        //console.log(flags);
                        //console.log(changed_suqares);
                        inac = 0;
                    }
                } else {
                    countActive++;
                }
            });
            if ($(this).attr("flag") == 0)			//inactive square
            {
                if (countActive == 3)
                {
                    flags.push(1);
                    changed_suqares.push(this);

                }
            } else if (($(this).attr("flag") == 1) && ((countActive > 3) || (countActive < 2)))
            {
                flags.push(0);
                changed_suqares.push(this);
            }
        });
        //console.log(back);
        //console.log(flags);
        //console.log(changed_suqares);
        $.each(changed_suqares, function (i, e) {
            //	console.log($(e));
            var num = $(e).attr("num");
            if (flags[i] == 1)
            {
                $(e).attr("flag", flags[i]).addClass("changed").css('background-color', 'purple');
                back[iteration][num] = 1;
            } else
            {
                $(e).attr("flag", flags[i]).removeClass("changed").css('background-color', 'white');
                back[iteration][num] = 0;
            }
        });
        //console.log(back);
    }
//get neighbour
    function getNighbours(elements)
    {
        var neighbour = [];
        var ROW = $(elements).attr("row");
        var COL = $(elements).attr("col");
        if ($("[row=" + (ROW) + "][col=" + (parseInt(COL) + 1) + "]").length)
        {
            neighbour.push($("[row=" + (ROW) + "][col=" + (parseInt(COL) + 1) + "]"));
        }
        if ($("[row=" + (parseInt(ROW) + 1) + "][col=" + (parseInt(COL) + 1) + "]").length)
        {
            neighbour.push($("[row=" + (parseInt(ROW) + 1) + "][col=" + (parseInt(COL) + 1) + "]"))
        }

        if ($("[row=" + (parseInt(ROW) + 1) + "][col=" + (parseInt(COL)) + "]").length)
        {
            neighbour.push($("[row=" + (parseInt(ROW) + 1) + "][col=" + (parseInt(COL)) + "]"))
        }
        if ($("[row=" + (ROW) + "][col=" + (parseInt(COL) - 1) + "]").length)
        {
            neighbour.push($("[row=" + (ROW) + "][col=" + (parseInt(COL) - 1) + "]"))
        }

        if ($("[row=" + (parseInt(ROW) + 1) + "][col=" + (parseInt(COL) - 1) + "]").length)
        {
            neighbour.push($("[row=" + (parseInt(ROW) + 1) + "][col=" + (parseInt(COL) - 1) + "]"))
        }
        if ($("[row=" + (parseInt(ROW) - 1) + "][col=" + (parseInt(COL) - 1) + "]").length)
        {
            neighbour.push($("[row=" + (parseInt(ROW) - 1) + "][col=" + (parseInt(COL) - 1) + "]"));
        }
        if ($("[row=" + (parseInt(ROW) - 1) + "][col=" + (parseInt(COL)) + "]").length) {
            neighbour.push($("[row=" + (parseInt(ROW) - 1) + "][col=" + (parseInt(COL)) + "]"));
        }
        if ($("[row=" + (parseInt(ROW) - 1) + "][col=" + (parseInt(COL) + 1) + "]").length) {
            neighbour.push($("[row=" + (parseInt(ROW) - 1) + "][col=" + (parseInt(COL) + 1) + "]"));
        }
        return neighbour;
    }
    function AutoRun(state, delay)
    {
        if (state == 1) {
            sett = setInterval(function () {
                Run()
            }, delay);
        } else {
            clearInterval(sett);
            $("#previous").prop('disabled', false);
            $("#next").prop('disabled', false);
        }
    }
//Start function to handle initial states
    function clickedcell()
    {
        iteration = 0;
        back = [];
        back[iteration] = new Array(num * num).fill(0);
        $("." + classname).on("click", function () {
            console.log(classname);
            if (iteration === 0)
            {
                if (($(this).attr("flag")) == 0)
                {
                    $(this).css('background-color', 'purple');
                    $(this).addClass("changed");
                    m = $(this).attr("num");
                    back[iteration][m] = 1;
                    $(this).attr("flag", 1);
                } else
                {
                    $(this).css('background-color', 'white');
                    $(this).attr("flag", 0);
                    $(this).removeClass("changed");
                    m = $(this).attr("num");
                    back[iteration][m] = 0;
                }
            }

        });
    }
    $("#reset").on("click", function () {
        reset();
    });
//Resetting function
    function reset()
    {
        back = [];
        $("." + classname).each(function (i, e) {
            $(e).attr("flag", 0).css('background-color', 'white').removeClass("changed");
            //$("#set").prop('disabled',false);
            $("#run").html("Start");
            AutoRun(0);
            iteration = 0;
            $("#previous").prop('disabled', true);
            back[i] = [];
        });
        back[iteration] = new Array(num * num).fill(0);
        //console.log(back);
    }

//Next 
    $("#next").on("click", function () {

        Run();
    });
//start
    $("#run").on("click", function ()
    {
        if (($(this).html() == "Start")) {
            $(this).html("Pasue");
            AutoRun(1, delay);
        } else
        {
            AutoRun(0);
            clearInterval(sett);
            $(this).html("Start");
        }
    });
    //drop down list of grid size
    $("#grid").on("change", function () {
        iteration = 0;
        var x = $("#grid").val();
        //console.log(x);
        $("#main").html(" ");
        num = x;
        init(x);
        reset();
    });
//drop down list of delay
    $("#delay").on("change", function () {
        delay = $("#delay").val();
        //console.log(delay);
        //console.log($("#run").html());
        if (($("#run").html()) == "Pasue")
        {
            delay = $("#delay").val();
            AutoRun(0);
            AutoRun(1, delay);
        }
    });
//get previous 
    $("#previous").on("click", function () {
        //console.log(iteration);
        var len = back.length;
        var check = true;
        //console.log(len);
        var array = back[iteration - 1];
        //console.log(array);
        $("." + classname).each(function (i, v) {
            if ((array[i] == 1) && (check))
            {
                $(v).attr("flag", array[i]).addClass("changed").css('background-color', 'purple');
            } else
            {
                $(v).attr("flag", array[i]).removeClass("changed").css('background-color', 'white');
            }
        });
        iteration--;
        if (iteration < 1)
        {
            $("#previous").prop('disabled', true);
            check = false
        } else {
            $("#previous").prop('disabled', false);
            check = true
        }
    });


});
