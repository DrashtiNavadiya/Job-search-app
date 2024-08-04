import json
import boto3
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BlogPost')

def lambda_handler(event, context):
    try:
        # Log the full event for debugging
        print(json.dumps(event))
        
        # Check if queryStringParameters exist
        if 'queryStringParameters' in event and 'email' in event['queryStringParameters']:
            email_id = event['queryStringParameters']['email']
        else:
            return {
                'statusCode': 400,
                'body': json.dumps('Missing queryStringParameters')
            }
        
        # Scan DynamoDB with the email filter
        response = table.scan(
            FilterExpression=Attr('email').eq(email_id)
        )
        blogs = response.get('Items', [])
        
        return {
            'statusCode': 200,
            'body': blogs
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error fetching blogs: {str(e)}')
        }

