import requests
import json
import os
import boto3
import urllib


def lambda_handler(event, context):

    try:

        company = ["이글루시큐리티","펜타시큐리티시스템", "휴먼컨설팅그룹"]    
        year = ["2019", "2020", "2021"]
        list = []

        for i in range(0,3):
            for k in range(0,3):
                url = "http://apis.data.go.kr/1160100/service/GetFinaStatInfoService/getSummFinaStat?pageNo=10&numOfRows=5&resultType=json&fnccmpNm="+company[i]+"&serviceKey=%2BTpvZeDSaJsgt2dTvrUXIkd7kGj%2FKeI%2Fld7GZQGTXUW11HBY5gny33Zz6uy07%2Fq32XDhcGV3KBjGf2yDeAHE8w%3D%3D&bizYear="+year[k]
                response = requests.get(url)
                contents = response.text
                info = json.loads(contents)
                list.append(info['response']['body']['items']['item'][-1]['enpSaleAmt'])

        #s3
        s3 = boto3.client('s3')
        bucket_name = os.environ['Bucket']
        s3.put_object(Bucket=bucket_name, Key=(user_id+'/'))

    except Exception as e:

        print(e)
        raise e