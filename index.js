const fs = require('fs');
const through2 = require('through2');
const { parser } = require('stream-json');
const { streamValues } = require('stream-json/streamers/StreamValues');

const objs = [];

fs.createReadStream('./data.json')
    .pipe(parser())
    .pipe(streamValues())
    .pipe(through2({ objectMode: true }, function (data, enc, callback) {
        data.value.ChargeDevice.map((device) => {
            // console.log(device);
            // console.log('\n');
            // console.log('\n');
            this.push({
                ChargeDeviceName: device.ChargeDeviceName,
                ChargeDeviceLocation: device.ChargeDeviceLocation,
                ChargeDeviceManufacturer: device.ChargeDeviceManufacturer,
                ChargeDeviceModel: device.ChargeDeviceModel,
                Attribution: device.Attribution,
                Connector: device.Connector,
                DeviceOwner: device.DeviceOwner,
            });
        });

        callback();
    }))
    .on('data', (data) => {
        // console.log(data);
        // console.log('\n');
        objs.push(data);
    })
    .on('end', () => {
        console.log(JSON.stringify(objs))
    });

// .pipe(fs.createWriteStream('./data-trimed.json'))
