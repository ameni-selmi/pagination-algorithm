function verifnumerique(x) {

    var test = true;
    if (x.length == 0)
        test = false;
    else {
        var i = 0;
        while (i < x.length && test == true) {
            if (isNaN(x[i]) == true) {

                alert(x[i]);
                test = false;
            } else i++;
        }
    }
    return test;
}

function addcommas(x) {
    if (x.length == 1) { return x + ','; } else {
        var n = '';
        n = n + x[0] + ',';
        for (var i = 1; i < x.length - 1; i++) {
            n = n + x[i] + ',';
        }
        n = n + x[x.length - 1];
        return n;
    }
}

function afficher_FIFO() {
    var line1 = document.getElementById("Row1");
    line1.innerHTML = "";
    var line2 = document.getElementById("Row2");
    line2.innerHTML = "";
    var line3 = document.getElementById("Row3");
    line3.innerHTML = "";

    var line = document.getElementById("myRow");
    line.innerHTML = "";
    var myTable = document.getElementById("myTable");
    myTable.innerHTML = "";
    var ch = document.getElementById('chaine').value;
    var frames = document.getElementById('nbrcadres').value; //frames contains the number of frames taken from user

    var rowPF = document.getElementById("RowPF");
    rowPF.innerHTML = "";
    if (verifnumerique(ch) == false) {
        alert("Please type figures only as a reference string !");
        return false;
    } else
    if (verifnumerique(frames) == false) {
        alert("Please type figures only as a number of frames !");
        return false;
    } else {
        var pointer = 0,
            hit = 0,
            f = 0;
        var mem_layout = []; // memory Table   
        var fault = [];

        var size = ch.length; //

        var res = addcommas(ch);
        const reference = res.split(',');

        var z = 1; //this variable helps in counting the seconds of the animation delay for each case 
        for (var i = 0; i < size; i++) {
            var x = line.insertCell(i);
            x.innerHTML = reference[i];
            x.className = "animated zoomIn"; //the animation name(style)
            x.style.animationDelay = z + "s"; //the animation delay
            z = z + 0.75;
        }
        //create table mem_layout
        //create an array in each column of the array 
        for (var i = 0; i < size; i++)
            mem_layout[i] = [];

        for (var i = 0; i < size; i++) {
            fault[i] = "";
        }
        var buffer = [];
        for (var j = 0; j < frames; j++)
            buffer[j] = -1;

        for (var i = 0; i < size; i++) {
            var search = -1;
            for (var j = 0; j < frames; j++) {
                if (buffer[j] == reference[i]) {
                    search = j;
                    hit++;
                    break;
                }
            }
            if (search == -1) {
                buffer[pointer] = reference[i];
                fault[i] = "P.F.";
                f++;
                pointer++;
                if (pointer == frames)
                    pointer = 0;
            }
            for (var j = 0; j < frames; j++)
                mem_layout[i][j] = buffer[j];
        }

        //creating the second table with the appropriate cells for each row
        for (var i = 0; i < frames; i++) {
            var lineT2 = myTable.insertRow(i);

            for (var j = 0; j < size; j++) {
                var y = lineT2.insertCell(j);
            }
        }

        for (var i = 0; i < size; i++) {
            for (var j = 0; j < frames; j++) {
                var y = myTable.rows[j].cells[i];

                if (mem_layout[i][j] != -1) {
                    y.innerHTML = mem_layout[i][j];
                    y.className = "animated fadeInDown";
                    y.style.animationDelay = z + "s";
                    z = z + 0.75;
                }

            }
            var col = rowPF.insertCell(i);
            if (fault[i] == "P.F.") {
                col.innerHTML = fault[i];
                col.className = "animated bounceIn";
                col.style.animationDelay = z + "s";
                z = z + 0.75;
            }
        }
        var col1 = line1.insertCell(0);
        col1.innerHTML = "<th>The total number of Hits : </th>";
        col1.className = "animated fadeInRight";
        col1.style.animationDelay = z + "s";
        var col11 = line1.insertCell(1);
        col11.innerHTML = "<b>" + hit + "</b>";
        col11.className = "animated fadeInRight";
        col11.style.animationDelay = z + "s";
        z++;

        var col2 = line2.insertCell(0);
        col2.innerHTML = "<th>Hit Ratio : </th><b>";
        col2.className = "animated fadeInRight";
        col2.style.animationDelay = z + "s";
        var col22 = line2.insertCell(1);
        col22.innerHTML = "<b>" + hit / size + "</b>";
        col22.className = "animated fadeInRight";
        col22.style.animationDelay = z + "s";
        z++;

        var col3 = line3.insertCell(0);
        col3.innerHTML = "<th>The total number of Page Faults : </th>";
        col3.className = "animated fadeInRight";
        col3.style.animationDelay = z + "s";
        var col33 = line3.insertCell(1);
        col33.innerHTML = "<b>" + f + "</b>";
        col33.className = "animated fadeInRight";
        col33.style.animationDelay = z + "s";
        z++;
    }
}


