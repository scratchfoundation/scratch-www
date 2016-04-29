var path = require('path');
var s3 = require('s3');
var util = require('util');

const IGNORE_FILES = [
    '.DS_Store'
];

var s3Client = s3.createClient({
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
});

var localDir = process.env.BUILD_DIRECTORY;
if (!localDir) {
    localDir = path.resolve(__dirname, '../build');
} else {
    if (!path.isAbsolute(localDir)) {
        localDir = path.join(process.cwd(), localDir);
    }
}

var skipped = 0;
var uploaded = 0;

var sync = s3Client.uploadDir({
    deleteRemoved: true,
    localDir: localDir,
    getS3Params: function (localfile, stat, callback) {
        if (IGNORE_FILES.indexOf(path.basename(localfile)) != -1) {
            skipped++;
            return callback(null, null);
        }
        callback(null, {});
    },
    s3Params: {
        Prefix: '',
        Bucket: process.env.S3_BUCKET_NAME || '',
        ACL: 'public-read'
    }
});

sync.on('error', function (err) {
    throw new Error('Failed to sync with S3: ' + err);
});

sync.on('fileUploadEnd', function () {uploaded++;});

sync.on('end', function () {
    process.stdout.write(util.format(
        'Uploaded %d local files. Removed %d remote files.\n',
        uploaded, sync.deleteTotal
    ));
    process.exit();
});
