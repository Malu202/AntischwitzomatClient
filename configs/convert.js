const fs = require('fs')
const path = require('path');

fs.readFile('./configs/dataFormat.json', 'utf8', (err, formatData) => {
    if (err) {
        console.error(err);
        return;
    }
    let format = JSON.parse(formatData);

    fs.readdir("./configs/sensors", (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        for (let f of files) {
            fs.readFile(path.join("./configs/sensors", f), 'utf8', (err, configData) => {
                if (err) {
                    console.error(err)
                    return
                }
                try {
                    let config = JSON.parse(configData);
                    let outputBinary = createBinaryData(config, format);

                    let outputFileName = f.replace(".json", ".bmp");
                    console.log("Writing to " + outputFileName);
                    fs.writeFile(outputFileName, outputBinary, err => {
                        if (err) {
                            console.error(err)
                            return
                        }
                    });

                } catch (e) {
                    console.log(e)
                }
            });
        }
    });
});

function createBinaryData(configJSON, format) {

    let bits = 0;
    for (let i = 0; i < format.length; i++) {
        if (format[i].size % 8 == 0) {
            // console.log(format[i].value + ": " + format[i].size)
            bits += format[i].size;
        } else {
            throw "ERROR: Size of '" + format[i].value + "' is not dividable by 8, check data sizes in dataFromat.json!";
        }
    }

    let configArray = new Uint8Array(bits / 8);
    configArray.fill(0);
    let configView = new DataView(configArray.buffer);

    let byteOffset = 0;
    for (let i = 0; i < format.length; i++) {
        let value = configJSON[format[i].value];
        if (value == null) throw "ERROR: '" + format[i].value + "' not found in config file";

        if (format[i].string) {
            let charLength = format[i].size / 8;
            if (value.length + 1 > (charLength)) {
                throw "ERROR: '" + value + "' has more than " + charLength + " characters";
            }
            for (let j = 0; j < value.length; j++) {
                configView.setUint8(byteOffset + j, value.charCodeAt(j));
                // console.log(`writing ${value.charCodeAt(j)} to ${byteOffset + j}`);
            }
            // configView.setUint8(byteOffset + value.length, "\0".charCodeAt(0));
        }
        else {

            if (format[i].size == 8) {
                if (format[i].unsigned) configView.setUint8(byteOffset, value);
                else configView.setInt8(byteOffset, value);
            } else if (format[i].size == 16) {
                if (format[i].unsigned) configView.setUint16(byteOffset, value, true);
                else configView.setInt16(byteOffset, value, true);
            } else if (format[i].size == 32) {
                if (format[i].unsigned) configView.setUint32(byteOffset, value, true);
                else configView.setInt32(byteOffset, value, true);
            }

        }
        byteOffset += format[i].size / 8;

    }
    console.log("Output size: " + bits / 8);

    return configArray;
}