function afficher_LRU() {
    var line1 = document.getElementById("Row1");
    line1.innerHTML = "";
    var line2 = document.getElementById("Row2");
    line2.innerHTML = "";
    var line3 = document.getElementById("Row3");
    line3.innerHTML = "";

    var line = document.getElementById("myRow");
    line.innerHTML = "";
    var myTable = document.getElementById("myTable");
    myTable.innerHTML = "";
    var ch = document.getElementById('chaine').value;
    var frames = document.getElementById('nbrcadres').value; //frames contains the number of frames taken from user

    var rowPF = document.getElementById("RowPF");
    rowPF.innerHTML = "";
    if (verifnumerique(ch) == false) {
        alert("Please type figures only as a reference string !");
        return false;
    } else
    if (verifnumerique(frames) == false) {
        alert("Please type figures only as a number of frames !");
        return false;
    } else {

        var pointer = 0,
            hit = 0,
            f = 0;
        var isFull = false;
        var buffer = [];

        var size = ch.length;

        var res = addcommas(ch);
        const reference = res.split(',');

        var z = 1; //this variable helps in counting the seconds of the animation delay for each case 
        for (var i = 0; i < size; i++) {
            var x = line.insertCell(i);
            x.innerHTML = reference[i];
            x.className = "animated zoomIn"; //the animation name(style)
            x.style.animationDelay = z + "s"; //the animation delay
            z = z + 0.75;
        }

        var mem_layout = []; // memory Table

        //create table mem_layout
        //create an array in each column of the array 
        for (var i = 0; i < size; i++)
            mem_layout[i] = [];

        //fill the table with -1 
        for (var i = 0; i < size; i++)
            for (var j = 0; j < frames; j++)
                mem_layout[i][j] = -1;


        var fault = [];
        for (var i = 0; i < size; i++) {
            fault[i] = "";
        }

        var stack = [];
        var search;
        for (var j = 0; j < frames; j++)
            buffer[j] = -1;


        for (var i = 0; i < size; i++) {
            if (stack.includes(reference[i])) {
                stack.splice(stack.indexOf(reference[i]), 1);
            }
            stack[stack.length] = reference[i];
            search = -1;
            for (var j = 0; j < frames; j++) {
                if (buffer[j] == reference[i]) {
                    search = j;
                    hit++;
                    break;
                }
            }
            if (search == -1) {
                if (isFull) {
                    var min_loc = size;
                    for (var j = 0; j < frames; j++) {
                        if (stack.includes(buffer[j])) {
                            var temp = stack.indexOf(buffer[j]);
                            if (temp < min_loc) {
                                min_loc = temp;
                                pointer = j;
                            }
                        }
                    }
                }
                buffer[pointer] = reference[i];
                fault[i] = "P.F.";
                f++;
                pointer++;
                if (pointer == frames) {
                    pointer = 0;
                    isFull = true;
                }
            }
            for (var j = 0; j < frames; j++)
                mem_layout[i][j] = buffer[j];
        }

        var j = 0; //this variable helps in creating the frames (rows)
        while (j < frames) {
            var lineT2 = myTable.insertRow(j);
            for (var i = 0; i < size; i++) {
                var y = lineT2.insertCell(i);

            }
            j++;
        }

        for (var i = 0; i < size; i++) {
            for (var j = 0; j < frames; j++) {
                var y = myTable.rows[j].cells[i];

                if (mem_layout[i][j] != -1) {
                    y.innerHTML = mem_layout[i][j];
                    y.className = "animated fadeInDown";
                    y.style.animationDelay = z + "s";
                    z = z + 0.75;
                }
            }
            var col = rowPF.insertCell(i);

            if (fault[i] == "P.F.") {
                col.innerHTML = fault[i];
                col.className = "animated bounceIn";
                col.style.animationDelay = z + "s";
                z = z + 0.75;
            }
        }
        var col1 = line1.insertCell(0);
        col1.innerHTML = "<th>The total number of Hits : </th>";
        col1.className = "animated fadeInRight";
        col1.style.animationDelay = z + "s";
        var col11 = line1.insertCell(1);
        col11.innerHTML = "<b>" + hit + "</b>";
        col11.className = "animated fadeInRight";
        col11.style.animationDelay = z + "s";
        z++;

        var col2 = line2.insertCell(0);
        col2.innerHTML = "<th>Hit Ratio : </th><b>";
        col2.className = "animated fadeInRight";
        col2.style.animationDelay = z + "s";
        var col22 = line2.insertCell(1);
        col22.innerHTML = "<b>" + hit / size + "</b>";
        col22.className = "animated fadeInRight";
        col22.style.animationDelay = z + "s";
        z++;

        var col3 = line3.insertCell(0);
        col3.innerHTML = "<th>The total number of Page Faults : </th>";
        col3.className = "animated fadeInRight";
        col3.style.animationDelay = z + "s";
        var col33 = line3.insertCell(1);
        col33.innerHTML = "<b>" + f + "</b>";
        col33.className = "animated fadeInRight";
        col33.style.animationDelay = z + "s";
        z++;
    }
}

