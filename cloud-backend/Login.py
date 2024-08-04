import json
import boto3
from boto3.dynamodb.conditions import Key

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table('BlogUsers')

def lambda_handler(event, context):
    try:
        # Log the incoming event for debugging
        print("Received event:", json.dumps(event, indent=2))
        body = event.get('body', {})
        email = body.get('email')
        print("Email:", email)
        print(event)
       
        print(email)
        if not email:
            return {
                'statusCode': 400,
                'body': json.dumps('Error: Missing email')
            }
        
        # Query DynamoDB for the email
        response = user_table.query(
            KeyConditionExpression=Key('email').eq(email)
        )
        
        items = response.get('Items', [])
        if not items:
            return {
                'statusCode': 404,
                'body': json.dumps('Error: User not found')
            }
        
        user = items[0]
        
        return {
            'statusCode': 200,
            'body': {
                'firstName': user.get('firstName', ''),
                'lastName': user.get('lastName', ''),
                'email': user.get('email', '')
            }
        }
    
    except Exception as e:
        print("Error:", str(e))
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}")
        }
