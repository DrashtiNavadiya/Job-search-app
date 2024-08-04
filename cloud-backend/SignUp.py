import json
import boto3
import random

dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table('BlogUsers')

def lambda_handler(event, context):
    # Log the event object for debugging
    print("Received event:", json.dumps(event, indent=2))
    
    try:
        # Generate a unique 5-digit userId
        user_id = str(random.randint(10000, 99999))
        first_name = event.get('firstName', None)
        last_name = event.get('lastName', None)
        email = event.get('email', None)
        
        # Check if all required fields are present
        if not first_name or not last_name or not email:
            raise ValueError("Missing one or more required fields")
        
        # Save to DynamoDB
        response = user_table.put_item(
            Item={
                'userId': user_id,
                'firstName': first_name,
                'lastName': last_name,
                'email': email,
                # Add more user details here if needed
            }
        )
        
        # Log the response from DynamoDB
        print("DynamoDB response:", json.dumps(response, indent=2))

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'User created successfully!',
                'userId': user_id,
                'email': email,
                'userId': user_id,
            })
        }
    
    except Exception as e:
        # Log the error
        print("Error:", str(e))
        
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}")
        }
