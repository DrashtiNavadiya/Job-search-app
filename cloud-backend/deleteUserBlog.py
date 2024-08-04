import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')
table = dynamodb.Table('BlogPost')
bucket_name = 'blogpoststorage'

def lambda_handler(event, context):
    try:
        # Debugging: Log the full event
        print(json.dumps(event))
        
        # Check if queryStringParameters exist
        if 'queryStringParameters' in event and 'postId' in event['queryStringParameters'] and 'email' in event['queryStringParameters']:
            postId = event['queryStringParameters']['postId']
            email = event['queryStringParameters']['email']
            
            # Query DynamoDB to get the blog post details
            response = table.query(
                KeyConditionExpression=Key('postId').eq(postId) & Key('email').eq(email)
            )
            
            # If post exists, delete it
            if response['Items']:
                blog_post = response['Items'][0]
                
                # Delete the blog post from DynamoDB
                table.delete_item(
                    Key={
                        'postId': postId,
                        'email': email
                    }
                )
                
                # Delete the image and content from S3
                if 'imageKey' in blog_post:
                    s3.delete_object(Bucket=bucket_name, Key=blog_post['imageKey'])
                if 'contentKey' in blog_post:
                    s3.delete_object(Bucket=bucket_name, Key=blog_post['contentKey'])
                
                return {
                    'statusCode': 200,
                    'body': json.dumps('Blog post deleted successfully.')
                }
            else:
                return {
                    'statusCode': 404,
                    'body': json.dumps('Blog post not found.')
                }
        else:
            return {
                'statusCode': 400,
                'body': json.dumps('Missing query string parameters')
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error deleting blog post: {str(e)}')
        }
