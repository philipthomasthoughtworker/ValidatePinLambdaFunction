exports.handler = async (event, context) => {
    const aws = require('aws-sdk');
    const s3 = new aws.S3();
    const params = { Bucket: 'personalidentificationnumbers', Key : 'pin1.txt' };
    const response = await s3.getObject(params).promise();
    const isMatch = response.Body.toString('utf-8').match("^\\d{4,6}$");
    
    console.log('webpage = ' + event.webpage);
    context.done(null, 'link-scrapper complete.');
    console.log('isMatch' + isMatch);

    if (isMatch === null)
        return { statusCode : 200, body : JSON.stringify({'isMatch' : 'false' }) };
    else
        return { statusCode : 200, body : JSON.stringify({'isMatch' : 'true' }) };
};
