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

sql_is_owner = "" \
    "SELECT COUNT(1) AS 'flg' " \
    "FROM tenji.owner o " \
    "LEFT OUTER JOIN tenji.ownership os " \
    "  ON o.email = os.email " \
    "WHERE o.email = %s " \
    "  AND os.code = %s " \
    ";"

sql_delete = "" \
    "DELETE " \
    "FROM tenji.blockmessage bm " \
    "WHERE bm.code = %s " \
    ";"

sql_insert = "" \
    "INSERT INTO " \
    "  tenji.blockmessage (code, angle, messagecategory, message, reading, wav) " \
    "VALUES " \
    "    (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    "  , (%s, %s, %s, %s, %s, %s) " \
    ";"


def handler(event, context):

    # 所有者チェック
    # jwtトークンのpayloadからemailを取得
    id_token = event["headers"]["Authorization"]
    payload_base64 = id_token.split(".")[1]
    payload_base64 += "=" * (4-len(payload_base64) % 4)
    payload = json.loads(base64.urlsafe_b64decode(
        payload_base64).decode("utf-8"))
    email = payload["email"]
    # 対象コード取得
    req_body = json.loads(event["body"])
    logger.info(req_body)
    logger.info(type(req_body))

    # 所有者チェックを行い、非所有者である場合は処理を抜ける
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute(sql_is_owner, (email, req_body["code"],))
    result_owner = cur.fetchone()
    logger.info(result_owner)
    if int(result_owner["flg"]) == 0:
        cur.close()
        res_body = {"result": "ng"}
        return {
            "body": res_body
        }

    # メッセージのデリートインサート
    cur.execute(sql_delete,
                (req_body["code"],))

    cur.execute(sql_insert,(
        req_body["code"], req_body["0"]["angle"], req_body["0"]["messagecategory"], req_body["0"]["message"], req_body["0"]["reading"], req_body["0"]["wav"],
        req_body["code"], req_body["1"]["angle"], req_body["1"]["messagecategory"], req_body["1"]["message"], req_body["1"]["reading"], req_body["1"]["wav"],
        req_body["code"], req_body["2"]["angle"], req_body["2"]["messagecategory"], req_body["2"]["message"], req_body["2"]["reading"], req_body["2"]["wav"],
        req_body["code"], req_body["3"]["angle"], req_body["3"]["messagecategory"], req_body["3"]["message"], req_body["3"]["reading"], req_body["3"]["wav"],
        req_body["code"], req_body["4"]["angle"], req_body["4"]["messagecategory"], req_body["4"]["message"], req_body["4"]["reading"], req_body["4"]["wav"],
        req_body["code"], req_body["5"]["angle"], req_body["5"]["messagecategory"], req_body["5"]["message"], req_body["5"]["reading"], req_body["5"]["wav"],
        req_body["code"], req_body["6"]["angle"], req_body["6"]["messagecategory"], req_body["6"]["message"], req_body["6"]["reading"], req_body["6"]["wav"],
        req_body["code"], req_body["7"]["angle"], req_body["7"]["messagecategory"], req_body["7"]["message"], req_body["7"]["reading"], req_body["7"]["wav"],
        req_body["code"], req_body["8"]["angle"], req_body["8"]["messagecategory"], req_body["8"]["message"], req_body["8"]["reading"], req_body["8"]["wav"],
        req_body["code"], req_body["9"]["angle"], req_body["9"]["messagecategory"], req_body["9"]["message"], req_body["9"]["reading"], req_body["9"]["wav"],
        req_body["code"], req_body["10"]["angle"], req_body["10"]["messagecategory"], req_body["10"]["message"], req_body["10"]["reading"], req_body["10"]["wav"],
        req_body["code"], req_body["11"]["angle"], req_body["11"]["messagecategory"], req_body["11"]["message"], req_body["11"]["reading"], req_body["11"]["wav"],
        req_body["code"], req_body["12"]["angle"], req_body["12"]["messagecategory"], req_body["12"]["message"], req_body["12"]["reading"], req_body["12"]["wav"],
        req_body["code"], req_body["13"]["angle"], req_body["13"]["messagecategory"], req_body["13"]["message"], req_body["13"]["reading"], req_body["13"]["wav"],
        req_body["code"], req_body["14"]["angle"], req_body["14"]["messagecategory"], req_body["14"]["message"], req_body["14"]["reading"], req_body["14"]["wav"],
        req_body["code"], req_body["15"]["angle"], req_body["15"]["messagecategory"], req_body["15"]["message"], req_body["15"]["reading"], req_body["15"]["wav"],
    ))

    conn.commit()
    cur.close()
    res_body = {"result": "ok"}

    return {
        "body": res_body
    }