function afficher_Optimal() {
    var line1 = document.getElementById("Row1");
    line1.innerHTML = "";
    var line2 = document.getElementById("Row2");
    line2.innerHTML = "";
    var line3 = document.getElementById("Row3");
    line3.innerHTML = "";

    var line = document.getElementById("myRow");
    line.innerHTML = "";
    var myTable = document.getElementById("myTable");
    myTable.innerHTML = "";
    var ch = document.getElementById('chaine').value;
    var frames = document.getElementById('nbrcadres').value; //frames contains the number of frames taken from user

    var rowPF = document.getElementById("RowPF");
    rowPF.innerHTML = "";

    if (verifnumerique(ch) == false) {
        alert("Please type figures only as a reference string !");
        return false;
    } else
    if (verifnumerique(frames) == false) {
        alert("Please type figures only as a number of frames !");
        return false;
    } else {

        var pointer = 0,
            hit = 0,
            f = 0;
        var size = ch.length;

        var res = addcommas(ch);
        const reference = res.split(',');

        var z = 1; //this variable helps in counting the seconds of the animation delay for each case 
        for (var i = 0; i < size; i++) {
            var x = line.insertCell(i);
            x.innerHTML = reference[i];
            x.className = "animated zoomIn"; //the animation name(style)
            x.style.animationDelay = z + "s"; //the animation delay
            z = z + 0.75;
        }


        var mem_layout = []; // memory Table

        //create table mem_layout
        //create an array in each column of the array 
        for (var i = 0; i < size; i++)
            mem_layout[i] = [];

        //fill the table with zero 
        for (var i = 0; i < size; i++)
            for (var j = 0; j < frames; j++)
                mem_layout[i][j] = -1;


        var fault = [];
        for (var i = 0; i < size; i++) {
            fault[i] = "";
        }

        buffer = [];
        for (var j = 0; j < frames; j++)
            buffer[j] = -1;
        var current_ref; //reset of reference string 
        var in_reference = [];
        var not_in_reference = [];

        for (var i = 0; i < size; i++) {
            var search = -1;
            for (var j = 0; j < frames; j++) {
                if (buffer[j] == reference[i]) {
                    search = j;
                    hit++;
                    break;
                }
            }

            if (search == -1) {
                current_ref = reference.slice(i); //reste of reference string 
                var last_reference = reference.slice(0, i);
                in_reference = [];
                index_in_reference = [];
                not_in_reference = [];
                var index_not_in_reference = [];
                for (var k = 0; k < frames; k++) {
                    if (current_ref.includes(buffer[k])) {
                        in_reference[in_reference.length] = current_ref.indexOf(buffer[k]);
                        index_in_reference[index_in_reference.length] = k;
                    } else {
                        not_in_reference[not_in_reference.length] = last_reference.indexOf(buffer[k]); //or LastIndexOf
                        index_not_in_reference[index_not_in_reference.length] = k;
                    }
                }
                //console.log("index_not_in_reference=", index_not_in_reference);
                //console.log("not_in_reference=", not_in_reference);
                //console.log("last_reference=", last_reference);
                var max;
                var max_index;
                var min;
                var min_index;
                if (not_in_reference.length > 0) {
                    min = not_in_reference[0];
                    min_index = index_not_in_reference[0];
                    for (var k = 1; k < not_in_reference.length; k++) {
                        if (not_in_reference[k] < min) {
                            min = not_in_reference[k];
                            min_index = index_not_in_reference[k];
                        }
                    }
                    buffer[min_index] = reference[i];

                } else if (in_reference.length > 0) {
                    max = in_reference[0];
                    max_index = index_in_reference[0];
                    for (var k = 1; k < in_reference.length; k++) {
                        if (in_reference[k] > max) {
                            max = in_reference[k];
                            max_index = index_in_reference[k];
                        }
                    }
                    buffer[max_index] = reference[i];
                }

                fault[i] = "P.F.";
                f++;
            }

            for (var j = 0; j < frames; j++)
                mem_layout[i][j] = buffer[j];
        }


        var j = 0; //this variable helps in creating the frames (rows)
        while (j < frames) {
            var lineT2 = myTable.insertRow(j);
            for (var i = 0; i < size; i++) {
                var y = lineT2.insertCell(i);

            }
            j++;
        }

        for (var i = 0; i < size; i++) {
            for (var j = 0; j < frames; j++) {
                var y = myTable.rows[j].cells[i];

                if (mem_layout[i][j] != -1) {
                    y.innerHTML = mem_layout[i][j];
                    y.className = "animated fadeInDown";
                    y.style.animationDelay = z + "s";
                    z = z + 0.75;
                }
            }
            var col = rowPF.insertCell(i);
            if (fault[i] == "P.F.") {
                col.innerHTML = fault[i];
                col.className = "animated bounceIn";
                col.style.animationDelay = z + "s";
                z = z + 0.75;
            }
        }
        var col1 = line1.insertCell(0);
        col1.innerHTML = "<th>The total number of Hits : </th>";
        col1.className = "animated fadeInRight";
        col1.style.animationDelay = z + "s";
        var col11 = line1.insertCell(1);
        col11.innerHTML = "<b>" + hit + "</b>";
        col11.className = "animated fadeInRight";
        col11.style.animationDelay = z + "s";
        z++;

        var col2 = line2.insertCell(0);
        col2.innerHTML = "<th>Hit Ratio : </th><b>";
        col2.className = "animated fadeInRight";
        col2.style.animationDelay = z + "s";
        var col22 = line2.insertCell(1);
        col22.innerHTML = "<b>" + hit / size + "</b>";
        col22.className = "animated fadeInRight";
        col22.style.animationDelay = z + "s";
        z++;

        var col3 = line3.insertCell(0);
        col3.innerHTML = "<th>The total number of Page Faults : </th>";
        col3.className = "animated fadeInRight";
        col3.style.animationDelay = z + "s";
        var col33 = line3.insertCell(1);
        col33.innerHTML = "<b>" + f + "</b>";
        col33.className = "animated fadeInRight";
        col33.style.animationDelay = z + "s";
        z++;
    }
}