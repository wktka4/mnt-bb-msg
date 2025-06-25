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

sql_is_admin = "" \
    "SELECT COUNT(1) AS 'flg' " \
    "FROM tenji.owner o " \
    "WHERE o.email = %s " \
    "  AND o.admin_flg = 1 " \
    ";"

sql_delete = "" \
    "DELETE " \
    "FROM tenji.owner o " \
    "WHERE o.email = %s " \
    ";"

sql_insert = "" \
    "INSERT INTO " \
    "  tenji.owner (email, name, admin_flg) " \
    "VALUES " \
    "  (%s, %s, %s) " \
    ";"


def handler(event, context):

    # 管理者チェック
    # jwtトークンのpayloadからemailを取得
    id_token = event["headers"]["Authorization"]
    payload_base64 = id_token.split(".")[1]
    payload_base64 += "=" * (4-len(payload_base64) % 4)
    payload = json.loads(base64.urlsafe_b64decode(
        payload_base64).decode("utf-8"))
    email = payload["email"]

    # 非管理者である場合は処理を抜ける
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute(sql_is_admin, (email,))
    result_admin = cur.fetchone()
    logger.info(result_admin)
    if int(result_admin["flg"]) == 0:
        cur.close()
        return {
            "body": {"result": "ng"}
        }

    # オーナのデリートインサート
    req_body = json.loads(event["body"])
    cur.execute(sql_delete,
                (req_body["email"]))

    cur.execute(sql_insert,
                (req_body["email"], req_body["name"], req_body["admin_flg"],))

    conn.commit()
    cur.close()

    return {
        "body": {"result": "ok"}
    }
