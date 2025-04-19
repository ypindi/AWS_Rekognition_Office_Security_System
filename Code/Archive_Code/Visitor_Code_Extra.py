import boto3
import json

s3=boto3.client('s3')
rekognition=boto3.client('rekognition',region_name='eu-west-1')
dynamodbTableName='employeedb'
dynamodb=boto3.resource('dynamodb',region_name='eu-west-1')
employeeTable=dynamodb.Table(dynamodbTableName)
bucketName='yashvisitorsbucketgroup1'
 
def lambda_handler(event, context):
  print(event)
  #print
  print(event['Records'])
  print(event['Records'][0]['s3']['object']['key'])
  #print(event['Records']{})
  #print(event['Records':{}])
  #objectKey=event['queryStringParameters']['objectKey']
  objectKey=event['Records'][0]['s3']['object']['key']
  #objectKey=event['Records']{}{s3{object{key}}
  #['queryStringParameters']['objectKey']
  image_bytes=s3.get_object(Bucket=bucketName,Key=objectKey)['Body'].read()
  response=rekognition.search_faces_by_image(
        CollectionId='employees',
        Image={'Bytes':image_bytes}
  )
  
  for match in response['FaceMatches']:
      print(match['Face']['FaceId'],match['Face']['Confidence'])
      
      face=employeeTable.get_item(
        Key={
            'id':match['Face']['FaceId']
        }
      )
      if 'Item' in face:
          print('Person found: ',face['Item'])
          return buildResponse(200,{
              'Message':'Success',
              'firstName':face['Item']['firstName'],
              'lastName':face['Item']['lastName']
          })
          
  print('Person could not be recognized')
  return buildResponse(403,{'Message':'Person not found'})
    
    
def buildResponse(statusCode,body=None):
    response={
        'statusCode':statusCode,
        'header':{
            'Content-type':'application/json',
            'Access-Control-Allow-Origin':'*'
        }
    }
    if body is not None:
        response['body']=json.dumps(body)
    return response