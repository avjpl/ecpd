const fs = require('fs');
const through2 = require('through2');
const { parser } = require('stream-json');
const { streamValues } = require('stream-json/streamers/StreamValues');

const objs = [];
const writer = fs.createWriteStream('./data-trimed.json');

fs.createReadStream('./data.json')
  .pipe(parser())
  .pipe(streamValues())
  .pipe(through2({ objectMode: true }, function (data, enc, callback) {
    data.value.ChargeDevice.map((device) => {
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
  .on('data', data => {
    objs.push(data);
  })
  .on('end', () => {
    writer.write(JSON.stringify({data: objs}));
  });
