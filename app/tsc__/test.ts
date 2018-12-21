import { exec } from 'shelljs';

var topExe = exec("top -b -n 1").code,
            psExe = exec("ps -e").code;
if (topExe) {
    console.warn(topExe);

}