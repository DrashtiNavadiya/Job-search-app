import json
import boto3
import base64
import binascii
import uuid

# Initialize DynamoDB and S3 resources
dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')
post_table = dynamodb.Table('BlogPost')
bucket_name = 'blogpoststorage'

def lambda_handler(event, context):
    try:
        # Extract parameters from the body
        body = event.get('body', {})
        if isinstance(body, str):
            body = json.loads(body)

        title = body.get('title')
        content = body.get('content')
        image = body.get('image')
        author_name = body.get('authorName')
        date = body.get('date')
        email_id = body.get('email')

        print(title)
        print(content)
        print(email_id)

        if not title or not content or not email_id:
            return {'statusCode': 400, 'body': json.dumps('Missing required fields')}

        post_id = str(uuid.uuid4())

        # Create user folder and post folder structure
        user_folder = email_id
        post_folder = f"{post_id}"

        # Save content to S3
        content_key = f"{user_folder}/{post_folder}/content.txt"
        s3.put_object(Bucket=bucket_name, Key=content_key, Body=content)

        # Ensure base64 image string has correct padding
        image = image.rstrip('=')
        padding = len(image) % 4
        if padding:
            image += '=' * (4 - padding)

        # Decode base64 image
        try:
            image_data = base64.b64decode(image)
        except binascii.Error as e:
            return {'statusCode': 400, 'body': json.dumps(f"Error decoding base64 image: {str(e)}")}

        # Save image to S3
        image_key = f"{user_folder}/{post_folder}/image.png"
        s3.put_object(Bucket=bucket_name, Key=image_key, Body=image_data)

        # Save metadata to DynamoDB
        post_table.put_item(Item={
            'postId': post_id,
            'email': email_id,
            'title': title,
            'contentKey': content_key,
            'imageKey': image_key,
            'authorName': author_name,
            'date': date
        })

        return {'statusCode': 200, 'body': json.dumps('Post created successfully')}
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return {'statusCode': 500, 'body': json.dumps(f"Error: {str(e)}")}
