import sys
import logging
import pymysql
import json
import os
import base64

import pymysql.cursors

# rds settings
user_name = os.environ.get('USER_NAME')
password = os.environ.get('PASSWORD')
rds_proxy_host = os.environ.get('RDS_PROXY_HOST')
db_name = os.environ.get('DB_NAME')

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# create the database connection outside of the handler to allow connections to be
# re-used by subsequent function invocations.
try:
    conn = pymysql.connect(host=rds_proxy_host, user=user_name,
                           passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error(
        "ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit(1)

logger.info("SUCCESS: Connection to RDS for MySQL instance succeeded")

sql_get_data = "" \
    "SELECT " \
    "  b.* " \
    "FROM tenji.blockdata b " \
    "LEFT OUTER JOIN tenji.ownership os" \
    "  ON b.code = os.code " \
    "LEFT OUTER JOIN tenji.owner o " \
    "  ON os.email = o.email " \
    "WHERE o.email = %s ;"


def handler(event, context):

    # jwtトークンのpayloadからemailを取得
    id_token = event["headers"]["Authorization"]
    payload_base64 = id_token.split(".")[1]
    payload_base64 += "=" * (4-len(payload_base64) % 4)
    payload = json.loads(base64.urlsafe_b64decode(
        payload_base64).decode("utf-8"))
    email = payload["email"]

    # 委任されたblockデータを取得
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute(sql_get_data, (email,))
    datas = cur.fetchall()
    cur.close()

    res_body = {
        "datas": datas
    }

    return {
        "body": res_body
    }
