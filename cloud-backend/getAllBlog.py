import json
import boto3

def lambda_handler(event, context):
    try:
        # Fetch all blog posts from DynamoDB
        table = boto3.resource('dynamodb').Table('BlogPost')
        response = table.scan()  # Use scan to get all items (consider pagination for large datasets)
        
        # Extract the items from the response
        blogs = response.get('Items', [])
        
        return {
            'statusCode': 200,
            'body': blogs  # Return the list of blogs directly
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error fetching blog posts: {str(e)}')
        }
