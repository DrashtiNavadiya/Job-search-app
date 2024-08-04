import json
import boto3
from boto3.dynamodb.conditions import Key

# Initialize AWS resources
dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

# DynamoDB table and S3 bucket details
table = dynamodb.Table('BlogPost')
bucket_name = 'blogpoststorage'

def lambda_handler(event, context):
    try:
        # Debugging: Log the full event
        print("Event received: ", json.dumps(event))
        
        # Check if queryStringParameters exist
        query_params = event.get('queryStringParameters', {})
        postId = query_params.get('postId')

        
        if not postId:
            return {
                'statusCode': 400,
                'body': json.dumps('Missing required query string parameters: postId')
            }
            
        # Query DynamoDB to get the blog post details
        response = table.query(
            KeyConditionExpression=Key('postId').eq(postId)
        )
        
        # Debugging: Log DynamoDB response
        print("DynamoDB response: ", json.dumps(response))
        
        if response['Items']:
            blog_post = response['Items'][0]

            # Fetch the content from S3 if available
            if 'contentKey' in blog_post:
                content_object = s3.get_object(Bucket=bucket_name, Key=blog_post['contentKey'])
                content = content_object['Body'].read().decode('utf-8')
                blog_post['content'] = content

            return {
                'statusCode': 200,
                'body': blog_post
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('Blog post not found')
            }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error fetching blog details: {str(e)}')
        }
