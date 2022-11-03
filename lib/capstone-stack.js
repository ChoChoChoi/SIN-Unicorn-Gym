const cdk = require('aws-cdk-lib');
const s3 = require('aws-cdk-lib/aws-s3');
const lambda = require('aws-cdk-lib/aws-lambda');
const fs = require('fs');


class CapstoneStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    
    const Bucket = new s3.Bucket(this, "Bucket");
    Bucket.bucketName

    const Lambda = new lambda.Function(this, 'getData', {
      code: new lambda.InlineCode(fs.readFileSync('lambda/getData.py', { encoding: 'utf-8' })),
      handler: 'index.lambda_handler',
      timeout: cdk.Duration.seconds(30),
      runtime: lambda.Runtime.PYTHON_3_7,
      environment: {
        Bucket : Bucket.bucketArn
      }
    });

    Bucket.grantReadWrite(Lambda);

  }
}

module.exports = { CapstoneStack }
