import json


def build_response(code, body):
    response = {
        "statusCode": code,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body),
    }
    return response
