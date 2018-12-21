import {exec} from "shelljs"

var ll: string[] = [];

var i,values;
        var processObjects: any[] = [];
        var child = exec('nethogs -t',{silent:true, async:true});
        
        child.stdout.on('data', function(data: string) {
            ll = data.split("\n");
            console.log(ll)
            if(ll = []){
                console.log("fidsjfk")
            }
            if(ll[1] == "Refreshing:"){
                for(i=2;i<ll.length - 1; i++){
                    values = ll[i].split("\t");
                    // console.log(d)
                    processObjects.push({
                        "Program": values[0],
                        "Sent":values[1],
                        "Recieved":values[2]
                    })
                }
            }
            console.log(processObjects)
        });